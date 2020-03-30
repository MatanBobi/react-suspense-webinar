import React, { useEffect, useState, useMemo } from 'react'
import PokemonDetails from '../PokemonDetails'
import PokemonColor from '../PokemonColor'
import PokemonEvolutions from '../PokemonEvolutions'
import PokemonImage from '../PokemonImage'
import BackButton from '../BackButton'

export const getPokemonChain = (acc, data) => {
  acc.push({
    name: data.species.name,
  })
  if (data.evolves_to.length === 0) {
    return acc
  } else {
    return data.evolves_to.reduce(getPokemonChain, acc)
  }
}

const PokemonPage = ({ selectedPokemon, setSelectedPokemon }) => {
  const [pokemonChainData, setPokemonChain] = useState({})
  const [pokemonData, setPokemonData] = useState({})

  useEffect(() => {
    fetch(`https://pokeapi.co/api/v2/pokemon/${selectedPokemon}`)
      .then(response => response.json())
      .then(data => {
        setPokemonData(data)
        fetch(data.species.url)
          .then(response => response.json())
          .then(data => {
            fetch(data.evolution_chain.url)
              .then(response => response.json())
              .then(data => {
                setPokemonChain(data)
              })
          })
      })
  }, [selectedPokemon])
  
  const pokemonChain = useMemo(() => {
    if (pokemonChainData && pokemonChainData.chain) {
      return getPokemonChain([], pokemonChainData.chain.evolves_to[0])
    }
  }, [pokemonChainData])

  return (
    <div className="pokemon-page">
      <BackButton setSelectedPokemon={setSelectedPokemon} />
      <PokemonImage pokemonData={pokemonData} />
      <PokemonDetails
        pokemonData={pokemonData}
        selectedPokemon={selectedPokemon}
      />
      <PokemonColor types={pokemonData.types} />
      <PokemonEvolutions pokemonChain={pokemonChain} />
    </div>
  )
}

export default PokemonPage

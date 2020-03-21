import React, { useEffect, useState, useMemo } from 'react'
import PokemonDetails from '../PokemonDetails'
import PokemonColor from '../PokemonColor'
import PokemonEvolutions from '../PokemonEvolutions'

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

const PokemonPage = ({
  match: {
    params: { id },
  },
}) => {
  const [pokemonChainData, setPokemonChain] = useState({})
  const [pokemonData, setPokemonData] = useState({})
  const [evolutionChainUrl, setEvolutionChainUrl] = useState()
  const [pokemonColor, setPokemonColor] = useState()

  useEffect(() => {
    fetch(evolutionChainUrl)
      .then(response => response.json())
      .then(data => {
        setPokemonChain(data, [])
      })
  }, [evolutionChainUrl])
  useEffect(() => {
    fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
      .then(response => response.json())
      .then(data => {
        setPokemonData(data)
        fetch(data.species.url)
          .then(response => response.json())
          .then(data => {
            setEvolutionChainUrl(data.evolution_chain.url)
            setPokemonColor(data.color.name)
          })
      })
  }, [id])
  const pokemonChain = useMemo(() => {
    if (pokemonChainData && pokemonChainData.chain) {
      return getPokemonChain([], pokemonChainData.chain.evolves_to[0])
    }
  }, [pokemonChainData])

  return (
    <div className="pokemon-page">
      <PokemonDetails pokemonData={pokemonData} id={id} />
      <PokemonColor color={pokemonColor} />
      <PokemonEvolutions pokemonChain={pokemonChain} />
    </div>
  )
}

export default PokemonPage

import React, { memo, useCallback, useEffect, useState } from 'react'
import Pokemon from '../Pokemon'
import Spinner from '../Spinner'

const PokemonsList = ({ setSelectedPokemon }) => {
  const [pokemons, setPokemons] = useState([])

  const getPokemons = useCallback(() => {
    fetch('https://pokeapi.co/api/v2/pokemon?limit=50')
      .then(response => response.json())
      .then(data => {
        setPokemons(data.results)
      })
  }, [setPokemons])

  useEffect(() => {
    getPokemons()
  }, [getPokemons])

  return (
    <div className="pokemons-list">
      {pokemons.map(pokemon => (
        <Pokemon
          name={pokemon.name}
          id={pokemon.id}
          setSelectedPokemon={setSelectedPokemon}
          key={pokemon.name}
        />
      ))}
    </div>
  )
}

export default memo(PokemonsList)

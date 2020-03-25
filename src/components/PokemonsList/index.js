import React, { memo, useCallback, useEffect, useState } from 'react'
import Pokemon from '../Pokemon'
import { FETCH_STATES } from '../../constants/constants'
import Spinner from '../Spinner'

const PokemonsList = ({ setSelectedPokemon }) => {
  const [pokemons, setPokemons] = useState([])
  const [fetchState, setFetchState] = useState(FETCH_STATES.IDLE)

  const getPokemons = useCallback(() => {
    setFetchState(FETCH_STATES.PENDING)
    fetch('https://pokeapi.co/api/v2/pokemon?limit=200')
      .then(response => response.json())
      .then(data => {
        setFetchState(FETCH_STATES.SUCCESS)
        setPokemons(data.results)
      })
  }, [setPokemons])

  useEffect(() => {
    getPokemons()
  }, [getPokemons])

  return fetchState === FETCH_STATES.PENDING ? (
    <Spinner />
  ) : (
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

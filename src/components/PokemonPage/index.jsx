import React, { useEffect, useState, useMemo, useReducer } from 'react'
import { FETCH_STATES } from '../../constants/constants'
import Spinner from '../Spinner'
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

const dataReducer = (state, action) => {
  switch (action.type) {
    case FETCH_STATES.PENDING: {
      return {
        ...state,
        fetchState: FETCH_STATES.PENDING,
      }
    }
    case FETCH_STATES.SUCCESS: {
      return {
        data: action.payload,
        fetchState: FETCH_STATES.SUCCESS,
      }
    }
    default:
      return state
  }
}

const PokemonPage = ({ selectedPokemon, setSelectedPokemon }) => {
  const [pokemonEvolutions, pokemonEvolutionDispatch] = useReducer(
    dataReducer,
    {
      data: {},
      fetchState: FETCH_STATES.IDLE,
    }
  )
  const [pokemonData, pokemonDataDispatch] = useReducer(dataReducer, {
    data: {},
    fetchState: FETCH_STATES.IDLE,
  })

  useEffect(() => {
    pokemonDataDispatch({ type: FETCH_STATES.PENDING })
    fetch(`https://pokeapi.co/api/v2/pokemon/${selectedPokemon}`)
      .then(response => response.json())
      .then(data => {
        pokemonDataDispatch({ type: FETCH_STATES.SUCCESS, payload: data })
        fetch(data.species.url)
          .then(response => response.json())
          .then(data => {
            pokemonEvolutionDispatch({ type: FETCH_STATES.PENDING })
            fetch(data.evolution_chain.url)
              .then(response => response.json())
              .then(data => {
                pokemonEvolutionDispatch({
                  type: FETCH_STATES.SUCCESS,
                  payload: data,
                })
              })
          })
      })
  }, [selectedPokemon])
  
  const pokemonChain = useMemo(() => {
    if (pokemonEvolutions.data && pokemonEvolutions.data.chain) {
      return getPokemonChain([], pokemonEvolutions.data.chain.evolves_to[0])
    }
  }, [pokemonEvolutions.data])

  return (
    <div className="pokemon-page">
      <BackButton setSelectedPokemon={setSelectedPokemon} />
      <PokemonImage selectedPokemon={selectedPokemon} />
      {pokemonData.fetchState !== FETCH_STATES.SUCCESS ? (
        <Spinner />
      ) : (
        <PokemonDetails pokemonData={pokemonData.data} id={selectedPokemon} />
      )}
      {pokemonData.fetchState !== FETCH_STATES.SUCCESS ? (
        <Spinner />
      ) : (
        <PokemonColor types={pokemonData.data.types} />
      )}
      {pokemonEvolutions.fetchState !== FETCH_STATES.SUCCESS ? (
        <Spinner />
      ) : (
        <PokemonEvolutions pokemonChain={pokemonChain} />
      )}
    </div>
  )
}

export default PokemonPage

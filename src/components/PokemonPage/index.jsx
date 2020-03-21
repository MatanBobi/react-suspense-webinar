import React, { useEffect, useState, useMemo, useReducer } from 'react'
import { FETCH_STATES } from '../../constants/constants'
import Spinner from '../Spinner'
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

const PokemonPage = ({
  match: {
    params: { id },
  },
}) => {
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
  const [pokemonSpecies, pokemonSpeciesDispatch] = useReducer(dataReducer, {
    data: {},
    fetchState: FETCH_STATES.IDLE,
  })

  const [evolutionChainUrl, setEvolutionChainUrl] = useState()
  const [pokemonColor, setPokemonColor] = useState()

  useEffect(() => {
    pokemonEvolutionDispatch({ type: FETCH_STATES.PENDING })
    fetch(evolutionChainUrl)
      .then(response => response.json())
      .then(data => {
        pokemonEvolutionDispatch({ type: FETCH_STATES.SUCCESS, payload: data })
      })
  }, [evolutionChainUrl])
  useEffect(() => {
    pokemonDataDispatch({ type: FETCH_STATES.PENDING })
    fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
      .then(response => response.json())
      .then(data => {
        pokemonDataDispatch({ type: FETCH_STATES.SUCCESS, payload: data })
        pokemonSpeciesDispatch({ type: FETCH_STATES.PENDING })
        fetch(data.species.url)
          .then(response => response.json())
          .then(data => {
            pokemonSpeciesDispatch({ type: FETCH_STATES.SUCCESS })
            setEvolutionChainUrl(data.evolution_chain.url)
            setPokemonColor(data.color.name)
          })
      })
  }, [id])
  const pokemonChain = useMemo(() => {
    if (pokemonEvolutions.data && pokemonEvolutions.data.chain) {
      return getPokemonChain([], pokemonEvolutions.data.chain.evolves_to[0])
    }
  }, [pokemonEvolutions.data])

  return (
    <div className="pokemon-page">
    {pokemonData.fetchState !== FETCH_STATES.SUCCESS ? <Spinner/>:
      <PokemonDetails pokemonData={pokemonData.data} id={id} />
    }
    {pokemonSpecies.fetchState !== FETCH_STATES.SUCCESS ? <Spinner/>:
      <PokemonColor color={pokemonColor} />
    }
    {pokemonEvolutions.fetchState !== FETCH_STATES.SUCCESS ? <Spinner/>:
      <PokemonEvolutions pokemonChain={pokemonChain} />
    }
    </div>
  )
}

export default PokemonPage

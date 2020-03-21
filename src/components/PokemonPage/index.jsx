import React, { useEffect, useState, useMemo, useReducer } from 'react'
import { FETCH_STATES } from '../../constants/constants'
import Spinner from '../Spinner'

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
      if (!evolutionChainUrl){ return; }
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
      <h1 className="pokemon-name">{pokemonData.name}</h1>
      <div className="pokemon-image">
        <h3>Image</h3>
        {pokemonData.fetchState !== FETCH_STATES.SUCCESS ? (
          <Spinner />
        ) : (
            // https://img.pokemondb.net/artwork/charizard.jpg
            // https://serebii.net/pokemon/art/001.png
          <img
            src={`https://pokeres.bastionbot.org/images/pokemon/${id}.png`}
            alt=""
          />
        )}
      </div>
      <div className="pokemon-details">
        <h3>Details</h3>
        {pokemonData.fetchState !== FETCH_STATES.SUCCESS ? (
          <Spinner />
        ) : (
          <>
            <h5>Top 10 Moves:</h5>
            <ul className="moves-list">
              {pokemonData.data &&
                pokemonData.data.moves &&
                pokemonData.data.moves.slice(0, 10).map(({ move }) => {
                  return <li key={move.name}>{move.name}</li>
                })}
            </ul>
            <h5>Color: </h5>
            {pokemonSpecies.fetchState !== FETCH_STATES.SUCCESS ? (
              <Spinner />
            ) : (
              <div
                className="pokemon-color"
                style={{ backgroundColor: pokemonColor }}
              />
            )}
          </>
        )}
      </div>
      <div className="pokemon-evolutions">
        <h3>Evolutions</h3>
        {pokemonEvolutions.fetchState !== FETCH_STATES.SUCCESS ? (
          <Spinner />
        ) : (
          <ul>
            {pokemonChain &&
              pokemonChain.map(pokemon => (
                <li key={pokemon.name}>
                  <img
                    src={`https://img.pokemondb.net/sprites/x-y/normal/${pokemon.name}.png`}
                    alt={pokemon.name}
                  />
                </li>
              ))}
          </ul>
        )}
      </div>
    </div>
  )
}

export default PokemonPage

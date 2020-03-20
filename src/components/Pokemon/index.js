import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Spinner from '../Spinner'
import { FETCH_STATES } from '../../constants/constants'

const Pokemon = ({ name }) => {
  const [pokemonData, setPokemonData] = useState({})
  const [fetchState, setFetchState] = useState(FETCH_STATES.IDLE)
  useEffect(() => {
    setFetchState(FETCH_STATES.PENDING)
    fetch(`https://pokeapi.co/api/v2/pokemon/${name}`)
      .then(response => response.json())
      .then(data => {
        setPokemonData(data)
        setFetchState(FETCH_STATES.SUCCESS)
      })
  }, [name])

  return fetchState === FETCH_STATES.PENDING ? (
    <Spinner />
  ) : (
    <Link to={`pokemon/${pokemonData.id}`}>
      <div className="pokemon-wrapper">
        {pokemonData.sprites && (
          <img src={pokemonData.sprites.front_default} alt="" />
        )}
        <div className="name">{name}</div>
      </div>
    </Link>
  )
}

export default Pokemon

import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Spinner from '../Spinner'
import { FETCH_STATES } from '../../constants/constants'

const Pokemon = ({ pokemonResource, name }) => {
  const pokemonData = pokemonResource.read()
  return (
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

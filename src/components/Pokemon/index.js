import React from 'react'
import { Link } from 'react-router-dom'

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

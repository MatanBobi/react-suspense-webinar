import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

const Pokemon = ({ name }) => {
  const [pokemonData, setPokemonData] = useState({})

  useEffect(() => {
    fetch(`https://pokeapi.co/api/v2/pokemon/${name}`)
      .then(response => response.json())
      .then(data => {
        setPokemonData(data)
      })
  }, [name])

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

import React, { useState, useEffect } from 'react'

const Pokemon = ({ name, setSelectedPokemon }) => {
  const [pokemonData, setPokemonData] = useState({})

  useEffect(() => {
    fetch(`https://pokeapi.co/api/v2/pokemon/${name}`)
      .then(response => response.json())
      .then(data => {
        setPokemonData(data)
      })
  }, [name])

  return (
    <div className="pokemon-wrapper" onClick={() => setSelectedPokemon(pokemonData.id)}>
      {pokemonData.sprites && (
        <img src={pokemonData.sprites.front_default} alt="" />
      )}
      <div className="name">{name}</div>
    </div>
  )
}

export default Pokemon

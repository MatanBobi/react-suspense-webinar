import React from 'react'

const PokemonImage = ({ pokemonResource }) => {
  const pokemonImage = pokemonResource.img.read()
  return (
    <div className="pokemon-image">
      <img src={pokemonImage} alt="" />
    </div>
  )
}

export default PokemonImage

import React from 'react'

const PokemonImage = ({ pokemonResource }) => {
  return (
    <div className="pokemon-image">
      <img src={pokemonResource.img.read()} alt="" />
    </div>
  )
}

export default PokemonImage

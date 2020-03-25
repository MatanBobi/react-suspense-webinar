import React from 'react'

const PokemonImage = ({ id }) => {
  return <div className="pokemon-image">
    <img
      src={`https://pokeres.bastionbot.org/images/pokemon/${id}.png`}
      alt=""
    />
  </div>
}

export default PokemonImage

import React from 'react'

const PokemonImage = ({ selectedPokemon }) => {
  return <div className="pokemon-image">
    <img
      src={`https://pokeres.bastionbot.org/images/pokemon/${selectedPokemon}.png`}
      alt=""
    />
  </div>
}

export default PokemonImage

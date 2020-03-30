import React from 'react'
import {getMainImageUrl} from '../../helpers/utils'

const PokemonImage = ({ pokemonData }) => {
  return <div className="pokemon-image">
    <img
      src={getMainImageUrl(pokemonData.name)}
      alt=""
    />
  </div>
}

export default PokemonImage

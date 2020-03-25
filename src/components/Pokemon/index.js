import React from 'react'
import {
  createResource,
  preloadImage,
  getMainImageUrl,
} from '../../helpers/utils'

const createPokemonResource = id => ({
  data: createResource(() => fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)),
  img: createResource(() => preloadImage(getMainImageUrl(id))),
  id
})

const Pokemon = ({ pokemonResource, name, setSelectedPokemonResource }) => {
  const pokemonData = pokemonResource.read()
  return (
    <div
      className="pokemon-wrapper"
      onClick={() =>
        setSelectedPokemonResource(() => createPokemonResource(pokemonData.id))
      }
    >
      {pokemonData.sprites && (
        <img src={pokemonData.sprites.front_default} alt="" />
      )}
      <div className="name">{name}</div>
    </div>
  )
}

export default Pokemon

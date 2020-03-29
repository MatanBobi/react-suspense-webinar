import React from 'react'
import {
  createResource,
  preloadImage,
  getMainImageUrl,
} from '../../helpers/utils'

const createPokemonResource = (id, name) => ({
  data: createResource(() => fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)),
  evolutionData: createResource(() =>
    fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
      .then(resp => resp.json())
      .then(data =>
        fetch(data.species.url)
          .then(data => data.json())
          .then(pokemonSpeciesData =>
            fetch(pokemonSpeciesData.evolution_chain.url)
          )
      )
  ),
  img: createResource(() => preloadImage(getMainImageUrl(name))),
})

const Pokemon = ({ pokemonResource, name, setSelectedPokemonResource }) => {
  const pokemonData = pokemonResource.read()
  return (
    <div
      className="pokemon-wrapper"
      onClick={() =>
        setSelectedPokemonResource(createPokemonResource(pokemonData.id, name))
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

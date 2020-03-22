import React from 'react'
import { createResource } from '../../helpers/utils'

const PokemonColor = ({
  pokemonResource,
  pokemonSpeciesResource,
  setPokemonSpeciesResource,
}) => {
  const pokemonData = pokemonResource.read()
  if (!pokemonSpeciesResource) {
    setPokemonSpeciesResource(
      createResource(() => fetch(pokemonData.species.url))
    )
    return null
  }
  const pokemonSpeciesData = pokemonSpeciesResource.read()
  
  return (
    <div className="pokemon-color">
      <h5>Color: </h5>
      <div
        className="pokemon-color-box"
        style={{ backgroundColor: pokemonSpeciesData.color.name }}
      />
    </div>
  )
}

export default PokemonColor

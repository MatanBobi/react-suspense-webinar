import React from 'react'
import { createResource } from '../../helpers/utils'

const getPokemonChain = (acc, data) => {
  acc.push({
    name: data.species.name,
  })
  if (data.evolves_to.length === 0) {
    return acc
  } else {
    return data.evolves_to.reduce(getPokemonChain, acc)
  }
}

const PokemonEvolutions = ({
  pokemonSpeciesResource,
  evolutionChainResource,
  setEvolutionChainResource,
}) => {
  let evolutionChainData = {}
  let pokemonChain
  if (!pokemonSpeciesResource) {
    return null
  }
  const pokemonSpeciesData = pokemonSpeciesResource.read()
  if (!evolutionChainResource) {
    setEvolutionChainResource(
      createResource(() => fetch(pokemonSpeciesData.evolution_chain.url))
    )

    return null
  }
  evolutionChainData = evolutionChainResource.read()
  if (evolutionChainData && evolutionChainData.chain) {
    pokemonChain = getPokemonChain(
      [],
      evolutionChainData.chain.evolves_to[0]
    )
  }
  return (
    <div className="pokemon-evolutions">
      <h3>Evolutions</h3>
      <ul>
        {pokemonChain &&
          pokemonChain.map(pokemon => (
            <li key={pokemon.name}>
              <img
                src={`https://img.pokemondb.net/sprites/x-y/normal/${pokemon.name}.png`}
                alt={pokemon.name}
              />
            </li>
          ))}
      </ul>
    </div>
  )
}

export default PokemonEvolutions

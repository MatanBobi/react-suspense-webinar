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
  pokemonResource,
  evolutionChainResource,
  setEvolutionChainResource,
}) => {
  let evolutionChainData = {}
  let pokemonChain
  if (!pokemonResource) {
    return null
  }
  if (!evolutionChainResource) {
    setEvolutionChainResource(
      createResource(() =>
        fetch(pokemonResource.read().species.url)
          .then(data => data.json())
          .then(pokemonSpeciesData =>
            fetch(pokemonSpeciesData.evolution_chain.url)
          )
      )
    )

    return null
  }
  evolutionChainData = evolutionChainResource.read()
  if (evolutionChainData && evolutionChainData.chain) {
    pokemonChain = getPokemonChain([], evolutionChainData.chain.evolves_to[0])
  }
  return (
    <div className="pokemon-evolutions">
      <h3>Evolutions</h3>
      <ul>
        {pokemonChain &&
          pokemonChain.map(pokemon => (
            <li key={pokemon.name}>
              <img
                src={`https://img.pokemondb.net/artwork/vector/${pokemon.name}.png`}
                alt={pokemon.name}
              />
            </li>
          ))}
      </ul>
    </div>
  )
}

export default PokemonEvolutions

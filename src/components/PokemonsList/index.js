import React, { Suspense } from 'react'
import Pokemon from '../Pokemon'
import Spinner from '../Spinner'
import { createResource } from '../../helpers/utils'

const pokemonsResource = createResource(() =>
  fetch('https://pokeapi.co/api/v2/pokemon?limit=5')
)

const PokemonsList = () => {
  const pokemons = pokemonsResource.read()

  return (
    <div className="pokemons-list">
      {pokemons.results.map(pokemon => {
        return (
          <Suspense fallback={<Spinner />} key={pokemon.name}>
            <Pokemon
              pokemonResource={createResource(() =>
                fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon.name}`)
              )}
              name={pokemon.name}
              id={pokemon.id}
              key={pokemon.name}
            />
          </Suspense>
        )
      })}
    </div>
  )
}

export default PokemonsList

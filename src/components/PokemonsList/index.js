import React, { Suspense, SuspenseList, useEffect, useState, useMemo } from 'react'
import Pokemon from '../Pokemon'
import Spinner from '../Spinner'
import { createResource } from '../../helpers/utils'

const pokemonsResource = createResource(() =>
  fetch('https://pokeapi.co/api/v2/pokemon?limit=50')
)

const PokemonsList = ({ setSelectedPokemonResource }) => {
  const pokemons = pokemonsResource.read()
  const pokemonsResources = useMemo(() => {
    const resources = {}
    pokemons.results.forEach(pokemon => {
      resources[pokemon.name] = createResource(() =>
        fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon.name}`)
      )
    })
    return resources
  }, [pokemons.results])
  return (
    <div className="pokemons-list">
      <SuspenseList revealOrder="forwards" tail="collapsed">
        {Object.keys(pokemonsResources).length && pokemons.results.map(pokemon => {
          return (
            <Suspense fallback={<Spinner />} key={pokemon.name}>
              <Pokemon
                pokemonResource={pokemonsResources[pokemon.name]}
                setSelectedPokemonResource={setSelectedPokemonResource}
                name={pokemon.name}
                id={pokemon.id}
                key={pokemon.name}
              />
            </Suspense>
          )
        })}
      </SuspenseList>
    </div>
  )
}

export default PokemonsList

import React, { useState, lazy, Suspense, SuspenseList } from 'react'
import Spinner from '../Spinner'

import BackButton from '../BackButton'
const PokemonDetails = lazy(() => import('../PokemonDetails'))
const PokemonColor = lazy(() => import('../PokemonColor'))
const PokemonEvolutions = lazy(() => import('../PokemonEvolutions'))
const PokemonImage = lazy(() => import('../PokemonImage'))

const PokemonPage = ({
  selectedPokemon,
  setSelectedPokemon,
  selectedPokemonResource,
  setSelectedPokemonResource,
}) => {
  const [evolutionChainResource, setEvolutionChainResource] = useState(null)
  if (!selectedPokemonResource.data) {
    return null
  }
  return (
    <div className="pokemon-page">
      <BackButton setSelectedPokemonResource={setSelectedPokemonResource} />
      <SuspenseList revealOrder="forwards" tail="collapsed">
        <Suspense fallback={<Spinner />}>
          <PokemonImage pokemonResource={selectedPokemonResource} />
        </Suspense>
        <Suspense fallback={<Spinner />}>
          <PokemonDetails
            pokemonResource={selectedPokemonResource}
            id={selectedPokemonResource.data.id}
          />
        </Suspense>
        <Suspense fallback={<Spinner />}>
          <PokemonColor pokemonResource={selectedPokemonResource} />
        </Suspense>
        <Suspense fallback={<Spinner />}>
          <PokemonEvolutions
            pokemonResource={selectedPokemonResource}
            evolutionChainResource={evolutionChainResource}
            setEvolutionChainResource={setEvolutionChainResource}
          />
        </Suspense>
      </SuspenseList>
    </div>
  )
}

export default PokemonPage

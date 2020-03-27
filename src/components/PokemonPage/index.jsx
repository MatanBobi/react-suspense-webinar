import React, { Suspense, SuspenseList } from 'react'
import Spinner from '../Spinner'

import BackButton from '../BackButton'
import PokemonDetails from '../PokemonDetails'
import PokemonColor from '../PokemonColor'
import PokemonEvolutions from '../PokemonEvolutions'
import PokemonImage from '../PokemonImage'
import { createResource } from '../../helpers/utils'

const PokemonPage = ({
  selectedPokemonResource,
  setSelectedPokemonResource,
}) => {
  return (
    <div className="pokemon-page">
      <BackButton setSelectedPokemonResource={setSelectedPokemonResource} />
      <SuspenseList revealOrder="together">
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
            evolutionChainResource={createResource(() =>
              fetch(selectedPokemonResource.data.read().species.url)
                .then(data => data.json())
                .then(pokemonSpeciesData =>
                  fetch(pokemonSpeciesData.evolution_chain.url)
                )
            )}
          />
        </Suspense>
      </SuspenseList>
    </div>
  )
}

export default PokemonPage

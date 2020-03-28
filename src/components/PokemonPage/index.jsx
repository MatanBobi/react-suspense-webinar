import React, { Suspense, useMemo } from 'react'
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
        />
      </Suspense>
    </div>
  )
}

export default PokemonPage

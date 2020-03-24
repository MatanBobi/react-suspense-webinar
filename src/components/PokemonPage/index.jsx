import React, {
  useState,
  lazy,
  Suspense,
  SuspenseList
} from 'react'
import Spinner from '../Spinner'
import { createResource, getPokemonIdFromUrl } from '../../helpers/utils'

const PokemonDetails = lazy(() => import('../PokemonDetails'))
const PokemonColor = lazy(() => import('../PokemonColor'))
const PokemonEvolutions = lazy(() => import('../PokemonEvolutions'))

const pokemonResource = createResource(() =>
  fetch(
    `https://pokeapi.co/api/v2/pokemon/${getPokemonIdFromUrl(
      window.location.pathname
    )}`
  )
)

const PokemonPage = ({
  match: {
    params: { id },
  },
}) => {
  const [evolutionChainResource, setEvolutionChainResource] = useState(null)

  return (
    <div className="pokemon-page">
      <SuspenseList revealOrder="forwards" tail="collapsed">
        <Suspense fallback={<Spinner />}>
          <PokemonDetails pokemonResource={pokemonResource} id={id} />
        </Suspense>
        <Suspense fallback={<Spinner />}>
          <PokemonColor
            pokemonResource={pokemonResource}
          />
        </Suspense>
        <Suspense fallback={<Spinner />}>
          <PokemonEvolutions
            pokemonResource={pokemonResource}
            evolutionChainResource={evolutionChainResource}
            setEvolutionChainResource={setEvolutionChainResource}
          />
        </Suspense>
      </SuspenseList>
    </div>
  )
}

export default PokemonPage

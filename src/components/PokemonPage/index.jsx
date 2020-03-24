import React, {
  useState,
  lazy,
  Suspense,
  SuspenseList
} from 'react'
import Spinner from '../Spinner'

const PokemonDetails = lazy(() => import('../PokemonDetails'))
const PokemonColor = lazy(() => import('../PokemonColor'))
const PokemonEvolutions = lazy(() => import('../PokemonEvolutions'))

const PokemonPage = ({
  match: {
    params: { id },
  }, pokemonResource,
}) => {
  const [evolutionChainResource, setEvolutionChainResource] = useState(null)
  if (!pokemonResource){
    return null
  }
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

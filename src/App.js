import React, { lazy, Suspense, useState, useTransition } from 'react'
import './App.css'
import Spinner from './components/Spinner'

const Home = lazy(() => import('./components/Home'))
const PokemonPage = lazy(() => import('./components/PokemonPage'))

function App() {
  const [selectedPokemonResource, setSelectedPokemonResource] = useState(null)
  const [startTransition, isPending] = useTransition({ timeoutMs: 3000 })
  return (
    <div className="App">
      <Suspense fallback={<Spinner />}>
        {
          isPending && <div className='pending-spinner'><Spinner/></div>
        }
        {!selectedPokemonResource ? (
          <Home
            setSelectedPokemonResource={pokemonResource =>
              startTransition(() => {
                setSelectedPokemonResource(pokemonResource)
              })
            }
          />
        ) : (
          <PokemonPage
            setSelectedPokemonResource={setSelectedPokemonResource}
            selectedPokemonResource={selectedPokemonResource}
          />
        )}
      </Suspense>
    </div>
  )
}

export default App

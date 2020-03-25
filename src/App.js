import React, { lazy, Suspense, useState } from 'react'
import './App.css'
import Spinner from './components/Spinner'
import { createResource, preloadImage, getMainImageUrl } from './helpers/utils'

const Home = lazy(() => import('./components/Home'))
const PokemonPage = lazy(() => import('./components/PokemonPage'))

function App() {
  const [selectedPokemonResource, setSelectedPokemonResource] = useState(null)
  return (
    <div className="App">
      <Suspense fallback={<Spinner />}>
        {!selectedPokemonResource ? (
          <Home setSelectedPokemonResource={setSelectedPokemonResource} />
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

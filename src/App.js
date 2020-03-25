import React, { lazy, Suspense, useState } from 'react'
import './App.css'
import Spinner from './components/Spinner'
import { createResource, preloadImage, getMainImageUrl } from './helpers/utils'
const Home = lazy(() => import('./components/Home'))
const PokemonPage = lazy(() => import('./components/PokemonPage'))

function App() {
  const [pokemonResource, setPokemonResource] = useState(null)
    return (
      <div className="App">
        {!pokemonResource ? (
          <Home setSelectedPokemon={setPokemonResource} />
        ) : (
          <PokemonPage
            setPokemonResource={setPokemonResource}
            pokemonResource={pokemonResource}
          />
        )}
      </div>
  )
}

export default App

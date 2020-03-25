import React, { useState } from 'react'
import './App.css'
import Home from './components/Home'
import PokemonPage from './components/PokemonPage'

function App() {
  const [selectedPokemon, setSelectedPokemon] = useState(null)

  return (
    <div className="App">
      {!selectedPokemon ? (
        <Home setSelectedPokemon={setSelectedPokemon} />
      ) : (
        <PokemonPage
          setSelectedPokemon={setSelectedPokemon}
          selectedPokemon={selectedPokemon}
        />
      )}
    </div>
  )
}

export default App

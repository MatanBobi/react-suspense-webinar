import React, { lazy, Suspense, useState } from 'react'
import './App.css'
import Spinner from './components/Spinner'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { createResource, preloadImage, getMainImageUrl } from './helpers/utils'
const Home = lazy(() => import('./components/Home'))
const PokemonPage = lazy(() => import('./components/PokemonPage'))

const createPokemonResource = id => ({
  data: createResource(() => fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)),
  img: createResource(() => preloadImage(getMainImageUrl(id))),
  id
})

function App() {
  const [pokemonResource, setPokemonResource] = useState(null)
  return (
    <Router>
      <div className="App">
        <Suspense fallback={<Spinner />}>
          <Switch>
            <Route
              path="/pokemon/:id"
              render={props => {
                const localPokemonResource =
                  pokemonResource &&
                  pokemonResource.id === props.match.params.id
                    ? pokemonResource
                    : createPokemonResource(props.match.params.id)
                setPokemonResource(localPokemonResource)
                return (
                  <PokemonPage pokemonResource={localPokemonResource} {...props} />
                )
              }}
            />
            <Route path="/" component={Home} />
          </Switch>
        </Suspense>
      </div>
    </Router>
  )
}

export default App

import React, { lazy, Suspense } from 'react'
import './App.css'
import Spinner from './components/Spinner'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

const Home = lazy(() => import('./components/Home'))
const PokemonPage = lazy(() => import('./components/PokemonPage'))

function App() {
  return (
    <Router>
      <div className="App">
        <Suspense fallback={<Spinner />}>
          <Switch>
            <Route path="/pokemon/:id" component={PokemonPage} />
            <Route path="/" component={Home} />
          </Switch>
        </Suspense>
      </div>
    </Router>
  )
}

export default App

import React from 'react'
import './App.css'
import Home from './components/Home'
import PokemonPage from './components/PokemonPage'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route path="/pokemon/:id" component={PokemonPage} />
          <Route path="/" component={Home} />
        </Switch>
      </div>
    </Router>
  )
}

export default App

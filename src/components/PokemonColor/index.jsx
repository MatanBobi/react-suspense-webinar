import React from 'react'
import TypeItem from '../TypeItem'

const PokemonColor = ({ pokemonResource }) => {
  const pokemonData = pokemonResource.data.read()
  
  return (
    <div className="pokemon-color">
      <h5>Types:</h5>
      <ul className="types-list">
        {pokemonData.types && pokemonData.types.map(({ type }) => <TypeItem type={type} />)}
      </ul>
    </div>
  )
}

export default PokemonColor

import React from 'react'
import TypeItem from '../TypeItem'

const PokemonColor = ({ types }) => (
  <div className="pokemon-color">
    <h5>Types:</h5>
    <ul className="types-list">
      {types && types.map(({ type }) => <TypeItem key={type.name} type={type} />)}
    </ul>
  </div>
)

export default PokemonColor

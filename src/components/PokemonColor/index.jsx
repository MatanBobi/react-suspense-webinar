import React from 'react'

const PokemonColor = ({ color }) => (
  <div className="pokemon-color">
    <h5>Color: </h5>
    <div className="pokemon-color-box" style={{ backgroundColor: color }} />
  </div>
)

export default PokemonColor

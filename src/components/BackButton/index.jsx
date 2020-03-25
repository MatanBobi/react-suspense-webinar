import React from 'react'

const BackButton = ({ setSelectedPokemonResource }) => {
  return (
    <button className="back-button" onClick={() => setSelectedPokemonResource(null)}>
      Back
    </button>
  )
}

export default BackButton

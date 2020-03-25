import React from 'react'

const BackButton = ({ setSelectedPokemon }) => {
  return (
    <button className="back-button" onClick={() => setSelectedPokemon(null)}>
      Back
    </button>
  )
}

export default BackButton

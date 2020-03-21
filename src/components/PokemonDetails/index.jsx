import React from 'react'

const PokemonDetails = ({ pokemonData, pokemonColor, id }) => (
  <>
    <h1 className="pokemon-name">{pokemonData.name}</h1>
    <div className="pokemon-image">
      {pokemonData.sprites && (
        <img
          src={`https://pokeres.bastionbot.org/images/pokemon/${id}.png`}
          alt=""
        />
      )}
    </div>
    <div className="pokemon-details">
      <h3>Details</h3>
      <h5>Top 10 Moves:</h5>
      <ul className="moves-list">
        {pokemonData &&
          pokemonData.moves &&
          pokemonData.moves.slice(0, 10).map(({ move }) => {
            return <li key={move.name}>{move.name}</li>
          })}
      </ul>
    </div>
  </>
)

export default PokemonDetails

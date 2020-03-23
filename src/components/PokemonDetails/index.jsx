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
      <h5>Stats:</h5>
      <ul className="moves-list">
        {pokemonData &&
          pokemonData.stats &&
          pokemonData.stats.map(stat => {
            return <li key={stat.stat.name}>{`${stat.stat.name}: ${stat.base_stat}`}</li>
          })}
      </ul>
      <h5>Types:</h5>
      <ul className="types-list"
      >
        {pokemonData &&
          pokemonData.types &&
          pokemonData.types.map(({type}) => {
          return <li key={type.name}>{type.name}</li>
          })}
      </ul>
    </div>
  </>
)

export default PokemonDetails

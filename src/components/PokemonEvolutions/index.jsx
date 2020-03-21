import React from 'react'

const PokemonEvolutions = ({ pokemonChain }) => {
  return (
    <div className="pokemon-evolutions">
      <h3>Evolutions</h3>
      <ul>
        {pokemonChain &&
          pokemonChain.map(pokemon => (
            <li key={pokemon.name}>
              <img
                src={`https://img.pokemondb.net/sprites/x-y/normal/${pokemon.name}.png`}
                alt={pokemon.name}
              />
            </li>
          ))}
      </ul>
    </div>
  )
}

export default PokemonEvolutions
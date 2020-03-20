import React, { useEffect, useState, useMemo } from 'react'

export const getPokemonChain = (acc, data) => {
  acc.push({
    name: data.species.name,
  })
  if (data.evolves_to.length === 0) {
    return acc
  } else {
    return data.evolves_to.reduce(getPokemonChain, acc)
  }
}

const PokemonPage = ({
  match: {
    params: { id },
  },
}) => {
  const [pokemonChainData, setPokemonChain] = useState({})
  const [pokemonData, setPokemonData] = useState({})
  const [evolutionChainUrl, setEvolutionChainUrl] = useState()
  const [pokemonColor, setPokemonColor] = useState()

  useEffect(() => {
    fetch(evolutionChainUrl)
      .then(response => response.json())
      .then(data => {
        setPokemonChain(data, [])
      })
  }, [evolutionChainUrl])
  useEffect(() => {
    fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
      .then(response => response.json())
      .then(data => {
        setPokemonData(data)
        fetch(data.species.url)
          .then(response => response.json())
          .then(data => {
            setEvolutionChainUrl(data.evolution_chain.url)
            setPokemonColor(data.color.name)
          })
      })
  }, [id])
  const pokemonChain = useMemo(() => {
    if (pokemonChainData && pokemonChainData.chain) {
      return getPokemonChain([], pokemonChainData.chain.evolves_to[0])
    }
  }, [pokemonChainData])

  return (
    <div className="pokemon-page">
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
        <h5>Color: </h5>
        <div className="pokemon-color" style={{backgroundColor: pokemonColor}}/>
      </div>
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
    </div>
  )
}

export default PokemonPage

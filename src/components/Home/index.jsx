import React from 'react'
import PokemonsList from '../PokemonsList'
import Description from '../Description'
import Header from '../Header'

const Home = () => {
  return (
    <>
      <Header>Pokémons</Header>
      <PokemonsList />
      <Description />
    </>
  )
}

export default Home

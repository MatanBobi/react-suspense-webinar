import React, { Suspense } from 'react'
import PokemonsList from '../PokemonsList'
import Description from '../Description'
import Header from '../Header'
import Spinner from '../Spinner'

const Home = () => {
  return (
    <>
      <Header>Pokémons</Header>
      <Suspense fallback={<Spinner />}>
        <PokemonsList />
      </Suspense>
      <Description />
    </>
  )
}

export default Home

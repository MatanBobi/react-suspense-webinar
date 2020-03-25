import React, { Suspense } from 'react'
import PokemonsList from '../PokemonsList'
import Footer from '../Footer'
import Header from '../Header'
import Spinner from '../Spinner'

const Home = ({ setSelectedPokemonResource }) => {
  return (
    <>
      <Header>Pokémons</Header>
      <Suspense fallback={<Spinner />}>
        <PokemonsList setSelectedPokemonResource={setSelectedPokemonResource}/>
      </Suspense>
      <Footer />
    </>
  )
}

export default Home

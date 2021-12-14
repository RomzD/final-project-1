import React, { useCallback, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'

import Header from '../features/header/Header'
import { FullPokemonCard } from '../features/pokemons/FullPokemonCard'
import { selectPokemonById, pokemonThunk, cleanStatusAndError } from '../features/pokemonsSlice'

import '../common.scss'

export default function PokemonsPage () {
  const { id: pokemonId } = useParams()
  const dispatch = useDispatch()
  const pokemon = useSelector(state => selectPokemonById(state, pokemonId))
  const nextUrl = pokemon.url

  const getDetailedPokemonInfo = useCallback(() => {
    dispatch(pokemonThunk(nextUrl))
  }, [dispatch, nextUrl])

  useEffect(() => {
    if (!pokemon.details) {
      getDetailedPokemonInfo()
    }
    return () => {
      dispatch(cleanStatusAndError())
    }
  }, [pokemon.details, dispatch, getDetailedPokemonInfo]
  )

  return (
        <>
            <Header />
            <main className="main">
                <FullPokemonCard refreshButtonCb={getDetailedPokemonInfo} pokemon={pokemon} />
            </main>
        </>
  )
}

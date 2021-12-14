import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import Header from '../features/header/Header'
import { MainPagePokemonList } from '../features/pokemons/PokemonLists'
import { LoadButton } from '../features/common/LoadMoreButton'
import { ErrorBar } from '../features/common/ErrorBar'
import { catchButtonClassName } from '../features/pokemons/PokemonCards'

import { selectPortionByPagesNumber, selectAppStates, pokemonsThunk, catchPokemon, releasePokemon, cleanStatusAndError } from '../features/pokemonsSlice'
import { appStatus, pokemonFreedomStates } from '../constants'
import { entriesPerPage } from '../app-config'

import '../common.scss'

export default function MainPage () {
  const [pagesCount, setPagesCount] = useState(1)

  const dispatch = useDispatch()
  const [allPokemons, availablePokemonsCount, currentAppStatus, pokemonLimit, nextUrl, errorMsg] = useSelector(selectAppStates)
  const nextPokemonPortion = entriesPerPage * pagesCount + entriesPerPage
  const pokemonsToRender = useSelector(state => selectPortionByPagesNumber(state, pagesCount))

  const onLoadMoreButtonClicked = async () => {
    if (currentAppStatus === appStatus.loading) {
      return
    }

    if (nextPokemonPortion <= availablePokemonsCount) {
      setPagesCount(pagesCount + 1)
      return
    }

    if (nextPokemonPortion < pokemonLimit + entriesPerPage) {
      try {
        await dispatch(pokemonsThunk(nextUrl)).unwrap()
      } catch (err) {
        return
      }
      setPagesCount(pagesCount + 1)
    }
  }

  const onPokemonCardButtonClicked = (e) => {
    const catcButtonClass = catchButtonClassName
    const targetClass = e.target.className

    if (targetClass !== catcButtonClass) {
      e.stopPropagation()
      return
    }

    const pokemonId = Number(e.target.value)
    const action = allPokemons[pokemonId].catchTime ? pokemonFreedomStates.release : pokemonFreedomStates.catch
    if (action === pokemonFreedomStates.catch) {
      dispatch(catchPokemon(pokemonId))
    } else {
      dispatch(releasePokemon(pokemonId))
    }
  }

  useEffect(() => {
    return () => {
      dispatch(cleanStatusAndError())
    }
  }, [dispatch]
  )

  return (
        <>
            <Header />
            <main onClick={onPokemonCardButtonClicked} className="main">
                <MainPagePokemonList pokemons={pokemonsToRender} />
                <LoadButton callback={onLoadMoreButtonClicked} />
                <ErrorBar appState={currentAppStatus} errorStatus={errorMsg} />
            </main>
        </>
  )
}

import React, { useState } from 'react'
import { useSelector } from 'react-redux'

import Header from '../features/header/Header'
import { CaughtPokemonList } from '../features/pokemons/PokemonLists'
import { InfoContainer } from '../features/common/InfoContainer'
import { LoadButton } from '../features/common/LoadMoreButton'
import { selectCaughtIdsAndAllPokemonObjects } from '../features/pokemonsSlice'

import '../common.scss'
export default function CaughtPokemonsPage () {
  const [pagesCount, setPagesCount] = useState(1)

  const [allPokemons, caughtPokemons] = useSelector(state => selectCaughtIdsAndAllPokemonObjects(state))
  const entriesPerPage = useSelector(state => state.pokemons.entriesPerPage)
  const currentPortion = entriesPerPage * pagesCount

  const emptyCollectionMsg = "You've got 0 pokemons"
  const allCollectionLoadedMsg = "That's all you've got for now"
  const pokemonsToRender = caughtPokemons.filter((id, i) => i < currentPortion)
    .map(id => allPokemons[id])

  const onLoadButtonClicked = () => {
    setPagesCount(pagesCount + 1)
  }

  const additionPageContent = () => {
    if (!caughtPokemons.length) {
      return (
                <InfoContainer msg={emptyCollectionMsg} />
      )
    }

    if (currentPortion >= caughtPokemons.length) {
      return (
                <InfoContainer msg={allCollectionLoadedMsg} />
      )
    }

    return (
            <LoadButton callback={onLoadButtonClicked} />
    )
  }

  return (
        <>
            <Header />
            <main className="main">
                <CaughtPokemonList pokemons={pokemonsToRender} />
                {additionPageContent() }
            </main>
        </>
  )
}

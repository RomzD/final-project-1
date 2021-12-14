import React from 'react'

import { MinimizedPokemonCard, CaughtPokemonCard } from './PokemonCards'

export const MainPagePokemonList = React.memo(({ pokemons }) => (
    <>{
        pokemons.map((pokemon, index) => (
            <MinimizedPokemonCard key={index} pokemon={pokemon} />
        ))
    }
    </>
))

export const CaughtPokemonList = React.memo(({ pokemons }) => (
    <>{
        pokemons.map((pokemon, index) => (
            <CaughtPokemonCard key={index} pokemon={pokemon} />
        ))
    }
    </>
))

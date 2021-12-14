import React from 'react'
import { Link } from 'react-router-dom'

import { pokemonFreedomStates, pathToPokemonPage } from '../../constants'

import './PokemonCard.scss'

export const catchButtonClassName = 'pokemonCard__button'

const CommonCardFields = ({ pokemon }) => (
    <Link className="pokemonCard__link" to={`${pathToPokemonPage}${pokemon.id}`}>
        <div>{'#' + pokemon.id}</div>
        <div>{pokemon.name}</div>
    </Link >
)

const SetPokemonFreedomStateButton = ({ pokemon }) => (
    <div className="pokemonCard__buttonContainer">
        <button className={catchButtonClassName} value={pokemon.id}>
            {pokemon.catchTime ? pokemonFreedomStates.release : pokemonFreedomStates.catch}
        </button>
    </div>
)

export const MinimizedPokemonCard = ({ pokemon }) => (
    <div className="pokemonCard pokemonCard_regular">
        <CommonCardFields pokemon={pokemon} />
        <SetPokemonFreedomStateButton pokemon={pokemon} />
    </div>

)

export const CaughtPokemonCard = ({ pokemon }) => (
    <div className="pokemonCard pokemonCard_regular">
        <CommonCardFields pokemon={pokemon} />
        <div className="pokemonCard__stat-container pokemonCard__stat-container_theme-catched">{'caught on: ' + pokemon.catchTime}</div>
    </div>
)

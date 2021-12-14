import React from 'react'
import { useSelector } from 'react-redux'

import { defaultImage, appStatus } from '../../constants'
import { InfoContainerWithButton, InfoContainer } from '../common/InfoContainer'
import './PokemonCard.scss'

const PokemonStat = ({ stats, title, statPropName }) => (
    <div className="pokemonCard__stat-container">
        <h2 className="pokemonCard__stat-title">{title}</h2>
        {stats.map((stat, i) => <div key={i} className="pokemonCard__stat-value">{stat[statPropName].name} </div>)}
    </div>
)

export const FullPokemonCard = function ({ pokemon, refreshButtonCb }) {
  const currentAppStatus = useSelector(state => state.pokemons.status)
  const error = useSelector(state => state.pokemons.error)
  const img = pokemon?.details?.img ? pokemon.details.img : defaultImage

  const additionalCardContent = () => {
    if (pokemon.details) {
      return (
                <div className="pokemonCard__stat-container pokemonCard__stat-container_outer">
                    <PokemonStat title="types" statPropName="type" stats={pokemon.details.types} />
                    <PokemonStat title="abilities" statPropName="ability" stats={pokemon.details.abilities} />
                    <div>{`${pokemon.catchTime ? 'caught on: ' + pokemon.catchTime : 'yet to catch'}`}</div>
                    <div>{`weight: ${pokemon.details.weight}`}</div>
                </div>
      )
    }

    if (currentAppStatus === appStatus.loading) {
      const loadingMessage = '...loading information'
      return <>
                <InfoContainer className="infoContainer infoContainer_theme-pokemon-info" msg={loadingMessage} />
            </>
    }

    if (currentAppStatus === appStatus.error) {
      const errorMessage = `${error}.Press refresh button in several moments`
      return (
                <>
                    <InfoContainerWithButton cb={refreshButtonCb} buttonText={'refresh'} msg={errorMessage} />
                </>
      )
    }
  }

  return (
        <div className="pokemonCard pokemonCard_full">
            <div>
                <figure className="pokemonCard__figure">
                    <img alt={pokemon.name} className="pokemonCard__img" src={img}></img>
                    <figcaption className="pokemonCard__figcaption" >{`#${pokemon.id} ${pokemon.name}`}</figcaption>
                </figure>
            </div>
            {additionalCardContent()}
        </div>
  )
}

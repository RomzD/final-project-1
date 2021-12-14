import React from 'react'

import './InfoContainer.scss'

export const InfoContainer = ({ msg }) => (
        <div className={'infoContainer infoContainer_regular'}>
            <p>{msg}</p>
        </div>
)

export const InfoContainerWithButton = ({ msg, cb, buttonText }) => (
        <div className={'infoContainer infoContainer_theme-pokemon-info'}>
            <p>{msg}</p>
            <button className="pokemonCard__button pokemonCard__button_theme-refresh" onClick={cb}>{buttonText}</button>
        </div>
)

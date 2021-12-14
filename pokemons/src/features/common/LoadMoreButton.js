import React from 'react'

import './LoadMoreButton.scss'

export const LoadButton = ({ callback }) => (
    <button onClick={() => callback()} className="button button_theme-load-button">
        Load More
    </button>
)

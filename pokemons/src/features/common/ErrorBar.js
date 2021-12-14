import React from 'react'
import { appStatus } from '../../constants'

import './ErrorBar.scss'

export const ErrorBar = ({ appState, errorStatus }) => {
  const className = appState === appStatus.error
    ? 'errorBar errorBar_regular'
    : 'errorBar errorBar_hidden'

  return (<div className={className}>
        {`${errorStatus}. Try again by clicking "Load More" button.`}
    </div>
  )
}

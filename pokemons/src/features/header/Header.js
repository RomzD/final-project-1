import React from 'react'
import NavBar from '../navbar/NavBar'

import './Header.scss'

const Header = React.memo(() => {
  return (
        <header className="header header_regular">
            <NavBar />
        </header>
  )
}
)

export default Header

import React from 'react'

import MenuItem from './NavMenuItem'

import './NavBar.scss'
const menuItemsList = [
  {
    link: '/',
    text: 'home',
    icon: 'home-outline'
  },
  {
    link: '/collection',
    text: 'collection',
    icon: 'book-outline'
  }
]

export default function NavBar () {
  return (
        <nav className="navBar navBar_theme-regular">
            <ul className="menu-list menu-list_flex">
                {menuItemsList.map((item, index) => < MenuItem key={index} item={item} />)}
            </ul>
        </nav>
  )
}

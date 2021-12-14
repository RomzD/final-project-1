import React from 'react'
import { Link } from 'react-router-dom'

import './NavMenuItem.scss'

export default function MenuItem ({ item }) {
  return (
        <li className="menu-list__item">
            <Link className="menu-list__link" to={item.link}>
                <ion-icon tooltip="a" name={item.icon}></ion-icon>
                <span className="menu-list__text">{item.text}</span>
            </Link>
        </li>
  )
}

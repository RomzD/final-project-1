import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

import MainPage from './pages/MainPage'
import CaughtPokemonsPage from './pages/CaughtPokemonsPage'
import PokemonsPage from './pages/PokemonPage'

import { pathToPokemonPage } from './constants'

import './App.css'

function App () {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<MainPage />} />
        <Route exact path="/collection" element={<CaughtPokemonsPage />} />
        <Route exact path={`${pathToPokemonPage}:id`} element={<PokemonsPage />} />
      </Routes>
    </Router>
  )
}

export default App

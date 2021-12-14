import { configureStore } from '@reduxjs/toolkit'
import { pokemonsReducer } from '../features/pokemonsSlice'

export const store = configureStore({
  reducer: {
    pokemons: pokemonsReducer
  }
})

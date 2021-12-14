import { fetchPokemons } from '../thunks/fetchPokemons'
import { createEntityAdapter, createSlice, createAsyncThunk, createSelector } from '@reduxjs/toolkit'
import { entriesPerPage } from '../app-config'
import { appStatus } from '../constants'

export const pokemonsThunk = createAsyncThunk('pokemons/fetchPokemons', fetchPokemons)
export const pokemonThunk = createAsyncThunk('pokemons/fetchPokemon', fetchPokemons)

const pokemonsAdapter = createEntityAdapter({
  selectId: (pokemon) => pokemon.id
})

const initialState = pokemonsAdapter.getInitialState({
  caughtPokemonsIds: [],
  count: null,
  idCounter: 1,
  nextUrl: null,
  entriesPerPage,
  status: appStatus.idle,
  error: null
})

const pokemonsSlice = createSlice({
  name: 'pokemons',
  initialState,
  reducers: {
    catchPokemon: {
      reducer: (state, action) => {
        const { pokemonId, catchTime } = action.payload
        const pokemonEntity = state.entities[pokemonId]
        pokemonEntity.catchTime = catchTime
        state.caughtPokemonsIds.push(pokemonId)
      },
      prepare: (id) => (
        {
          payload: {
            pokemonId: Number(id),
            catchTime: new Date().toLocaleString()
          }
        }
      )
    },
    releasePokemon: {
      reducer: (state, action) => {
        const { pokemonId } = action.payload
        const pokemonEntity = state.entities[pokemonId]

        pokemonEntity.catchTime = null
        state.caughtPokemonsIds = state.caughtPokemonsIds.filter(itemId => itemId !== pokemonId)
      },
      prepare: (id) => (
        {
          payload:
                    {
                      pokemonId: Number(id)
                    }
        }
      )
    },
    cleanStatusAndError: (state, action) => {
      state.error = null
      state.status = appStatus.idle
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(pokemonsThunk.pending, (state, action) => {
        state.status = appStatus.loading
      })
      .addCase(pokemonsThunk.fulfilled, (state, action) => {
        const { results: pokemonsArray, count, next: nextUrl } = action.payload
        pokemonsArray.forEach((pokemon, index) => { pokemon.id = state.idCounter++ })

        state.status = appStatus.idle
        state.nextUrl = nextUrl

        if (!state.count) {
          state.count = count
        }

        pokemonsAdapter.upsertMany(state, pokemonsArray)
      })
      .addCase(pokemonsThunk.rejected, (state, action) => {
        state.status = appStatus.error
        state.error = action.error.message
      })
      .addCase(pokemonThunk.pending, (state, action) => {
        state.status = appStatus.loading
      })
      .addCase(pokemonThunk.fulfilled, (state, action) => {
        const { id: pokemonId, abilities, weight, types } = action.payload
        const img = action.payload.sprites.other['official-artwork'].front_default
        state.status = appStatus.idle
        state.entities[pokemonId].details = { abilities, weight, types, img }
      })
      .addCase(pokemonThunk.rejected, (state, action) => {
        state.status = appStatus.error
        state.error = action.error.message
      })
  }
})

export const selectPokemonById = (state, id) => {
  id = Number(id)

  return state.pokemons.entities[id]
}

export const {
  selectAll,
  selectById,
  selectIds
} = pokemonsAdapter.getSelectors(state => state.pokemons)

export const selectCaughtIdsAndAllPokemonObjects = createSelector(
  [state => state.pokemons.entities, state => state.pokemons.caughtPokemonsIds],
  (allPokemons, caughtPokemonsIds) => ([allPokemons, caughtPokemonsIds])
)

export const selectAppStates = createSelector(
  [state => state.pokemons.entities, state => state.pokemons],
  (allPokemonIds, state) => {
    const allPokemons = allPokemonIds
    const availablePokemonsCount = state.ids.length
    const currentAppStatus = state.status
    const pokemonLimit = state.count
    const nextUrl = state.nextUrl
    const errorMsg = state.error
    return [allPokemons, availablePokemonsCount, currentAppStatus, pokemonLimit, nextUrl, errorMsg]
  }
)

export const selectPortionByPagesNumber = createSelector(
  [selectAll, (state) => state.pokemons.entriesPerPage, (state, pagesCount) => pagesCount],
  (pokemons, entriesPerPage, pagesCount) => {
    const entriesLimit = pagesCount * entriesPerPage
    return pokemons.filter((pokemon, i) => i < entriesLimit)
  }
)

export const { catchPokemon, releasePokemon, cleanStatusAndError } = pokemonsSlice.actions

export const pokemonsReducer = pokemonsSlice.reducer

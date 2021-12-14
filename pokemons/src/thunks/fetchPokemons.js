import { entriesPerPage, baseURL } from '../app-config'
import { firstPokemonIndex } from '../constants'

const axios = require('axios').default
// let counter = 0 // counter is in charge of syntetic error producing in case of testing

export const fetchPokemons = async (nextURL) => {
  let params = null

  if (!nextURL) {
    nextURL = baseURL
    params = {
      offset: firstPokemonIndex,
      limit: entriesPerPage
    }
  }

  // if (counter % 2 !== 0) {
  //   counter++
  //   throw new Error('syntetic error')
  // }

  const response = await axios.get(
    nextURL,
    { params }
  )

  if (response.status < 200 || response.status > 300) {
    throw new Error(response.status)
  }

  const result = response.data
  // counter++
  return result
}

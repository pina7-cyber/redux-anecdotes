import { createSlice } from '@reduxjs/toolkit'
import anecdotesService from '../services/anecdotes'

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    update(state, action) {
      const id = action.payload.id
      return state
        .map((anecdote) => (anecdote.id !== id ? anecdote : action.payload))
        .sort((a, b) => b.votes - a.votes)
    },
    appendNote(state, action) {
      state.push(action.payload)
    },
    setAnecdotes(state, action) {
      return action.payload
    }
  },
})

export const { update, appendNote, setAnecdotes } = anecdoteSlice.actions

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdotesService.getAll()
    dispatch(setAnecdotes(anecdotes))
  }
}

export const create = content => {
  return async dispatch => {
    const newAnecdote = await anecdotesService.createNew(content)
    dispatch(appendNote(newAnecdote))
  }
}

export const voteAnecdote = anecdoteObject => {
  return async dispatch => {
    const changedAnecdote = {
      ...anecdoteObject,
      votes: anecdoteObject.votes + 1,
    }
    const id = anecdoteObject.id
    const newAnecdote = await anecdotesService.update(id, changedAnecdote)
    dispatch(update(newAnecdote))
  }
}

export default anecdoteSlice.reducer
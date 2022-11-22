import { createSlice } from '@reduxjs/toolkit'

const messageSlice = createSlice({
  name: 'messages',
  initialState: null,
  reducers: {
    addNotification( state, action) {
      if (state) {
        clearTimeout(state.timeoutID)
      }
      return action.payload
    },
    removeNotification() {
      return null
    },
  },
})

export const { voteNotification, addNotification, removeNotification } =
  messageSlice.actions

export const setNotification = (content, sec) => {
  return dispatch => {
    const millisec = sec * 1000
    const timeoutID = setTimeout(() => {
      dispatch(removeNotification())
    }, millisec)
    const messageObject = { content: content, timeoutID: timeoutID }
    dispatch(addNotification(messageObject))
  }
}

export default messageSlice.reducer

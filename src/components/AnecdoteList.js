import { useSelector, useDispatch } from 'react-redux'
import { voteAnecdote } from '../reducers/anecdoteReducer'
import {
  setNotification
} from '../reducers/messageReducer'

const AnecdoteList = () => {
  const anecdotes = useSelector((state) => state.anecdotes)
  const term = useSelector((state) => state.filter)
  const dispatch = useDispatch()

  const vote = async (anecdote) => {
    dispatch(voteAnecdote(anecdote))
    dispatch(setNotification(`you voted '${anecdote.content}'`, 5))
  }

  return (
    <div>
      {anecdotes
        .filter((anecdote) => anecdote.content.toLowerCase().includes(term))
        .sort((a, b) => b.votes - a.votes)
        .map((anecdote) => (
          <div key={anecdote.id}>
            <div>{anecdote.content}</div>
            <div>
              has {anecdote.votes}
              <button onClick={() => vote(anecdote)}>
                vote
              </button>
            </div>
          </div>
        ))}
    </div>
  )
}

export default AnecdoteList

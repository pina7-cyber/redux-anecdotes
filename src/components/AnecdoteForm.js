import { connect } from 'react-redux'
import { create } from '../reducers/anecdoteReducer'
import {
  setNotification
} from '../reducers/messageReducer'

const AnecdoteForm = (props) => {

  const addAnecdote = async (event) => {
    event.preventDefault()
    const content = event.target.content.value
    event.target.content.value = ''
    props.create(content)
    props.setNotification(`new anecdote '${content}'`, 5)
  }

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={addAnecdote}>
        <div>
          <input name='content' />
        </div>
        <button type='submit'>create</button>
      </form>
    </div>
  )
}

export default connect( null,
  {
    create, setNotification
  }
)(AnecdoteForm)


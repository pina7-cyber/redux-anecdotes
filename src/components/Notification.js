import { connect } from 'react-redux'

const Notification = (props) => {

  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
  }

  if (props.notification === null) {
    return null
  } else {
    return <div style={style}>{props.notification}</div>
  }
}

const mapStateToProps = (state) => {
  if ( state.messages === null ) {
    return {
      notification: state.messages
    }
  }
  return {
    notification: state.messages.content
  }
}

export default connect( mapStateToProps,
  null
)(Notification)


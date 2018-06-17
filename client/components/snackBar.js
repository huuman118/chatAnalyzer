import React from 'react'
import Snackbar from '@material-ui/core/Snackbar'

class PositionedSnackbar extends React.Component {
  state = {
    open: true
  }

  handleClick = state => () => {
    this.setState({open: true, ...state})
  }

  handleClose = () => {
    this.setState({open: false})
  }

  render() {
    const type = this.props.type
    const {status, updated} = this.props.snackdata
    return (
      <div>
        {status === 'ok' && (
          <Snackbar
            anchorOrigin={{vertical: 'top', horizontal: 'right'}}
            autoHideDuration={2000}
            open={this.state.open}
            onClose={this.handleClose}
            key={type}
            ContentProps={{
              'aria-describedby': 'message-id'
            }}
            message={
              <span id="message-id">
                {updated} New Items {type}
              </span>
            }
          />
        )}
      </div>
    )
  }
}

export default PositionedSnackbar

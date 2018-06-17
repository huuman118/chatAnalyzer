import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {updateMessage} from '../store'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'

const Navbar = ({handleClick}) => (
  <AppBar>
    <Toolbar>
      <Typography variant="title" color="textSecondary">
        Chat Analyzer - #huuchatappchannel
      </Typography>
      <nav>
        {
          <div>
            {/* The navbar will show these links after you log in */}
            <Button>
              <Link to="/home">Home</Link>
            </Button>
            <Button href="#" onClick={handleClick}>
              <Link to="/analysis">Update Data</Link>
            </Button>
            <Button>
              <Link to="/analysis">Analysis</Link>
            </Button>
          </div>
        }
      </nav>
      <hr />
    </Toolbar>
  </AppBar>
)

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    isLoggedIn: true
  }
}

const mapDispatch = dispatch => {
  return {
    handleClick() {
      dispatch(updateMessage())
    }
  }
}

export default connect(mapState, mapDispatch)(Navbar)

/**
 * PROP TYPES
 */
Navbar.propTypes = {
  handleClick: PropTypes.func.isRequired
}

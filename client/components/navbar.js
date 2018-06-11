import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {logout} from '../store'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'

const Navbar = ({handleClick, isLoggedIn}) => (
  <AppBar>
    <Toolbar>
      <Typography variant="title" color="textSecondary">
        Huu's Chat Analyzer
      </Typography>
      <nav>
        {isLoggedIn ? (
          <div>
            {/* The navbar will show these links after you log in */}
            <Button>
              <Link to="/home">Home</Link>
            </Button>
            <Button href="#" onClick={handleClick}>
              Logout
            </Button>
          </div>
        ) : (
          <div>
            {/* The navbar will show these links before you log in */}
            <Button>
              <Link to="/login">Login</Link>
            </Button>
            <Button>
              <Link to="/signup">Sign Up</Link>
            </Button>
          </div>
        )}
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
    isLoggedIn: !!state.user.id
  }
}

const mapDispatch = dispatch => {
  return {
    handleClick() {
      dispatch(logout())
    }
  }
}

export default connect(mapState, mapDispatch)(Navbar)

/**
 * PROP TYPES
 */
Navbar.propTypes = {
  handleClick: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}

import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import Typography from '@material-ui/core/Typography'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import {Link} from 'react-router-dom'

/**
 * COMPONENT
 */
export const UserHome = props => {
  const {email} = props

  return (
    <div className="welcome-block">
      <Typography variant="title" color="inherit">
        Welcome to Huu's Slack Channel Analyzer
      </Typography>
      <Typography variant="subheading">
        The app uses the following techonologies:
      </Typography>
      <List component="nav">
        <ListItem button component="a" href="https://api.slack.com/">
          <ListItemText primary="Slack API" />
        </ListItem>
        <ListItem
          button
          component="a"
          href="https://www.ibm.com/watson/services/tone-analyzer/"
        >
          <ListItemText primary="IBM Watson's Tone Analyzer API" />
        </ListItem>
        <ListItem button component="a" href="https://material-ui.com/">
          <ListItemText primary="Material-UI" />
        </ListItem>
      </List>
      <Typography variant="subheading">
        <Link to="/analysis">Click here to View Analysis!</Link>
      </Typography>
    </div>
  )
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    email: state.user.email
  }
}

export default connect(mapState)(UserHome)

/**
 * PROP TYPES
 */
UserHome.propTypes = {
  email: PropTypes.string
}

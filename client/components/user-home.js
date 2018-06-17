import React from 'react'
import Typography from '@material-ui/core/Typography'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import {Link} from 'react-router-dom'

/**
 * COMPONENT
 */
export const UserHome = props => {
  return (
    <div className="welcome-block">
      <Typography variant="title" color="primary">
        Welcome to Huu's Slack Channel Analyzer
      </Typography>
      <p>This app automatically: </p>
      <ol>
        <li>scrapes the FullStack Slack Channel #huuchatappchannel</li>
        <li>sends the data to Watson for tone analysis</li>
        <li>displays the results via this app</li>
      </ol>
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

export default UserHome

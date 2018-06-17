import React from 'react'
import Typography from '@material-ui/core/Typography'
import {Link} from 'react-router-dom'
import ChatScreen from './chatScreen'

/**
 * COMPONENT
 */
export const UserHome = props => {
  return (
    <div className="flexWrapper">
      <div className="welcome-block">
        <Typography variant="title" color="primary">
          Welcome to Huu's Slack Channel Analyzer
        </Typography>
        <p>This app automatically: </p>
        <ol>
          <li>
            scrapes messages from the FullStack Slack Channel #huuchatappchannel
          </li>
          <li>sends the data to Watson for tone analysis</li>
          <li>displays the results via this app</li>
        </ol>
        <Typography variant="subheading">
          <Link to="/analysis">Click here to View Analysis!</Link>
        </Typography>
        <Typography variant="subheading">
          The app uses the following techonologies:
        </Typography>
        <ul>
          <li>
            <a href="https://api.slack.com/">Slack API</a>
          </li>
          <li>
            <a href="https://www.ibm.com/watson/services/tone-analyzer/">
              IBM Watson's Tone Analyzer API
            </a>
          </li>
          <li>
            <a href="https://material-ui.com/">Material-UI</a>
          </li>
          <li>
            <a href="http://nivo.rocks/">d3 via Nivo Package</a>
          </li>
        </ul>
      </div>
      <ChatScreen />
    </div>
  )
}

/**
 * CONTAINER
 */

export default UserHome

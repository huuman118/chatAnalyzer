import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import Typography from '@material-ui/core/Typography'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import {Link} from 'react-router-dom'
import PositionedSnackbar from './snackBar'

/**
 * COMPONENT
 */
export const Analysis = props => {
  return (
    <div className="welcome-block">
      <div>I'm in analysis</div>
      <PositionedSnackbar type="Scraped" snackdata={props.scraped} />
      <PositionedSnackbar type="Analyzed" snackdata={props.analyzed} />
    </div>
  )
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    scraped: state.message.scrapData,
    analyzed: state.message.analyzeData
  }
}

export default connect(mapState)(Analysis)

/**
 * PROP TYPES
 */
Analysis.propTypes = {
  email: PropTypes.string
}

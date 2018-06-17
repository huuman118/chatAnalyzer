import React from 'react'
import {connect} from 'react-redux'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Switch from '@material-ui/core/Switch'
import PositionedSnackbar from './snackBar'
import BarChart from './barChart'
import dataFormat from './analysisHelper'

class Analysis extends React.Component {
  constructor() {
    super()
    this.state = {
      allUser: true
    }
  }
  handleChange = name => event => {
    this.setState({[name]: event.target.checked})
  }
  render() {
    return (
      <div>
        <FormControlLabel
          control={
            <Switch
              checked={this.state.allUser}
              onChange={this.handleChange('allUser')}
              value={this.state.allUser}
              color="primary"
            />
          }
          label="All Users"
        />
        <PositionedSnackbar type="Scraped" snackdata={this.props.scraped} />
        <PositionedSnackbar type="Analyzed" snackdata={this.props.analyzed} />
        {this.state.allUser ? (
          <BarChart data={this.props.allData} keys={this.props.keys} />
        ) : (
          <BarChart data={this.props.userData} keys={this.props.keys} />
        )}
      </div>
    )
  }
}

const mapState = state => {
  const keys = [
    'LT3words',
    'noTone',
    'sad',
    'frustrated',
    'satisfied',
    'excited',
    'polite',
    'impolite',
    'sympathetic'
  ]
  const allData = [dataFormat('allUsers', state.message.allMessage)]
  const users = {}
  let userData = []
  for (let i = 0; i < state.message.allMessage.length; i++) {
    if (users[state.message.allMessage[i].user]) {
      users[state.message.allMessage[i].user]++
    } else {
      users[state.message.allMessage[i].user] = 1
    }
  }
  for (let keys in users) {
    userData.push(
      dataFormat(
        keys,
        state.message.allMessage.filter(message => message.user === keys)
      )
    )
  }

  return {
    scraped: state.message.scrapData,
    analyzed: state.message.analyzeData,
    keys,
    allData,
    userData
  }
}

export default connect(mapState)(Analysis)

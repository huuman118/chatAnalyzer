import React from 'react'
import {connect} from 'react-redux'
import PositionedSnackbar from './snackBar'
import BarChart from './barChart'

export const Analysis = props => {
  return (
    <div>
      <PositionedSnackbar type="Scraped" snackdata={props.scraped} />
      <PositionedSnackbar type="Analyzed" snackdata={props.analyzed} />
      <BarChart data={props.data} keys={props.keys} />
    </div>
  )
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
  const data = [
    {
      user: 'allUsers',
      LT3words: state.message.allMessage.filter(message => {
        return message.text.split(' ').length <= 3
      }).length,
      LT3wordsColor: 'hsl(165, 70%, 50%)',
      noTone: state.message.allMessage.filter(message => {
        return message.text.split(' ').length > 3 && !message.score
      }).length,
      noToneColor: 'hsl(263, 70%, 50%)',
      sad: state.message.allMessage.filter(message => {
        return (
          message.text.split(' ').length > 3 &&
          message.score &&
          message.tone_id === 'sad'
        )
      }).length,
      sadColor: 'hsl(230, 70%, 50%)',
      frustrated: state.message.allMessage.filter(message => {
        return (
          message.text.split(' ').length > 3 &&
          message.score &&
          message.tone_id === 'frustrated'
        )
      }).length,
      frustratedColor: 'hsl(334, 70%, 50%)',
      satisfied: state.message.allMessage.filter(message => {
        return (
          message.text.split(' ').length > 3 &&
          message.score &&
          message.tone_id === 'satisfied'
        )
      }).length,
      satisfiedColor: 'hsl(116, 70%, 50%)',
      excited: state.message.allMessage.filter(message => {
        return (
          message.text.split(' ').length > 3 &&
          message.score &&
          message.tone_id === 'excited'
        )
      }).length,
      excitedColor: 'hsl(301, 70%, 50%)',
      polite: state.message.allMessage.filter(message => {
        return (
          message.text.split(' ').length > 3 &&
          message.score &&
          message.tone_id === 'polite'
        )
      }).length,
      impolite: state.message.allMessage.filter(message => {
        return (
          message.text.split(' ').length > 3 &&
          message.score &&
          message.tone_id === 'impolite'
        )
      }).length,
      impoliteColor: 'hsl(1, 70%, 50%)',
      sympathetic: state.message.allMessage.filter(message => {
        return (
          message.text.split(' ').length > 3 &&
          message.score &&
          message.tone_id === 'sympathetic'
        )
      }).length,
      sympatheticColor: 'hsl(60, 70%, 50%)'
    }
  ]
  return {
    scraped: state.message.scrapData,
    analyzed: state.message.analyzeData,
    keys: keys,
    data: data
  }
}

export default connect(mapState)(Analysis)

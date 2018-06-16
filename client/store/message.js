import axios from 'axios'
import history from '../history'

/**
 * ACTION TYPES
 */
const GET_MESSAGE = 'GET_MESSAGE'
const ADD_MESSAGE = 'ADD_MESSAGE'
const SCRAP_DATA = 'SCRAP_DATA'
const ANALYZE_DATA = 'ANALYZE_DATA'

/**
 * INITIAL STATE
 */
const defaultMessage = {
  allMessage: [],
  scrapData: {
    status: 'default',
    updated: 0
  },
  analyzeData: {
    status: 'default',
    updated: 0
  }
}

/**
 * ACTION CREATORS
 */
const getMessage = message => ({type: GET_MESSAGE, message})
const addMessage = message => ({type: ADD_MESSAGE, message})
const scrapData = response => ({type: SCRAP_DATA, response})
const analyzeData = response => ({type: ANALYZE_DATA, response})

/**
 * THUNK CREATORS
 */
export const loadMessage = () => dispatch =>
  axios
    .get('/api/message')
    .then(res => dispatch(getMessage(res.data)))
    .catch(err => console.error(err))

export const updateMessage = () => async dispatch => {
  try {
    const scrapedData = await axios.put('/api/message')
    dispatch(scrapData(scrapedData.data))
    const analyzedData = await axios.put('/api/analyze')
    dispatch(
      analyzeData({
        status: analyzedData.data.status,
        updated: analyzedData.data.newData.length
      })
    )
    dispatch(addMessage(analyzedData.data.newData))
  } catch (err) {
    next(err)
  }
}

/**
 * REDUCER
 */
export default function(state = defaultMessage, action) {
  switch (action.type) {
    case GET_MESSAGE:
      return {...state, allMessage: action.message}
    case ADD_MESSAGE:
      return {...state, allMessage: [...state.allMessage, ...action.message]}
    case SCRAP_DATA:
      return {...state, scrapData: action.response}
    case ANALYZE_DATA:
      return {...state, analyzeData: action.response}
    default:
      return state
  }
}

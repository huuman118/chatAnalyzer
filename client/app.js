import React from 'react'

import {Navbar} from './components'
import Routes from './routes'
import {MuiThemeProvider, createMuiTheme} from '@material-ui/core/styles'
import teal from '@material-ui/core/colors/teal'
import blueGrey from '@material-ui/core/colors/blueGrey'

const theme = createMuiTheme({
  palette: {
    primary: teal,
    secondary: blueGrey
  },
  status: {
    danger: 'orange'
  }
})

const App = () => {
  return (
    <MuiThemeProvider theme={theme}>
      <Navbar />
      <div className="content">
        <Routes />
      </div>
    </MuiThemeProvider>
  )
}

export default App

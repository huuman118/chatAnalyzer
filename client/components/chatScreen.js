import React from 'react'
import PropTypes from 'prop-types'
import {withStyles} from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import Typography from '@material-ui/core/Typography'

const styles = {
  card: {
    maxWidth: 345
  },
  media: {
    height: 0,
    paddingTop: '56.25%' // 16:9
  }
}

function ChatScreen(props) {
  const {classes} = props
  return (
    <div>
      <Card className={classes.card}>
        <CardMedia
          className={classes.media}
          image="/IMG_9019.png"
          title="Slack Channel"
        />
        <CardContent>
          <Typography gutterBottom variant="headline" component="h2">
            Go to #huuchatappchannel
          </Typography>
          <Typography component="p">
            Type a message with more than 3 words and we'll analyze it!
          </Typography>
        </CardContent>
      </Card>
    </div>
  )
}

ChatScreen.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(ChatScreen)

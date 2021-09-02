import React, { useEffect } from 'react';
import { useMutation } from '@apollo/client';
// import { SET_SUBSCRIBED } from '../utils/mutations';
import { Grid, Card } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
  root: {
    minWidth: 275,
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});

function Success() {
  // const [addOrder] = useMutation(SET_SUBSCRIBED);
  const classes = useStyles();

  useEffect(() => {
    async function subscribe() {
      setTimeout(() => {
        window.location.assign('/Calendar');
      }, 3000);
    }

    subscribe();
  }, []);

  return (
    <Card className={classes.root} >
      <CardContent>
        <Typography variant="h5" component="h2">
          Thank You For Subscribing
        </Typography>
        <Typography variant="h5" component="h2">
          You are now a premium member
        </Typography>
        <Typography className={classes.pos} color="textSecondary">
          You will be redireted back to Amazing Day Planner shortly...
        </Typography>
      </CardContent>
    </Card>
  );
}

export default Success;

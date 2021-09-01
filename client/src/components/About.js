import React from 'react';
import Cards from './Cards';
import AppBar from './Appbar';
import Grid from '@material-ui/core/Grid';
import CssBaseline from '@material-ui/core/CssBaseline';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) =>({
  root: {
    height: '100vh',
    backgroundColor: theme.palette.background.paper,
  }

}));

export default function About() {
  const classes = useStyles();
  return (
    <Grid container component="main" className={classes.root} spacing={2} m={1}>
      <CssBaseline />
      <Grid item xs={12}>
        <AppBar />
      </Grid>
      <Grid item xs={12}>
        <Cards />
      </Grid>
    </Grid>
  )

};
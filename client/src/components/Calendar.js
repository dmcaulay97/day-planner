import React from 'react';
import Calendar from './FullCalendar';
import Task from './Task'
// Material UI Imports

import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) =>({
  root: {
    height: '100vh',
  }

}));

export default function EventSide() {
  const classes = useStyles();

  return (
    <Grid container component="main" className={classes.root} spacing={2}>
      <CssBaseline />
      <Grid item xs={12} sm={3} md={3} className={classes.event}>
        Events
      </Grid> {/* Closing tag for event section  */}
      <Grid item xs={12} sm={6} md={6} className={classes.calendar}>
        <Calendar />
      </Grid> {/* Closing tag for calendar section  */}
      <Grid item xs={12} sm={3} md={3} className={classes.task}>
        <Task />
      </Grid> {/* Closing tag for task section  */}
    </Grid>
  )
}
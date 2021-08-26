import React from 'react';
import Calendar from './FullCalendar';
import Task from './Task'
// Material UI Imports
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
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
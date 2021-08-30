import React, { useState, useEffect } from 'react'
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import SaveIcon from '@material-ui/icons/Save';
import 'date-fns';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';

import { QUERY_ME } from '../utils/queries';
import { useQuery } from '@apollo/client';
import Auth from '../utils/auth';
import { ADD_EVENT } from '../utils/actions';

const useStyles = makeStyles((theme) =>({
  root: {
    height: '100vh',
    backgroundColor: theme.palette.background.paper,
  },
  form: {
		width: '100%', // Fix IE 11 issue.
		marginTop: theme.spacing(1),
	},
  paper: {
		margin: theme.spacing(4, 'auto'),
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
	},
  submit: {
		margin: theme.spacing(3, 0, 2),
	}
}));

const  Event = () => {
  const classes = useStyles();

  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

  const handleDateChange = (date) => {
    setStartDate(date);
  };

  const endDateChange = (date) => {
    setEndDate(date);
  };

  return (
    <>
      <Grid container className={classes.root}>
      <CssBaseline />
        <div className={classes.paper} m={1}>
          <Typography variant="h5">
              Add Events
          </Typography>
        </div>
        <form className={classes.form} noValidate>
          <Grid container spacing={2} justifyContent={'space-around'}>
            <TextField
							variant="outlined"
							margin="dense"
							required
              size="small"
							id="event"
							label="Event"
							name="event"
							autoComplete="event"
						/>
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <Grid container justifyContent="space-around">
              <KeyboardDatePicker
                margin="normal"
                id="eventStart"
                label="Event Start"
                format="MM/dd/yyyy"
                value={startDate}
                onChange={handleDateChange}
                KeyboardButtonProps={{
                  'aria-label': 'change start date',
                }}
              />
            </Grid>
          </MuiPickersUtilsProvider>
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <Grid container justifyContent="space-around">
              <KeyboardDatePicker
                margin="normal"
                id="endStart"
                label="Event End"
                format="MM/dd/yyyy"
                value={endDate}
                onChange={endDateChange}
                KeyboardButtonProps={{
                  'aria-label': 'change end date',
                }}
              />
            </Grid>
          </MuiPickersUtilsProvider>
          <Box>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              className={classes.submit}
              startIcon={<SaveIcon />}
            >
              Save Event
            </Button>
          </Box>
          </Grid>
        
        </form>
      </Grid>
    </>
  )
}

export default Event

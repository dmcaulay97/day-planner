import React, { useState, useEffect } from 'react'
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import Typography from '@material-ui/core/Typography';
import { makeStyles, alpha } from '@material-ui/core/styles';
import SaveIcon from '@material-ui/icons/Save';
import 'date-fns';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
  KeyboardDateTimePicker
} from '@material-ui/pickers';

import { useMutation, useQuery } from '@apollo/client';
import { SAVE_EVENT } from '../utils/mutations';
import { QUERY_ME } from '../utils/queries';

const useStyles = makeStyles((theme) =>({
  root: {
    height: '100vh',
  },
  form: {
		width: '100%', // Fix IE 11 issue.
		marginTop: theme.spacing(1),
	},
  paper: {
		margin: theme.spacing('auto', 'auto'),
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
	},
  submit: {
		margin: theme.spacing(3, 0, 2),
	},
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

const  Event = () => {
  const classes = useStyles();

  const [formState, setFormState] = useState({ title: ''});
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [category, setCategory] = useState( {category: ''} );

  const [addEvent] = useMutation(SAVE_EVENT);
  const { loading, data } = useQuery(QUERY_ME);
  
  const handleDateChange = (date) => {
    setStartDate(date);
  };

  const endDateChange = (date) => {
    setEndDate(date);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    console.log(Math.round(new Date(startDate) / 1000), Math.round(new Date(endDate) / 1000));
    console.log(new Date(startDate), new Date(endDate))
    const mutationResponse = await addEvent({
      variables: {
        title: formState.title,
        start: startDate.toISOString(),
        end: endDate.toISOString(),
        category: category.category,
      }
    });
    console.log(mutationResponse);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormState({
      ...formState,
      [name]: value,
    });
  };

  const handleSelect = (e, index, value) => {
    setCategory({
      ...category,
      category: e.target.value,
    });
    console.log(e.target.value, category.category)
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
        <form onSubmit={handleFormSubmit} className={classes.form} noValidate>
          <Grid container spacing={2} justifyContent={'space-around'}>
            <TextField
							variant="outlined"
							margin="dense"
							required
              size="small"
							id="title"
							label="Event"
							name="title"
							autoComplete="event"
              onChange={handleChange}
						/>
            <Grid container justifyContent="space-around">
              <FormControl className={classes.formControl}>
                <InputLabel id="demo-simple-select-label">Category</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={category.category}
                  onChange={handleSelect}
                >
                <MenuItem key={'Personal'} value={'Personal'}>Personal</MenuItem>
                <MenuItem key={'Vacation'} value={'Vacation'}>Vacation</MenuItem>
                <MenuItem key={'Meetings'} value={'Meetings'}>Meetings</MenuItem>
                <MenuItem key={'Birthdays'} value={'Birthdays'}>Birthdays</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <Grid container justifyContent="space-around">
              <KeyboardDateTimePicker
                margin="normal"
                id="eventStart"
                label="Event Start"
                format="MM/dd/yyyy h:mm a"
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
              <KeyboardDateTimePicker
                margin="normal"
                id="endStart"
                label="Event End"
                format="MM/dd/yyyy h:mm a"
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
              disabled={!(formState.title && category.category)}
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

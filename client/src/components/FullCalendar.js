import React, { useState }from 'react'
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import timeGridPlugin from '@fullcalendar/timegrid'
import listPlugin from '@fullcalendar/list';
import bootstrapPlugin from '@fullcalendar/bootstrap';
import 'bootstrap/dist/css/bootstrap.css';
import '@fortawesome/fontawesome-free/css/all.css';
import { QUERY_ME } from '../utils/queries';
import { useMutation, useQuery } from '@apollo/client';
import moment from 'moment';
import { UPDATE_EVENT, REMOVE_EVENT } from '../utils/mutations';

// Material UI Modal Imports
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import SaveIcon from '@material-ui/icons/Save';
import DeleteIcon from '@material-ui/icons/Delete';
import CancelIcon from '@material-ui/icons/Cancel';
import Grid from '@material-ui/core/Grid';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import { makeStyles } from '@material-ui/core/styles';
import 'date-fns';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardDateTimePicker
} from '@material-ui/pickers';


// FORMAT OF EVENTS THAT NEED TO BE PASSED INTO THE CALENDAR. 
// const events = [{
//   events: [{ title: 'Shift Meeting', start: '2021-08-11', end: '2021-08-11', className:['birthdayStyle']},
//   { title: 'Doctor Appt.', start: '2021-08-17', end: '2021-08-17'},
//   { title: 'Vacation', start: '2021-08-18', end: '2021-08-18, backgroundColor: 'coral', borderColor: 'darkred'}
// ]
// }];

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

const Calendar = () => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState({ title: ''});
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [category, setCategory] = useState( {category: ''} );
  const [eventID, setEventID] = useState({_id: ''})


  const { loading, data } = useQuery(QUERY_ME);
  const [updateEvent] = useMutation(UPDATE_EVENT);
  const [deleteEvent] = useMutation(REMOVE_EVENT);
  const eventsOriginal = data?.me.events || [];
  const events = [];
  
  eventsOriginal.forEach(event => {
    const newElement = {
      title: event.title,
      start:  moment.utc(event.start).format(),
      end:  moment.utc(event.end).format(),
      category: event.category,
      id: event._id,
      classNames:[event.category]
    }

    events.push(newElement);
  });

  const newEvents = [{events}]

  const handleEventDrop = async (info) => {
  //  Update the event in the database once it has been dropped
  // Full calendar stores the end date as null if the event is an all day event. 
  // Set it equal to the start date to avoid errors when you drop the event to a time slot. 
  // Dropping all day events to a timeslot is disabled with this. Time based events will work fine. 
    var endDate = '';
    if(!info.event.allDay && info.event.end === null) {
      endDate = info.event.start.toISOString();
    } else if(info.event.end === null) {
      endDate = info.event.start.toISOString();
    } else {
      endDate = info.event.end.toISOString();
    }

    console.log(info.event)
    const mutationResponse = await updateEvent({
      variables: {
        _id: info.event.id,
        title: info.event.title,
        start: info.event.start.toISOString(),
        end: endDate,
        category: info.event.extendedProps.category
      }
    });

  };

  const handleEventResize = async (info) => {
    const mutationResponse = await updateEvent({
      variables: {
        _id: info.event.id,
        title: info.event.title,
        start: info.event.start.toISOString(),
        end: info.event.end.toISOString(),
        category: info.event.extendedProps.category
      }
    });
  };

  const UpdateSelectedEvent = async (id, title, start, end, category) => {
    console.log(id, title, start, end, category);
    const response = await updateEvent({
      variables: {
        _id: id,
        title: title,
        start: start,
        end: end,
        category: category
      }
    });
  };

  const handleSelect = (e) => {
    setCategory(e.target.value)
  };
  const handleClickOpen = (info) => {
    setOpen(true);
    console.log(info)

    var endDate = '';
    if(!info.event.allDay && info.event.end === null) {
      endDate = info.event.start.toISOString();
    } else if(info.event.end === null) {
      endDate = info.event.start.toISOString();
    } else {
      endDate = info.event.end.toISOString();
    }
    // NOTE: event object also contains a startStr and endStr that are formatted as ISOString's, these will work as well!!!!
    setStartDate(info.event.start.toISOString());
    setEndDate(endDate);
    setTitle(info.event.title);
    setCategory(info.event.extendedProps.category);
    setEventID(info.event.id);
  };

  const startDateChange = (date) => {
    setStartDate(date);
  };

  const endDateChange = (date) => {
    setEndDate(date);
  };

  const handleTitle = (e) =>{
    setTitle(e.target.value);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSave = async () => {
    const response = await UpdateSelectedEvent(eventID, title, startDate,endDate,category);
    setOpen(false);
  };

  const handleDelete = async () => {
    const response = await deleteEvent({
      variables: {
        _id: eventID,
      }
    });
    setOpen(false);
  };

    return (
      <section>
        <FullCalendar
        plugins={[ dayGridPlugin, interactionPlugin,  timeGridPlugin, listPlugin, bootstrapPlugin]}
        headerToolbar={{
          right: 'dayGridMonth,timeGridWeek,timeGridDay',
          center: 'title',
          left: 'prev,next'
        }}
        initialView="dayGridMonth"
        eventSources={newEvents}
        editable='true'
        selectable='true'
        eventStartEditable='true'
        eventResizableFromStart='true'
        eventDurationEditable='true'
        eventDrop={handleEventDrop}
        eventResize={handleEventResize}
        eventClick={handleClickOpen}
      
       />

        <div>
          <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
            <DialogTitle id="form-dialog-title">Update Event</DialogTitle>
            <DialogContent>
              <DialogContentText>
                Use the fields below to update or delete the selected Event.
              </DialogContentText>
              <TextField
                autoFocus
                margin="dense"
                id="name"
                label="Event Title"
                type="text"
                fullWidth
                onChange={handleTitle}
                value={title}
              />
              <Grid container justifyContent="space-around">
              <FormControl className={classes.formControl}>
                <InputLabel id="demo-simple-select-label">Category</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={category}
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
                  onChange={startDateChange}
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
            </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary" startIcon={<CancelIcon color='error' />}>
              Cancel
            </Button>
            <Button onClick={handleSave} color="primary" startIcon={<SaveIcon />}>
              Save
            </Button>
            <Button onClick={handleDelete} startIcon={<DeleteIcon color='error' />}>
              Delete
            </Button>
          </DialogActions>
        </Dialog>
        </div>
      </section>  
    )
  }

  export default Calendar;
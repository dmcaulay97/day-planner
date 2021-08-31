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
import { UPDATE_EVENT } from '../utils/mutations';

// FORMAT OF EVENTS THAT NEED TO BE PASSED INTO THE CALENDAR. 
// const events = [{
//   events: [{ title: 'Shift Meeting', start: '2021-08-11', end: '2021-08-11', className:['birthdayStyle']},
//   { title: 'Doctor Appt.', start: '2021-08-17', end: '2021-08-17'},
//   { title: 'Vacation', start: '2021-08-18', end: '2021-08-18, backgroundColor: 'coral', borderColor: 'darkred'}
// ]
// }];


const Calendar = () => {

  const [open, setOpen] = useState(false);
  const { loading, data } = useQuery(QUERY_ME);
  const [updateEvent] = useMutation(UPDATE_EVENT);
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
    } else if(!info.event.end === null) {
      endDate = info.event.end.toISOString();
    } else {
      endDate = info.event.start.toISOString();
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
    console.log(info.event);
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
      
       />
      </section>  
    )
  }

  export default Calendar;
import React from 'react'
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
    
  const { loading, data } = useQuery(QUERY_ME);
  const [updateEvent] = useMutation(UPDATE_EVENT);
  const eventsOriginal = data?.me.events || [];
  const events = [];
  
  eventsOriginal.forEach(event => {
    const newElement = {
      title: event.title,
      start:  moment.utc(event.start).format('YYYY-MM-DD'),
      end:  moment.utc(event.end).format('YYYY-MM-DD'),
      category: event.category,
      id: event._id
    }

    events.push(newElement);
  });

  const newEvents = [{events}]

  const handleEventDrop = async (info) => {
   
  //  Update the event in the database once it has been dropped
    const mutationResponse = await updateEvent({
      variables: {
        _id: info.event.id,
        title: info.event.title,
        start: info.event.start.toISOString(),
        end: (info.event.allDay?  info.event.start.toISOString() : info.event.end.toISOString()),
        category: info.event.extendedProps.category
      }
    });

  };

    return (
      <section>
        <FullCalendar
        plugins={[ dayGridPlugin, interactionPlugin,  timeGridPlugin, listPlugin, bootstrapPlugin]}
        headerToolbar={{
          right: 'prev,next dayGridMonth,timeGridWeek,timeGridDay,listMonth'
        }}
        initialView="dayGridMonth"
        eventSources={newEvents}
        editable='true'
        eventStartEditable='true'
        eventResizableFromStart='true'
        eventDurationEditable='true'
        eventDrop={handleEventDrop}

       />
      </section>  
    )
  }

  export default Calendar;
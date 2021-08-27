import React from 'react'
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import timeGridPlugin from '@fullcalendar/timegrid'
import listPlugin from '@fullcalendar/list';
import bootstrapPlugin from '@fullcalendar/bootstrap';
import 'bootstrap/dist/css/bootstrap.css';
import '@fortawesome/fontawesome-free/css/all.css';

const events = [{
  events: [{ title: 'Shift Meeting', date: '2021-08-11', className:['birthdayStyle']},
  { title: 'Doctor Appt.', date: '2021-08-17'},
  { title: 'Vacation', date: '2021-08-18', backgroundColor: 'coral', borderColor: 'darkred'}
]
}]
export default class Calendar extends React.Component {
  render() {
    return (
      <FullCalendar
        plugins={[ dayGridPlugin, interactionPlugin,  timeGridPlugin, listPlugin, bootstrapPlugin]}
        headerToolbar={{
          right: 'prev,next dayGridMonth,timeGridWeek,timeGridDay,listMonth'
        }}
        dateClick={this.handleDateClick}
        initialView="dayGridMonth"
        eventSources={events}
      />
    )
  }

handleDateClick = (arg) => {
alert(arg.dateStr)
}
}
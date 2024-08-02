import React from "react";
import { ClockIcon, BrainIcon, TakeoffIcon, AddPersonIcon, AvatarIcon } from '../Icons'

const Calendar = ({ events }) => {
  console.log('calendar events', events)
  return (
    <div className="container">
        <h1>Trustworks kalender</h1>
      <div className="row">
        {events.map((event, index) => (
          <Event key={index} event={event} />
        ))}
      </div>
      <div className="row">
      </div>
    </div>
  )
}

const Event = ({ event }) => {
  console.log('event', event)
  return (
    <div className="row dalign-items-center justify-content-end">
      <div className="col-1">
        12
      </div>
      <div className="col-3">
        <div className="row">
          {event.date}
        </div>
        <div className="row">
          {event.text}
        </div>
      </div>
      <div className="col-8 ">
        <ClockIcon width='48px' height='48px' />
      </div>
    </div>
  )
}

export default Calendar
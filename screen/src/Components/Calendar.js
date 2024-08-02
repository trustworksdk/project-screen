import React from "react";
import { ClockIcon, BrainIcon, TakeoffIcon, TeamIcon, UserIcon } from '../Icons'
import styled from "styled-components"
import { Card } from "react-bootstrap";

const Calendar = ({ events }) => {
  return (
    <Styling className="body::before">
      <div className="container d-flex flex-column">
        <div className="calendar pt-5">
          <h1 style={{ color: "black" }}>Trustworks kalender</h1>
          <div className="list-group pt-5">
            {events.map((event, index) => (
              <Event key={index} event={event} />
            ))}
          </div>
        </div>
        <div className="mt-auto mb-5 info-section">
          <div className="row justify-content-center align-items-end">
            <div className="col">
              <InfoCard />
            </div>
            <div className="col">
              <InfoCard />
            </div>
          </div>
        </div>
      </div>
    </Styling>
  )
}


const Event = ({ event }) => {
  const [day, month, year] = event?.date?.split(" ")
  return (
    <div className="list-group-item p-3 row h-25 my-1 d-flex align-items-center ">
      <div className="col-1 ">
        <p className="display-6">{day}</p>
      </div>
      <div className="col-10">
        <div style={{ fontWeight: 600 }}>{month} {year}</div>
        <div className="text-ellipsis">{event.text}</div>
      </div>
      <div className="col-1 text-end">
        <ClockIcon width='48px' height='48px' />
      </div>
    </div>
  )
}

const InfoCard = ({ }) => (
  <Card >
    <Card.Title className="pt-3 ps-3 m-0">
      Nedtælling
    </Card.Title>

    <Card.Body className="pt-0 pe-0 ms-auto me-4">
      <p className="display-1 text-end">100</p>
      dage til julefrokost
    </Card.Body>

    <Card.Footer className="d-flex justify-content-between">
      <p>22 % flere end sidste år</p>
      <ClockIcon width='24px' height='24px' />
    </Card.Footer>
  </Card>
)

const Styling = styled.div`
  div, h1 {
    color: gray;
  }
  h1, p {
    margin: 0;
  }
  .card-footer {
    background-color: #374b05;
    color: #eee; 
  }
  .info-section {
    border: 1px solid transparent;
    background-color: transparent;
  }
  .text-ellipsis {
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 1; /* Adjust the number of lines to show */
    overflow: hidden;
    text-overflow: ellipsis;
  }
  span {
    margin-left: auto; 
  }
`

export default Calendar
import React from "react";
import { ClockIcon, BrainIcon, TakeoffIcon, TeamIcon, UserIcon } from '../Icons'
import styled from "styled-components"
import { Card } from "react-bootstrap";

const getIcon = {
  'Brain': <BrainIcon height="48px" width="48px" />,
  'Takeoff': <TakeoffIcon height="48px" width="48px" />,
  'Team': <TeamIcon height="48px" width="48px" />,
  'User': <UserIcon height="48px" width="48px" />,
  'Clock': <ClockIcon height="48px" width="48px" />,
}

const Calendar = ({ events, isPortrait }) => {
  const numberOfEvents = isPortrait ? 30 : 10
  return (
    <Styling className="body::before">
      <div className="container py-5 d-flex flex-column justify-content-around">
        <h1 className="display-1" style={{ color: "black" }}>
          Trustworks Kalender
        </h1>
        <div className="list-group overflow-hidden ">
          {/* {events.map((event, index) => ( */}
          {events.slice(0, numberOfEvents).map((event, index) => (
            <Event key={index} event={event} />
          ))}
        </div>
        <div className="row mt-">
          <div className="col">
            <InfoCard />
          </div>
          <div className="col">
            <InfoCard />
          </div>
        </div>
      </div>
    </Styling>
  )
}


const Event = ({ event }) => {
  const [day, month, year] = event?.date?.split(" ")
  return (
    <div className="list-group-item p-2 my-1 d-flex align-items-center ">
      <div className="col-1">
        <p className="display-6">{day}</p>
      </div>
      <div className="col-10">
        <div style={{ fontWeight: 600 }}>{month} {year}</div>
        <div className="text-ellipsis">{event.text}</div>
      </div>
      <div className="col-1 text-end">
        {getIcon['Clock']}
      </div>
    </div>
  )
}

const InfoCard = () => (
  <Card >
    <Card.Title className="pt-3 ps-3">
      Nedtælling
    </Card.Title>

    <Card.Body className="ms-auto me-3">
      <p className="display-2 text-end">100</p>
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
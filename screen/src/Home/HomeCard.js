import React from "react";
import { Card } from "react-bootstrap";
import { formatDate } from "../Components/utils";

const PEOPLE_LIMIT = 11

const HomeCard = ({ project, onToolButtonClick, getClientLogo, getEmployeePhoto }) => (
  <div className="container ">
    {/* Client photo + Project title + date */}
    <div className="row align-items-end ">
      <Card className="max-auto bg-transparent border-0 ">
        <Card.Img
          className="border-0 mb-3"
          src={`data:image/jpeg;base64,${getClientLogo(project.clientuuid)}`}
        />
      </Card>

      <div>
        <Card className="bg-transparent border-0 text-ellipsis-project-name">
          <Card.Body>
            <Card.Title>
              <h1>{project.name}</h1>
            </Card.Title>
          </Card.Body>
        </Card>

        <Card className="bg-transparent border-0">
          <Card.Body className="pt-0">
            <Card.Title>
              <h2>{formatDate(project.from)} - {formatDate(project.to)}</h2>
            </Card.Title>
          </Card.Body>
        </Card>
      </div>
    </div>

    {/* Projektbeskrivelse  + ydelser + tools */}
    <div className="row">
      <div className="col-8 right-border">
        <Card className="bg-transparent border-0">
          <Card.Body>
            <Card.Title>
              <h3 className="text-ellipsis-project-description">{project.description}</h3>
            </Card.Title>
          </Card.Body>
        </Card>
      </div>
      <div className="col-4 ydelser-og-tools">
        <Card className="ydelser bg-transparent border-0 ">
          <Card.Title className="fw-bold">
            <h2>Roller</h2>
          </Card.Title>
          <Card.Text>
            {project.offeringList.map((tool, index) => (
              <button key={index} className="ydelser ydelser-og-tools-knap">
                {tool}
              </button>
            ))}
          </Card.Text>
        </Card>
        <Card className="tools pt-5 bg-transparent border-0">
          <Card.Title className="fw-bold">
            <h2>Tilgang</h2>
          </Card.Title>
          <Card.Text>
            {project.toolsList.map((tool, index) => (
              <button
                key={index}
                className="tools ydelser-og-tools-knap"
                onClick={() => onToolButtonClick(tool)}
              >
                {tool}
              </button>
            ))}
          </Card.Text>
        </Card>
      </div>
    </div>

    {/* Employee photo */}
    <Card className="row bg-transparent border-0">
      <Card.Body>
        <div className='row align-items-center'>
          {project.projectDescriptionUserList.slice(0, PEOPLE_LIMIT).map(user => (
            <div className=' col-2' key={user.useruuid}>
              <img
                alt=""
                className="employeephoto"
                src={`data:image/jpeg;base64,${getEmployeePhoto(user.useruuid)}`}
              />
            </div>
          ))}
          <Counter project={project} />
        </div>
      </Card.Body>
    </Card>
  </div >
);

const Counter = ({ project }) => {
  if (project.projectDescriptionUserList.length > PEOPLE_LIMIT) {
    return (
      <div className="col-2">
        <div className="counter bg-light employeephoto">
          <h3>+{project.projectDescriptionUserList.length - PEOPLE_LIMIT}</h3>
        </div>
      </div>
    )
  }
}

export default HomeCard; 
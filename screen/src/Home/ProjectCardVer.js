import React from "react";
import './Home.styles';
import { Card } from "react-bootstrap";
import { formatDate } from "../Components/utils";
const ProjectCardVer = ({ project, onToolButtonClick, getClientLogo, getEmployeePhoto }) => (
  <div className="vertical-layout justify-content-center">
    
      {/* <div className="container-fluid"> */}
        <div className="custom-container">
        <div className="client-logo-container p-5 ">
          <Card className="bg-transparent border-0">
            <Card.Img
            className="client-logo border-0 "
            src={`data:image/jpeg;base64,${getClientLogo(project.clientuuid)}`}
            />
          </Card>
        </div>

        <div className="project-name-container p-2"> 
          <Card className="bg-transparent border-0">
            <Card.Body>
            <Card.Title>
              <h1>{project.name}</h1>
            </Card.Title>
            </Card.Body>
          </Card>
        </div>

        <div className="project-date-container p-1"> 
          <Card className="bg-transparent border-0">
            <Card.Body>
            <Card.Title>
              <h2>{formatDate(project.from)} - {formatDate(project.to)}</h2>
            </Card.Title>
            </Card.Body>
          </Card>
        </div>
        </div>

      {/* </div> */}

      <div className="row row-flex">
        <div className="col-8 right-border p-4">
          <Card className="bg-transparent border-0">
            <Card.Body>
            <Card.Title>
                <h3 className="text-start bg-transparent text-ellipsis">{project.description}</h3>
              </Card.Title>
            </Card.Body>
          </Card>
        </div>
        <div className="col-4 ydelser-og-tools">
          <Card className="ydelser bg-transparent border-0 ">
          <Card.Title className="fw-bold">
            <h2>Ydelser</h2>
          </Card.Title>
          <Card.Text>
              {project.offeringList.map((tool, index) => (
              <button key={index} className="ydelser ydelser-og-tools-knap">
              {tool}
              </button>
              ))}
          </Card.Text>
          </Card>
          <Card className="tools bg-transparent border-0">
          <Card.Title className="fw-bold">
            <h2>Tools</h2>
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

      <div className="row row-flex w-100 align-items-center p-4">
        <div className="cols d-flex employee-container">
          <Card className="employee-card bg-transparent border-0 "> 
            <Card.Body>
            <div className="row p-3">
                {project.projectDescriptionUserList?.slice(0, 8).map((user) => (
                <div className="col mb-4" key={user.useruuid}>
                  <img
                  alt=""
                  className="employeephoto img-fluid"
                  src={`data:image/jpeg;base64,${getEmployeePhoto(user.useruuid)}`}
                  />
                </div>
                ))}
              </div>
            </Card.Body>
          </Card>
        </div>
      </div>
    
  </div>
);
export default ProjectCardVer;
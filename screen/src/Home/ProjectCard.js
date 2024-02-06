import React from "react";
// import { Wrapper } from "./Home.styles";
import { Card, CardGroup, Row, Col } from "react-bootstrap";
import { formatDate } from "../Components/utils";

const ProjectCard = ({ project, onToolButtonClick, getClientLogo, getEmployeePhoto }) => (
  <CardGroup>
    <div className="col-sm-4">
      <div className="seperator">
        <Card className="card bg-transparent border-0">
          <Card.Img
            className="mx-auto"
            variant="top"
            src={`data:image/jpeg;base64,${getClientLogo(project.clientuuid)}`}
            width={400}
            height={200}
            style={{ borderRadius: "3%" }}
          />
        </Card>
        <div className="ydelser-og-tools">
          <Card className="ydelser bg-transparent border-0">
            <Card.Title className="ydelser-og-tools-overskrift">Ydelser</Card.Title>
            <Card.Text>
              {project.offeringList.map((tool) => (
                <button className="ydelser-og-tools-knap">{tool}</button>
              ))}
            </Card.Text>
          </Card>
          <Card className="tools bg-transparent border-0">
            <Card.Title className="ydelser-og-tools-overskrift">Tools</Card.Title>
            <Card.Text>
              {project.toolsList.map((tool) => (
                <button
                  key={tool}
                  className="ydelser-og-tools-knap"
                  onClick={() => onToolButtonClick(tool)}
                >
                  {tool}
                </button>
              ))}
            </Card.Text>
          </Card>
        </div>
      </div>
    </div>

    <div className="col-sm-8">
      <Card className="card bg-transparent border-0">
        <Card.Body>
          <Card.Title>
            <h1>{project.name}</h1>
            <br />
            <h2 className="periode">
              {formatDate(project.from)} - {formatDate(project.to)}
            </h2>
            <h2 className="beskrivelse">{project.description}</h2>
          </Card.Title>

          <Row className="employeerow">
            {project.projectDescriptionUserList?.map((user) => (
              <Col className="employeecol" key={user.useruuid}>
                <img
                  className="employeephoto"
                  src={`data:image/jpeg;base64,${getEmployeePhoto(user.useruuid)}`}                  
                />
                <p></p>
              </Col>
            ))}
          </Row>
        </Card.Body>
      </Card>
    </div>
  </CardGroup>
);

export default ProjectCard;
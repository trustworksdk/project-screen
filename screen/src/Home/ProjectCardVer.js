import React from "react";
import './Home.styles';
import { Card, Row, Col } from "react-bootstrap";
import { formatDate } from "../Components/utils";
const ProjectCardVer = ({ project, onToolButtonClick, getClientLogo, getEmployeePhoto }) => (
  <div className="vertical-layout" style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
    <div className="aspect-ratio-item" > {/* Adjusted flex grow based on original 15vh */}
    <div className="row" style={{ flex: '3' }}>
      <Card>
        <Card.Img
          className="mx-auto"
          src={`data:image/jpeg;base64,${getClientLogo(project.clientuuid)}`}
          style={{ borderRadius: "3%" }}
        />
      </Card>
      </div>
    <div className="row" style={{ flex: '1' }}> {/* Adjusted flex grow based on original 5vh */}
      <Card>
        <Card.Body>
          <Card.Title>
            <h1>{project.name}</h1>
          </Card.Title>
        </Card.Body>
      </Card>
    </div>
    <div className="row" style={{ flex: '0.4' }}> {/* Adjusted flex grow based on original 2vh */}
      <Card>
        <Card.Body>
          <Card.Title>
            <h2>{formatDate(project.from)} - {formatDate(project.to)}</h2>
          </Card.Title>
        </Card.Body>
      </Card>
    </div>
    <div className="row" style={{ flex: 10, display: 'flex' }}> {/* Adjusted flex grow based on original 50vh and added internal flex */}
      <div className="col-sm-8" style={{ flex: 2 }}>
        <Card>
          <Card.Body>
            <Card.Title>
              <h2 className="beskrivelse">{project.description}</h2>
            </Card.Title>
          </Card.Body>
        </Card>
      </div>
      <div className="col-sm-4" style={{ flex: 1 }}>
        <div className="ydelser-og-tools">
          <Card className="ydelser bg-transparent border-0">
            <Card.Title>Ydelser</Card.Title>
            <Card.Text>
              {project.offeringList.map((tool, index) => (
                <button key={index} className="ydelser-og-tools-knap">
                  {tool}
                </button>
              ))}
            </Card.Text>
          </Card>
          <Card className="tools bg-transparent border-0">
            <Card.Title>Tools</Card.Title>
            <Card.Text>
              {project.toolsList.map((tool, index) => (
                <button
                  key={index}
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
      <Card className="card bg-transparent border-0" style={{ flex: '3' }}> {/* Adjust for the employee row */}
        <Card.Body>
          <Row className="employeerow">
            {project.projectDescriptionUserList?.map((user) => (
              <Col className="employeecol" key={user.useruuid}>
                <img
                  className="employeephoto"
                  src={`data:image/jpeg;base64,${getEmployeePhoto(user.useruuid)}`}
                />
              </Col>
            ))}
          </Row>
        </Card.Body>
      </Card>
    
  </div>
  </div>
);
export default ProjectCardVer;
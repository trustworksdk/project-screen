import React from "react";
import { Card } from "react-bootstrap";
import { formatDate } from "../Components/utils";

const getColSize = project => {
  return project.projectDescriptionUserList.length > 8 ? 'mx-3 col-1' : 'col-3'
}

const tenCol = project => {
  return project.projectDescriptionUserList.length > 8 ? 'row col-10' : 'row'
}

const getImgSize = project => {
  return project.projectDescriptionUserList.length > 8 ? 'employeephoto mb-3' : 'mb-3 employeephoto img-fluid'
}

const HomeCard = ({ project, onToolButtonClick, getClientLogo, getEmployeePhoto }) => (
  <div className="container">
    {/* Client photo + Project title + date */}
    <div className="row align-items-end pt-5">
      <Card className="bg-transparent border-0 justify-content-center align-items-center">
        <Card.Img
          className="border-0 w-50 mb-3"
          src={`data:image/jpeg;base64,${getClientLogo(project.clientuuid)}`}
        />
      </Card>

      <div>
        <Card className="bg-transparent border-0  text-ellipsis-1">
          <Card.Body>
            <Card.Title>
              <h1>{project.name}</h1>
            </Card.Title>
          </Card.Body>
        </Card>

        <Card className="bg-transparent border-0">
          <Card.Body className="pt-1">
            <Card.Title>
              <h2>{formatDate(project.from)} - {formatDate(project.to)}</h2>
            </Card.Title>
          </Card.Body>
        </Card>
      </div>
    </div>


    {/* Projektbeskrivelse  + ydelser + tools */}
    <div className="row justify-content-center pt-4">
      <div className="col-8 right-border align-items-center">
        <Card className="bg-transparent border-0">
          <Card.Body>
            <Card.Title>
              <h3 className="text-start bg-transparent text-ellipsis-13">{project.description}</h3>
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
        <Card className="tools bg-transparent border-0">
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
    <Card className=" bg-transparent border-0 pt-5">
      <Card.Body className="pt-3 ">
        <div className={tenCol(project)}>
            {project.projectDescriptionUserList?.map(user => (
              <div className={getColSize(project)} key={user.useruuid}>
                <img
                  alt=""
                  className={getImgSize(project)}
                  src={`data:image/jpeg;base64,${getEmployeePhoto(user.useruuid)}`}
                />
              </div>
            ))}
          </div>
      </Card.Body>
    </Card>

  </div >
);
export default HomeCard;
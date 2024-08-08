import React from "react";
import { Card } from "react-bootstrap";
import { formatDate } from "../Components/utils";

const PEOPLE_LIMIT = 11

const HomeCard = ({ project, onToolButtonClick, getClientLogo, getEmployeePhoto, isPortrait }) => {
  if (isPortrait) {
    return <Vertical
      project={project}
      onToolButtonClick={onToolButtonClick}
      getClientLogo={getClientLogo}
      getEmployeePhoto={getEmployeePhoto}
    />
  }
  return <Horizontal
    project={project}
    onToolButtonClick={onToolButtonClick}
    getClientLogo={getClientLogo}
    getEmployeePhoto={getEmployeePhoto}
  />
}

const Vertical = ({ project, onToolButtonClick, getClientLogo, getEmployeePhoto }) => {
  return (
    <div className="container d-flex flex-column justify-content-around">
      <div className="row mx-auto ">
        <img
          src={`data:image/jpeg;base64,${getClientLogo(project.clientuuid)}`}
        />
      </div>
      <div className="row">
        <h1 className="display-1 lh-sm text-ellipsis-project-name">
          {project.name}
        </h1>
        <h2 className="lh-lg mb-5">
          {formatDate(project.from)} - {formatDate(project.to)}
        </h2>
        <div className="col-8 right-border lh-lg text-ellipsis-project-description">
          {project.description}
        </div>
        <div className="col-4">
          <div className="">
            <h2>Roller</h2>
            {project.offeringList.map((rolle, index) => (
              <button
                key={index}
                className="roller mx-1 roller-og-tilgang-knap"
              >
                {rolle}
              </button>
            ))}
          </div>
          <div className="pt-5">
            <h2>Tilgang</h2>
            {project.toolsList.map((tilgang, index) => (
              <button
                key={index}
                className="tilgang mx-1 roller-og-tilgang-knap"
                onClick={() => onToolButtonClick(tilgang)}
              >
                {tilgang}
              </button>
            ))}
          </div>
        </div>
      </div>
      <div className="row">
        {project.projectDescriptionUserList.slice(0, PEOPLE_LIMIT).map(user => (
          <div className="col-2" key={user.useruuid}>
            <img
              alt=""
              className="employeephoto"
              src={`data:image/jpeg;base64,${getEmployeePhoto(user.useruuid)}`}
            />
          </div>
        ))}
        <Counter project={project} />
      </div>
    </div>
  )
}

// const Vertical = ({project, onToolButtonClick, getClientLogo, getEmployeePhoto}) => (
//   <div className="container">
//     {/* Client photo + Project title and date */}
//     <div className="row overflow-hidden align-items-end ">
//       <ClientPhoto
//         project={project}
//         getClientLogo={getClientLogo}
//       />
//       <div >
//         <ProjectTitle project={project} />
//         <ProjectDate project={project} />
//       </div>
//     </div>
//     {/* Projektbeskrivelse + roller og tilgang */}
//     <div className="row align-items-center overflow-hidden">
//       <div className="col-8 right-border">
//         <ProjectDescription project={project} />
//       </div>
//       <div className="col-4 roller-og-tilgang">
//         <Roller
//           project={project}
//           onToolButtonClick={onToolButtonClick}
//         />
//         <Tilgang project={project} />
//       </div>
//     </div>
//     {/* Employee photos */}
//     <div className="row align-items-center overflow-hidden ">
//       <EmployeePhotos
//         project={project}
//         getEmployeePhoto={getEmployeePhoto}
//       />
//     </div>
//   </div>
// );

const Horizontal = ({ project, onToolButtonClick, getClientLogo, getEmployeePhoto }) => (
  <div className="container">
    <div className="row h-100 align-items-center">
      <div className="col-4 right-border pe-4 roller-og-tilgang">
        <ClientPhoto
          project={project}
          getClientLogo={getClientLogo}
        />
        <Roller
          project={project}
          onToolButtonClick={onToolButtonClick}
        />
        <Tilgang project={project} />
      </div>
      <div className="col-8">
        <ProjectTitle project={project} />
        <ProjectDate project={project} />
        <ProjectDescription project={project} />
        <EmployeePhotos
          project={project}
          getEmployeePhoto={getEmployeePhoto}
        />
      </div>
    </div>
  </div>
)

const ClientPhoto = ({ project, getClientLogo }) => (
  <Card className="bg-transparent mx-auto border-0 center">
    <Card.Img
      className="border-0 mx-auto"
      src={`data:image/jpeg;base64,${getClientLogo(project.clientuuid)}`}
    />
  </Card>
)

// const ProjectTitle = ({project}) => (
//   <Card className="bg-transparent border-0 text-ellipsis-project-name">
//     <Card.Body>
//       <h1>{project.name}</h1>
//       <h2>{formatDate(project.from)} - {formatDate(project.to)}</h2>
//     </Card.Body>
//   </Card>
// )

const ProjectTitle = ({ project }) => (
  <Card className="bg-transparent border-0 text-ellipsis-project-name">
    <Card.Body>
      <h1>{project.name}</h1>
    </Card.Body>
  </Card>
)

const ProjectDate = ({ project }) => (
  <Card className="bg-transparent border-0">
    <Card.Body>
      <h2 >{formatDate(project.from)} - {formatDate(project.to)}</h2>
    </Card.Body>
  </Card>
)

const ProjectDescription = ({ project }) => (
  <Card className="py-5 bg-transparent border-0 lh-lg">
    <Card.Body>
      <p className="text-ellipsis-project-description">{project.description}</p>
    </Card.Body>
  </Card>
)

const Roller = ({ project }) => (
  <Card className="py-5 roller bg-transparent border-0 ">
    <Card.Body>
      <Card.Title>
        <h2>Roller</h2>
      </Card.Title>
      <Card.Text>
        {project.offeringList.map((rolle, index) => (
          <button
            key={index}
            className="roller mx-1 roller-og-tilgang-knap"
          >
            {rolle}
          </button>
        ))}
      </Card.Text>
    </Card.Body>
  </Card>
)
const Tilgang = ({ project, onToolButtonClick }) => (
  <Card className="py-5 tilgang bg-transparent border-0">
    <Card.Body>
      <Card.Title>
        <h2 style={{color: "#374B05"}}>Tilgang</h2>
      </Card.Title>
      <Card.Text>
        {project.toolsList.map((tilgang, index) => (
          <button
            key={index}
            className="tilgang mx-1 roller-og-tilgang-knap"
            onClick={() => onToolButtonClick(tilgang)}
          >
            {tilgang}
          </button>
        ))}
      </Card.Text>
    </Card.Body>
  </Card>
)

const EmployeePhotos = ({ project, getEmployeePhoto }) => (
  <Card className="bg-transparent border-0">
    <Card.Body>
      <div className="row">
        {project.projectDescriptionUserList.slice(0, PEOPLE_LIMIT).map(user => (
          <div className="col-2" key={user.useruuid}>
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
)

const Counter = ({ project }) => {
  if (project.projectDescriptionUserList.length > PEOPLE_LIMIT) {
    return (
      <div className="col-2 my-2">
        <div className="counter rounded-circle bg-light">
          <h3>+{project.projectDescriptionUserList.length - PEOPLE_LIMIT}</h3>
        </div>
      </div>
    )
  }
}

export default HomeCard; 
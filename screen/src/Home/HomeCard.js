import React from "react";
import { Card } from "react-bootstrap";
import { formatDate } from "../Components/utils";

const PEOPLE_LIMIT = 11

const HomeCard = ({ project, onToolButtonClick, getClientLogo, getEmployeePhoto }) => {
  return (
    <div className="container ">
      <div className="row h-100 align-items-center">
        <div className="col-4 right-border pe-4 roller-og-tilgang">
          <Card className="bg-transparent border-0 ">
            <Card.Img
              className="border-0"
              src={`data:image/jpeg;base64,${getClientLogo(project.clientuuid)}`}
            />
          </Card>

          <Card className="roller bg-transparent border-0 ">
            <Card.Body>
              <Card.Title>
                <h2>Roller</h2>
              </Card.Title>
              <Card.Text>
                {project.offeringList.map((rolle, index) => (
                  <button key={index} className="roller me-2 roller-og-tilgang-knap">
                    {rolle}
                  </button>
                ))}
              </Card.Text>
            </Card.Body>
          </Card>

          <Card className="tilgang bg-transparent border-0">
            <Card.Body >
              <Card.Title>
                <h2>Tilgang</h2>
              </Card.Title>
              <Card.Text>
                {project.toolsList.map((tilgang, index) => (
                  <button
                    key={index}
                    className="tilgang me-2 roller-og-tilgang-knap"
                    onClick={() => onToolButtonClick(tilgang)}
                  >
                    {tilgang}
                  </button>
                ))}
              </Card.Text>
            </Card.Body>
          </Card>
        </div>
        <div className="col-8 ">
          <Card className="bg-transparent border-0 text-ellipsis-project-name">
            <Card.Body className="py-0">
              <h1>{project.name}</h1>
            </Card.Body>
          </Card>

          <Card className="bg-transparent border-0">
            <Card.Body className="py-0">
              <h4>{formatDate(project.from)} - {formatDate(project.to)}</h4>
            </Card.Body>
          </Card>

          <Card className="py-0 bg-transparent border-0">
            <Card.Body className="py-0">
              <h6 className="text-ellipsis-project-description">{project.description}</h6>
            </Card.Body>
          </Card>

          <Card className="bg-transparent border-0">
            <Card.Body>
              <div className="row">
                {project.projectDescriptionUserList.slice(0, PEOPLE_LIMIT).map(user => (
                  <div className="col-2 my-2" key={user.useruuid}>
                    <img
                      alt=""
                      className="employeephoto "
                      src={`data:image/jpeg;base64,${getEmployeePhoto(user.useruuid)}`}
                    />
                  </div>
                ))}
                <Counter project={project} />
              </div>
            </Card.Body>
          </Card>
        </div>
      </div>
    </div>
  )

  // return (
  //   <div className="container">
  //     {/* Client photo + Project title + date */}
  //     <div className="row col-lg-4 align-items-end">
  //       <Card className="bg-transparent border-0 center">
  //         <Card.Img
  //           className="border-0"
  //           src={`data:image/jpeg;base64,${getClientLogo(project.clientuuid)}`}
  //         />
  //       </Card>

  //       <div>
  //         <Card className="bg-transparent border-0 text-ellipsis-project-name">
  //           <Card.Body>
  //             <h1>{project.name}</h1>
  //           </Card.Body>
  //         </Card>

  //         <Card className="bg-transparent border-0">
  //           <Card.Body className="pt-0">
  //             <h2>{formatDate(project.from)} - {formatDate(project.to)}</h2>
  //           </Card.Body>
  //         </Card>
  //       </div>
  //     </div>

  //     {/* Projektbeskrivelse  + roller + tilgang */}
  //     <div className="row">
  //       <div className="col-8 right-border">
  //         <Card className="bg-transparent border-0">
  //           <Card.Body>
  //             <h3 className="text-ellipsis-project-description">{project.description}</h3>
  //           </Card.Body>
  //         </Card>
  //       </div>
  //       <div className="col-4 roller-og-tilgang">
  //         <Card className="roller bg-transparent border-0 ">
  //           <Card.Body>
  //             <Card.Title>
  //               <h2>Roller</h2>
  //             </Card.Title>
  //             <Card.Text>
  //               {project.offeringList.map((tilgang, index) => (
  //                 <button key={index} className="roller mx-1 roller-og-tilgang-knap">
  //                   {tilgang}
  //                 </button>
  //               ))}
  //             </Card.Text>
  //           </Card.Body>
  //         </Card>
  //         <Card className="tilgang bg-transparent border-0">
  //           <Card.Body>
  //             <Card.Title>
  //               <h2>Tilgang</h2>
  //             </Card.Title>
  //             <Card.Text>
  //               {project.toolsList.map((tilgang, index) => (
  //                 <button
  //                   key={index}
  //                   className="tilgang mx-1 roller-og-tilgang-knap"
  //                   onClick={() => onToolButtonClick(tilgang)}
  //                 >
  //                   {tilgang} 
  //                 </button>
  //               ))}
  //             </Card.Text>
  //           </Card.Body>
  //         </Card>
  //       </div>
  //     </div>

  //     {/* Employee photo */}
  //     <Card className="row pt-5 bg-transparent border-0">
  //       <Card.Body className="pt-5">
  //         <div className='row align-items-end justify-content-between'>
  //           {project.projectDescriptionUserList.slice(0, PEOPLE_LIMIT).map(user => (
  //             <div className='pt-5 col-2' key={user.useruuid}>
  //               <img
  //                 alt=""
  //                 className="employeephoto"
  //                 src={`data:image/jpeg;base64,${getEmployeePhoto(user.useruuid)}`}
  //               />
  //             </div>
  //           ))}
  //           <Counter project={project} />
  //         </div>
  //       </Card.Body>
  //     </Card>
  //   </div >
  // );
}

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
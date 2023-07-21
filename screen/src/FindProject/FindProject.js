import axios from "axios";
import { useEffect, useState } from "react";
import { Card, Button, Row, Col, Dropdown, DropdownButton, CardGroup, Carousel, Modal } from "react-bootstrap";
import { Wrapper } from "./FindProject.styles";
import { useNavigate } from "react-router-dom";
import {config} from "../Components/API";


const FindProject = () => {

    const navigate = useNavigate();

    const [projects, setProjects] = useState([]);
    const [updatedProjects, setUpdatedProjects] = useState([]);
    const [clients, setClients] = useState([]);
    const [activeClients, setActiveClients] = useState([]);
    const [allConsultants, setAllConsultants] = useState([]);
    const [activeConsultants, setActiveConsultants] = useState([]);
    const [clientList, setClientList] = useState([]);
    const [selectedClient, setSelectedClient] = useState("");
    const [selectedConsultant, setSelectedConsultant] = useState("");
    const [projectChunks, setProjectChunks] = useState([]);
    const [selectedProjectIndex, setSelectedProjectIndex] = useState(null);
    const [selectedProjectChunkIndex, setSelectedProjectChunkIndex] = useState(null);
    const [sortOption, setSortOption] = useState("default");
  

    // Set clients (and active clients)
    useEffect(() => {
        axios.get('https://api.trustworks.dk/clients', config)
        .then(response => {
            setClients(() => response.data)   
        }).catch(error => {
            console.log(error)
        });
    }, []);

    // Set active clients 
    useEffect(() => {
        setActiveClients( 
            clients.filter(x => 
                x.active === true
                )
         );
    }, [clients]);
    

    // Set projects
    useEffect(() => {
        axios.get('https://api.trustworks.dk/knowledge/projects', config)
        .then(response => {
            setProjects(() => response.data)
        }).catch(error => {
            console.log(error)
        });
    }, []);
  

    // Set consultants
    useEffect(() => {
        axios.get('https://api.trustworks.dk/users', config)
          .then(response => {
            setAllConsultants(response.data);
          })
          .catch(error => {
            console.log(error);
          });
      }, []);

      // Set active consultants 
      useEffect(() => {
        setActiveConsultants(
          allConsultants.filter(x =>
            x.active === true &&
            (x.statuses.some(y =>
              y.type === "CONSULTANT") ||
              x.statuses.some(y =>
                y.type === "STUDENT")
            )
          )
        );
      }, [allConsultants]);


      // Set list with client IDs and logos
      useEffect(() => {
        projects?.map(project => {
            axios.get(`https://api.trustworks.dk/files/photos/${project.clientuuid}`, config)
            .then(response => {
                setClientList(clientList => [...clientList, {id: project.clientuuid, file: response.data.file}])  
            }).catch(error => {
            console.log(error)
            })
        })
    }, [projects]);


    // add client name as a variable in projects
    useEffect(() => {
        const addClientNameToProjects = () => {
            return projects.map((project) => {
              const client = clients.find((client) => client.uuid === project.clientuuid);
              const clientName = client ? client.name : 'Kunde uden navn';
              return { ...project, clientName };
            });
          };

        setUpdatedProjects(addClientNameToProjects());
    }, [projects]);


    // Function called to get the client logo. Client ID is given as props. 
    function getClientLogo(props) {
        const foundItem = clientList.find(item => item.id === props);
        return foundItem ? foundItem.file : null;
    }
    
    // Setting selected client when clicked in the dropdown
    const handleSelectClient = (e) => {
        setSelectedClient(e);
        console.log("handleSelectClient has been called. Client id:", selectedClient)
    }

    // Setting selected consultant when clicked in the dropdown
    const handleSelectConsultant = (e) => {
        setSelectedConsultant(e);
        console.log("handleSelectConsultant has been called")
    }
    

    const isClientEmpty = selectedClient === "";
    const isConsultantEmpty = selectedConsultant === "";


    // Fjern valgte filtre
    const removeFilters = () => {
        setSelectedClient("");
        setSelectedConsultant("");
        
        console.log("removeFilters has been called");
    }

    // Filtrering af projekter og visning af fire ad gangen
    const chunkSize = 4;
    useEffect(() => {
        console.log("useEffect has been called");

        const filteredArray = updatedProjects.filter(project => {
            const matchesClient = !selectedClient || project.clientuuid === selectedClient;
            const matchesConsultant = !selectedConsultant || project.projectDescriptionUserList.some(user => user.useruuid === selectedConsultant);
            return matchesClient && matchesConsultant;
        });

        // Split the projectList into chunks of size chunkSize for the carousel
        let newProjectChunks = [];
        if (isClientEmpty && isConsultantEmpty) {
            for (let i = 0; i < updatedProjects.length; i += chunkSize) {
                newProjectChunks.push(updatedProjects.slice(i, i + chunkSize));
            }
        } 
        else {
            for (let i = 0; i < filteredArray.length; i += chunkSize) {
                newProjectChunks.push(filteredArray.slice(i, i + chunkSize));
            }   
        }
        setProjectChunks(newProjectChunks)
    }, [selectedClient, updatedProjects.length, isClientEmpty, selectedConsultant, isConsultantEmpty, updatedProjects] )

 
    // Funktion til at åbne pop up ved click på et projekt
    const handleProjectClick = (chunkIndex, projectIndex) => {
        setSelectedProjectChunkIndex(chunkIndex);
        setSelectedProjectIndex(projectIndex);
      };
    
    // Funktion til at lukke pop up
    const handleModalClose = () => {
        setSelectedProjectChunkIndex(null);
        setSelectedProjectIndex(null);
    };

  
    // Sorter projekter alfabetisk på projektnavn:
    const sortByProjectName = (a, b) => {
        const projectNameA = a.name.toUpperCase();
        const projectNameB = b.name.toUpperCase();
    
        if (projectNameA < projectNameB) {
          return -1;
        }
        if (projectNameA > projectNameB) {
          return 1;
        }
        return 0;
    };

    // Sorter projekter alfabetisk på kundenavn:
    const sortByClientName = (a, b) => {
        const clientNameA = a.clientName.toUpperCase();
        const clientNameB = b.clientName.toUpperCase();
    
        if (clientNameA < clientNameB) {
          return -1;
        }
        if (clientNameA > clientNameB) {
          return 1;
        }
        return 0;
    };

    // funktion der bliver kaldt for at sortere. Funktionen kalder ovenstående hjælpefunktioner.
    const handleSortChange = (event) => {
        console.log("handleSortChange has been called")
        const selectedOption = event.target.textContent;
        setSortOption(selectedOption);
    
        switch (selectedOption) {
          case "Alfabetisk på projektnavn":
            setUpdatedProjects([...updatedProjects].sort(sortByProjectName));
            break;
          case "Alfabetisk på kundenavn":
            setUpdatedProjects([...updatedProjects].sort(sortByClientName));
            break;
          case "Senest til tidligst":
            // Implement your sorting logic for this option here
            break;
          case "Tidligst til senest":
            // Implement your sorting logic for this option here
            break;
          default:
            setUpdatedProjects(updatedProjects);
        }
      };

      // useEffect til at tjekke hvornår projekter er blevet sorteret. Kan slettes.
      useEffect(() => {
        console.log("Updated projects after sorting alphabetically:", updatedProjects);
      }, [updatedProjects]);



    return (
        <Wrapper>    

            
            <h1>This is FindProject</h1>
            <br/>
            <Button onClick={() => navigate('/')}> Tilbage til home </Button>
            <br/>
            <Button onClick={() => removeFilters() } > Nulstil filtre </Button>
            
            <br/>
            <br/>
            <br/>
            <div>
                <Row className="dropdown.buttons" >

                    <Col>
                    <DropdownButton title="Sorter efter" >
                        <Dropdown.Item onClick={(event) => handleSortChange(event)} >Alfabetisk på projektnavn</Dropdown.Item>

                        <Dropdown.Item onClick={(event) => handleSortChange(event)} >Alfabetisk på kundenavn</Dropdown.Item>

                        <Dropdown.Item> Senest til tidligst </Dropdown.Item>
                        <Dropdown.Item> Tidligst til senest </Dropdown.Item>
                    </DropdownButton>
                    </Col>

                    <Col>
                    <DropdownButton 
                        title="Kunde"
                        onSelect={handleSelectClient}
                        >
                            { clients.map(client => (
                                <Dropdown.Item eventKey={client.uuid} > {client.name} </Dropdown.Item>
                            )) }
                    </DropdownButton>
                    </Col>

                    <Col>
                    <DropdownButton 
                        title="Konsulent"
                        onSelect={handleSelectConsultant}
                        >
                        { activeConsultants.map(consultant => (
                            <Dropdown.Item eventKey={consultant.uuid} > {consultant.firstname} {consultant.lastname} </Dropdown.Item>
                        )) }
                    </DropdownButton>
                    </Col>
                    

                    <Col>
                    <DropdownButton title="Ydelse" >
                        <Dropdown.Item> Ydelse 1 </Dropdown.Item>
                        <Dropdown.Item> Ydelse 2 </Dropdown.Item>
                    </DropdownButton>
                    </Col>

                    <Col>
                    <DropdownButton title="Tool" >
                        <Dropdown.Item> Tool 1 </Dropdown.Item>
                        <Dropdown.Item> Tool 2 </Dropdown.Item>
                    </DropdownButton>
                    </Col>
                </Row>

                <Row>

                <Carousel>
                {projectChunks.map((chunk, chunkIndex) => (
                    <Carousel.Item key={chunkIndex} interval={100000}>
                    <div className="carousel-content">
                        <div className="row">
                        {chunk.map((project, projectIndex) => (
                            <div className="col" key={projectIndex}>
                            <Card className="card-1" onClick={() => handleProjectClick(chunkIndex, projectIndex)}>
                                <div class="white-circle">
                                <Card.Img className="avatar" variant="top" src={`data:image/jpeg;base64,${getClientLogo(project.clientuuid)}`} />
                                </div>
                                <div className="content">
                                <p>{project.name}</p>
                                </div>
                            </Card>
                            </div>
                        ))}
                        </div>
                    </div>
                    </Carousel.Item>
                ))} 
                </Carousel>

                <Modal show={selectedProjectIndex !== null} onHide={handleModalClose}>
                <Modal.Body>
                    {selectedProjectIndex !== null && selectedProjectChunkIndex !== null && (
                    <div>
                        <img src={`data:image/jpeg;base64,${getClientLogo(projectChunks[selectedProjectChunkIndex][selectedProjectIndex].clientuuid)}`}  ></img>
                        <h2>{projectChunks[selectedProjectChunkIndex][selectedProjectIndex].name}</h2>
                        <br/>
                        <Row>
                            <Col>
                            <h3>Tools:</h3>
                            </Col>
                            <Col>
                            <h3>Ydelser:</h3>
                            </Col>
                        </Row>
                        <br/>
                        <h5> {projectChunks[selectedProjectChunkIndex][selectedProjectIndex].description} </h5>
                    </div>
                    )}
                </Modal.Body>
                </Modal>

                </Row>

               

                {/* <div>
                    {updatedProjects.map((project) => (
                    <div key={project.id}>
                        <p>Client Name: {project.clientName}</p>
                    </div>
                    ))}
                </div> */}


            </div>
        </Wrapper>
    )
}

export default FindProject









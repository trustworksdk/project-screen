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
    const [uniqueProjectClients, setUniqueProjectClients] = useState([]);
    const [uniqueProjectConsultants, setUniqueProjectConsultants] = useState([]);
    const [allConsultants, setAllConsultants] = useState([]);
    const [activeConsultants, setActiveConsultants] = useState([]);
    const [clientList, setClientList] = useState([]);
    const [selectedClient, setSelectedClient] = useState("");
    const [selectedConsultant, setSelectedConsultant] = useState("");
    const [projectChunks, setProjectChunks] = useState([]);
    const [selectedProjectIndex, setSelectedProjectIndex] = useState(null);
    const [selectedProjectChunkIndex, setSelectedProjectChunkIndex] = useState(null);
    const [sortOption, setSortOption] = useState("default");
  

    //Set clients (and active clients)
    useEffect(() => {
        axios.get('https://api.trustworks.dk/clients', config)
        .then(response => {
            setClients(() => response.data)   
        }).catch(error => {
            console.log(error)
        });
    }, []);


    //Set projects
    useEffect(() => {
        axios.get('https://api.trustworks.dk/knowledge/projects', config)
        .then(response => {
            setProjects(() => response.data)
        }).catch(error => {
            console.log(error)
        });
    }, []);
  

    //Set consultants
    useEffect(() => {
        axios.get('https://api.trustworks.dk/users', config)
          .then(response => {
            setAllConsultants(response.data);
          })
          .catch(error => {
            console.log(error);
          });
      }, []);

      //Set active consultants 
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


      //Set list with client IDs and logos
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


    //Add clientName and consultantName as variables in updatedProjects
    useEffect(() => {
        const updatedProjectList = projects.map((project) => {
            //Find client name
            const client = clients.find((client) => client.uuid === project.clientuuid);
            const clientName = client ? client.name : 'Kundenavn ukendt';

            //Update projectDescriptionUserList with Consultant name
            const updatedProjectDescriptionUserList = project.projectDescriptionUserList.map((employee) => {
                const consultant = allConsultants.find((user) => user.uuid === employee.useruuid);
                const consultantFirstName = consultant ? (consultant.firstname) : 'Konsulent fornavn ukendt';
                const consultantLastName = consultant ? (consultant.lastname) : 'Konsulent efternavn ukendt';
                return { ...employee, firstName: consultantFirstName, lastName: consultantLastName};
            });

            //Return list of modified projects
            return {...project, clientName, projectDescriptionUserList: updatedProjectDescriptionUserList};
        })

        setUpdatedProjects(updatedProjectList);
    }, [projects, clients, allConsultants]);   
    
    //Get the client logo. Client ID is given as props. 
    function getClientLogo(props) {
        const foundItem = clientList.find(item => item.id === props);
        return foundItem ? foundItem.file : null;
    }

    //Set selected consultant when clicked in the dropdown
    const handleSelectConsultant = (e) => {
        console.log("handleSelectConsultant has been called")
        setSelectedConsultant(e);
    }
    
    const isClientEmpty = selectedClient === "";
    const isConsultantEmpty = selectedConsultant === "";

    //Remove filters
    const removeFilters = () => {
        setSelectedClient("");
        setSelectedConsultant("");
        
        console.log("removeFilters has been called");
    }

    //Set uniqueProjectConsultants list for drop-down based on unique values from updatedProjects
    useEffect(() => {
        console.log("useEffect: Unik liste af konsulenter");
      
        const uniqueConsultantsMap = new Map(); // Use a Map to efficiently keep track of unique consultants
        updatedProjects.forEach((project) => {
          project.projectDescriptionUserList.forEach((consultant) => {
            const consultantKey = consultant.useruuid;
            const consultantFirstName = consultant.firstName;
            const consultantLastName = consultant.lastName;
            //console.log("Navn: ", consultantFirstName, ", Konsulent id: ", consultantKey)
      
            if (
              !uniqueConsultantsMap.has(consultantKey) &&
              activeConsultants.some(
                (activeConsultant) =>
                activeConsultant.uuid === consultantKey
              )
            ) {
              uniqueConsultantsMap.set(consultantKey, {
                useruuid: consultantKey,
                firstName: consultantFirstName,
                lastName: consultantLastName
              });
            }
          });
        });
      
        const uniqueConsultantsList = Array.from(uniqueConsultantsMap.values());
        const sortedUniqueConsultantsList = uniqueConsultantsList.sort(sortByConsultantName);
        
        setUniqueProjectConsultants(sortedUniqueConsultantsList);
      }, [updatedProjects, activeConsultants]);
      

    useEffect(() => {
        console.log("setUniqueProjectConsultants: ", uniqueProjectConsultants);
    }, [uniqueProjectClients]);

    //Set uniqueProjectClients list for drop-down based on unique values from updatedProjects
      useEffect(() => {
        console.log("useEffect: Unik liste af kunder");
      
        const uniqueClientsMap = new Map(); // Use a Map to efficiently keep track of unique clients
        updatedProjects.forEach((project) => {
          if (!uniqueClientsMap.has(project.clientName)) {
            uniqueClientsMap.set(project.clientName, {
                clientuuid: project.clientuuid,
                clientName: project.clientName
            });
          }
        });
      
        const uniqueClientList = Array.from(uniqueClientsMap.values());
        const sortedUniqueClientsList = uniqueClientList.sort(sortByClientName);
        setUniqueProjectClients(sortedUniqueClientsList);
      }, [updatedProjects]);

    // Filtrering af projekter og visning af fire ad gangen
    const chunkSize = 4;
    useEffect(() => {
        console.log("useEffect: Filtrering af projekter og visning af fire ad gangen");

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

    //Set selected client when clicked in the dropdown
    const handleSelectClient = (e) => {
        setSelectedClient(e);
        console.log("handleSelectClient has been called. Client id:", selectedClient)
        // Filter consultants based on the selected client
        // const filteredConsultantsBySelectedClient = filteredProjectsBySelectedClient.projectDescriptionUserList.filter(consultant => {

        // });
        // //filtrer konsulent dropdown
        // setUniqueProjectConsultants();
        // const sortedUniqueConsultantsList = uniqueConsultantsList.sort(sortConsultantBySelectedClient);
    }

    useEffect(() => {
        const filterConsultantsBySelectedClient = () => {
            // Filter updatedProjectList based on client
            const filteredProjectsBySelectedClient = updatedProjects.filter(project => {
               const matchesClient = !selectedClient || project.clientuuid === selectedClient;
               return matchesClient;
           });
   
           console.log("XX", filteredProjectsBySelectedClient)
       }

    }, [])
    

    //Funktion til at åbne pop up ved click på et projekt
    const handleProjectClick = (chunkIndex, projectIndex) => {
        setSelectedProjectChunkIndex(chunkIndex);
        setSelectedProjectIndex(projectIndex);
      };
    
    //Funktion til at lukke pop up
    const handleModalClose = () => {
        setSelectedProjectChunkIndex(null);
        setSelectedProjectIndex(null);
    };

    //Funktion der bliver kaldt for at sortere. Funktionen kalder ovenstående hjælpefunktioner.
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

    //Sorter projekter alfabetisk på projektnavn:
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

    //Sort consultans based on firstname
    const sortByConsultantName = (a, b) => {
        const consultantNameA = a.firstName.toUpperCase();
        const consultantNameB = b.firstName.toUpperCase();
        
        if (consultantNameA < consultantNameB) {
            return -1;
        }
        if (consultantNameA > consultantNameB) {
            return 1;
        }
        return 0;
    };
    
    //Sorter projekter alfabetisk på kundenavn:
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

    // Sort Consultant by selected client
    const sortConsultantBySelectedClient = (client) => {
        const clientId = client.clientuuid;

        

    };

    //useEffect til at tjekke hvornår projekter er blevet sorteret. Kan slettes.
    useEffect(() => {
        console.log("Updated projects after sorting alphabetically:", updatedProjects);
    }, [updatedProjects]);


    return (
        <Wrapper>    
            <h1>This is FindProject2</h1>
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
                    <DropdownButton title="Kunde" onSelect={handleSelectClient} >
                            {uniqueProjectClients.map(client => (
                                <Dropdown.Item eventKey={client.clientuuid} > {client.clientName} </Dropdown.Item>
                            )) }
                    </DropdownButton>
                    </Col>

                    <Col>
                    <DropdownButton title="Konsulent" onSelect={handleSelectConsultant} >
                        { uniqueProjectConsultants.map(consultant => (
                            <Dropdown.Item eventKey={consultant.useruuid} > {consultant.firstName} {consultant.lastName}</Dropdown.Item>
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
            </div>
        </Wrapper>
    )
}

export default FindProject









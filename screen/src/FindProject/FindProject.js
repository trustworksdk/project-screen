import axios from "axios";
import { useEffect, useState } from "react";
import { Card, Button, Row, Col, Dropdown, DropdownButton, CardGroup, Carousel, Modal } from "react-bootstrap";
import { Wrapper } from "./FindProject.styles";
import { useNavigate } from "react-router-dom";
import {config} from "../Components/API";


const FindProject = () => {

    const navigate = useNavigate();

    const [projects, setProjects] = useState([]);
    
    const [clients, setClients] = useState([]);
    const [activeClients, setActiveClients] = useState([]);
    const [allConsultants, setAllConsultants] = useState([]);
    const [activeConsultants, setActiveConsultants] = useState([]);
    const [clientList, setClientList] = useState([]);
    const [selectedClient, setSelectedClient] = useState("");
    const [selectedConsultant, setSelectedConsultant] = useState("");
    const [projectChunks, setProjectChunks] = useState([]);
    const [newProjectsList, setNewProjectsList] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [selectedProjectIndex, setSelectedProjectIndex] = useState(null);
    const [selectedProjectChunkIndex, setSelectedProjectChunkIndex] = useState(null);



  

    useEffect(() => {
        axios.get('https://api.trustworks.dk/clients', config)
        .then(response => {
            setClients(() => response.data)
            setActiveClients( 
                clients.filter(x => 
                    x.active === false
                    )
             )
            //  console.log(clients)
        }).catch(error => {
            console.log(error)
        });
    }, []);
    

    useEffect(() => {
        axios.get('https://api.trustworks.dk/knowledge/projects', config)
        .then(response => {
            setProjects(() => response.data)
        }).catch(error => {
            console.log(error)
        });
    }, []);

    // useEffect(() => {
    //     axios.get('https://api.trustworks.dk/projects', config)
    //     .then(response => {
    //         setNewProjectsList(() => response.data)
    //         console.log("New projects list: ", newProjectsList)
    //     }).catch(error => {
    //         console.log(error)
    //     });
    // }, []);

    
    // useEffect(() => {
    //     projects?.map(project => {

    //         const foundClient = clients.find(item => item.uuid === project.clientuuid)
    //         const foundClientName = foundClient.name      

    //         setNewProjects( projectsList => [...projectsList, {clientname: foundClientName, projectname: project.name, startdate: project.from, enddate: project.to, description: project.description}] )
    //     })
    // }, [projects]);


    // useEffect(() => {
    //     clients?.map(client => {
    //         const foundClientName = projects.find(item => item.clientuuid === client.uuid)
    //         //console.log(foundClientName ? foundClientName.name : null)
    //         setProjects( projectsList => [...projectsList, {clientname: foundClientName.name}] )
    //         console.log(projects)
    //     })
    // }, [projects]);

  

    useEffect(() => {
        axios.get('https://api.trustworks.dk/users', config)
          .then(response => {
            setAllConsultants(response.data);
          })
          .catch(error => {
            console.log(error);
          });
      }, []);

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


      function getClientLogo(props) {
        const foundItem = clientList.find(item => item.id === props);
        return foundItem ? foundItem.file : null;
    }

   
    // Split the projectList into chunks of size chunkSize for the carousel
    const chunkSize = 4;

    const handleSelectClient = (e) => {
        setSelectedClient(e);
        console.log("handleSelectClient has been called")
    }

    const handleSelectConsultant = (e) => {
        setSelectedConsultant(e);
        console.log("handleSelectConsultant has been called")
    }
    

    const isClientEmpty = selectedClient === "";
    const isConsultantEmpty = selectedConsultant === "";

    // const filteredArray = projects.filter(project => project.clientuuid === selectedClient);

    // For at vise alle projekter hvis intet filter er valgt, og den filtrerede liste hvis filter er valgt.
    // if (isClientEmpty) {
    //     for (let i = 0; i < projects.length; i += chunkSize) {
    //         projectChunks.push(projects.slice(i, i + chunkSize));
    //     }
        
    // } 
    // else {
    //     for (let i = 0; i < filteredArray.length; i += chunkSize) {
    //         projectChunks.push(filteredArray.slice(i, i + chunkSize));
    //     }
        
    // }

    const removeFilters = () => {
        setSelectedClient("");
        setSelectedConsultant("");
        console.log("removeFilters has been called");
    }

    useEffect(() => {
        console.log("useEffect has been called");
        // const filteredArray = projects.filter(project => project.clientuuid === selectedClient);

        const filteredArray = projects.filter(project => {
            const matchesClient = !selectedClient || project.clientuuid === selectedClient;
            const matchesConsultant = !selectedConsultant || project.projectDescriptionUserList.some(user => user.useruuid === selectedConsultant);
            return matchesClient && matchesConsultant;
        });


        let newProjectChunks = [];

        if (isClientEmpty && isConsultantEmpty) {
            for (let i = 0; i < projects.length; i += chunkSize) {
                newProjectChunks.push(projects.slice(i, i + chunkSize));
            }
        } 
        else {
            for (let i = 0; i < filteredArray.length; i += chunkSize) {
                newProjectChunks.push(filteredArray.slice(i, i + chunkSize));
            }   
        }
        setProjectChunks(newProjectChunks)
    }, [selectedClient, projects.length, isClientEmpty, selectedConsultant, isConsultantEmpty] )

 

    const handleProjectClick = (chunkIndex, projectIndex) => {
        setSelectedProjectChunkIndex(chunkIndex);
        setSelectedProjectIndex(projectIndex);
      };
      
      const handleModalClose = () => {
        setSelectedProjectChunkIndex(null);
        setSelectedProjectIndex(null);
      };


    return (
        <Wrapper>    
            
            <h1>This is FindProject</h1>
            <br/>
            <Button onClick={() => navigate('/')}> Tilbage til home </Button>
            <br/>
            <Button onClick={() => removeFilters() } > Fjern filtre </Button>
            
            <br/>
            <br/>
            <br/>
            <div>
                <Row className="dropdown.buttons" >
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
            </div>
        </Wrapper>
    )
}

export default FindProject









import axios from "axios";
import { useEffect, useState, useRef } from "react";
import { Card, Button, Row, Col, Dropdown, DropdownButton, CardGroup, Carousel, Modal, ButtonGroup } from "react-bootstrap";
import { Wrapper } from "./FindProject.styles";
import { useNavigate, useLocation } from "react-router-dom";
import {config} from "../Components/API";
import {ArrowBack} from '@styled-icons/boxicons-regular/ArrowBack';
import {ArrowIosBack} from  '@styled-icons/evaicons-solid/ArrowIosBack';
import {ArrowReset} from '@styled-icons/fluentui-system-filled/ArrowReset';
import {BackInTime} from '@styled-icons/entypo/BackInTime';
import {AddToQueue} from '@styled-icons/boxicons-regular/AddToQueue';
import {Add} from '@styled-icons/fluentui-system-filled/Add';
import { useToolContext } from "../Contexts/ToolContext"; 


const FindProject = () => {

    const navigate = useNavigate();

    const [projects, setProjects] = useState([]);
    const [updatedProjects, setUpdatedProjects] = useState([]);
    const [clients, setClients] = useState([]);
    const [uniqueProjectClients, setUniqueProjectClients] = useState([]);
    const [uniqueProjectOfferings, setUniqueProjectOfferings] = useState([]);
    const [uniqueProjectTools, setUniqueProjectTools] = useState([]);
    const [uniqueProjectConsultants, setUniqueProjectConsultants] = useState([]);
    const [allConsultants, setAllConsultants] = useState([]);
    const [activeConsultants, setActiveConsultants] = useState([]);
    const [clientList, setClientList] = useState([]);
    const [selectedClient, setSelectedClient] = useState("");
    const [selectedConsultant, setSelectedConsultant] = useState("");
    const [selectedOffering, setSelectedOffering] = useState("");
    const [selectedTool, setSelectedTool] = useState("");
    const [projectChunks, setProjectChunks] = useState([]);
    const [selectedProjectIndex, setSelectedProjectIndex] = useState(null);
    const [selectedProjectChunkIndex, setSelectedProjectChunkIndex] = useState(null);
    const [sortOption, setSortOption] = useState("default");
    const [activeSlide, setActiveSlide] = useState(0);

    const { selectedToolFromContext } = useToolContext();




    useEffect(() => {
        // Add the 'no-background-image' class to the body element when the component mounts
        document.body.classList.add('no-background-image');
    
        // Remove the 'no-background-image' class from the body element when the component unmounts
        return () => {
          document.body.classList.remove('no-background-image');
        };
      }, []);
  

    // Set clients (and active clients)
    useEffect(() => {
        axios.get('https://api.trustworks.dk/public/clients', config)
        .then(response => {
            setClients(() => response.data)   
        }).catch(error => {
            console.log(error)
        });
    }, []);


    // Set projects
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
        axios.get('https://api.trustworks.dk/public/users', config)
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

            allConsultants.filter(consultant => 
                consultant.active && (consultant.type === "CONSULTANT") || (consultant.type === "STUDENT" )
            )
        );
        
      }, [allConsultants]);

    


      //Set list with client IDs and logos
      useEffect(() => {
        projects?.map(project => {
            axios.get(`https://api.trustworks.dk/public/files/photos/${project.clientuuid}`, config)
            .then(response => {
                setClientList(clientList => [...clientList, {id: project.clientuuid, file: response.data.file}])  
            }).catch(error => {
            console.log(error)
            })
        })
    }, [projects]);


    //Add clientName and consultantName as variables in updatedProjects
    useEffect(() => {
        console.log("all consultants: ", allConsultants)

        const updatedProjectList = projects.map((project) => {
            //Find client name
            const client = clients.find((client) => client.uuid === project.clientuuid);
            const clientName = client ? client.name : 'Kundenavn ukendt';

            //Update projectDescriptionUserList with Consultant name
            const updatedProjectDescriptionUserList = project.projectDescriptionUserList.map((employee) => {
                const consultant = allConsultants.find((user) => user.uuid === employee.useruuid);
                const consultantFirstName = consultant ? (consultant.firstName) : 'Konsulent fornavn ukendt';
                const consultantLastName = consultant ? (consultant.lastName) : 'Konsulent efternavn ukendt';
                return { ...employee, firstName: consultantFirstName, lastName: consultantLastName};
            });
            //Return list of modified projects
            return {...project, clientName, projectDescriptionUserList: updatedProjectDescriptionUserList};
        })

        setUpdatedProjects(updatedProjectList);
        // console.log("updatedProjects", updatedProjects)
    }, [projects, clients, allConsultants]);   
    
    //Get the client logo. Client ID is given as props. 
    function getClientLogo(props) {
        const foundItem = clientList.find(item => item.id === props);
        return foundItem ? foundItem.file : null;
    }
    
    const isClientEmpty = selectedClient === "";
    const isConsultantEmpty = selectedConsultant === "";
    const isOfferingEmpty = selectedOffering === "";
    const isToolEmpty = selectedTool === "";

    // Remove filters
    const removeFilters = () => {
        setSelectedClient("");
        setSelectedConsultant("");
        setSelectedOffering("");
        setSelectedTool("");
        
        console.log("removeFilters has been called");
    }

    // Set uniqueProjectConsultants list for drop-down based on unique values from updatedProjects
    useEffect(() => {
        // console.log("useEffect: Unik liste af konsulenter");
      
        const uniqueConsultantsMap = new Map(); // Use a Map to efficiently keep track of unique consultants
        updatedProjects.forEach((project) => {
          project.projectDescriptionUserList.forEach((consultant) => {
            const consultantKey = consultant.useruuid;
            const consultantFirstName = consultant.firstName;
            const consultantLastName = consultant.lastName;
            // console.log("Navn: ", consultantFirstName, ", Konsulent id: ", consultantKey)
      
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
        // console.log(uniqueConsultantsList)
      }, [updatedProjects, activeConsultants]);
      

    useEffect(() => {
        // console.log("setUniqueProjectConsultants: ", uniqueProjectConsultants);
    }, [uniqueProjectClients]);

    // Set uniqueProjectClients list for drop-down based on unique values from updatedProjects
    useEffect(() => {
        // console.log("useEffect: Unik liste af kunder");
      
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
        const sortedUniqueClientsList = uniqueClientList.sort(sortByClientName); // Hey Nicole, man kan også bare skrive ".sort()" og så sorteres den alfabetisk, se useEffect nedenfor.
        setUniqueProjectClients(sortedUniqueClientsList);
    }, [updatedProjects]);


    // Set uniqueOfferingList for drop-down based on unique values from updatedProjects
    useEffect(() => {
        // console.log("useEffect: Unik list of offerings");
      
        const uniqueOfferingMap = new Map(); // Use a Map to efficiently keep track of unique offerings
        updatedProjects.forEach((project) => {
            project.offeringList.forEach((offering) => {
                if (!uniqueOfferingMap.has(offering)) {
                    uniqueOfferingMap.set(offering, offering)
                }
            })
        });
      
        const uniqueOfferingList = Array.from(uniqueOfferingMap.values());
        
        const sortedUniqueOfferingList = uniqueOfferingList.sort();
        setUniqueProjectOfferings(sortedUniqueOfferingList);
    }, [updatedProjects]);


    // Set UniqueProjectTools for drop-down based on unique values from updatedProjects
    useEffect(() => {
        // console.log("useEffect: Unik list of tools");
      
        const uniqueToolMap = new Map(); // Use a Map to efficiently keep track of unique tools
        updatedProjects.forEach((project) => {
            project.toolsList.forEach((tool) => {
                if (!uniqueToolMap.has(tool)) {
                    uniqueToolMap.set(tool, tool)
                }
            })
        });
      
        const uniqueToolList = Array.from(uniqueToolMap.values());
        const sortedUniqueToolList = uniqueToolList.sort();
        setUniqueProjectTools (sortedUniqueToolList);
    }, [updatedProjects]);



    // Filtrering af projekter og visning af tre ad gangen
    const chunkSize = 3;
    useEffect(() => {
        // console.log("useEffect: Filtrering af projekter og visning af tre ad gangen");
        const filteredArray = updatedProjects.filter(project => {
            const matchesClient = !selectedClient || project.clientuuid === selectedClient;
            const matchesConsultant = !selectedConsultant || project.projectDescriptionUserList.some(user => user.useruuid === selectedConsultant);
            const matchesOffering = !selectedOffering || project.offeringList.some(offering => offering === selectedOffering);
            const matchesTool = !selectedTool || project.toolsList.some(tool => tool === selectedTool);

            return matchesClient && matchesConsultant && matchesOffering && matchesTool;
        });

        // Split the projectList into chunks of size chunkSize for the carousel
        let newProjectChunks = [];
        if (isClientEmpty && isConsultantEmpty && isOfferingEmpty && isToolEmpty ) {
            for (let i = 0; i < updatedProjects.length; i += chunkSize) {
                newProjectChunks.push(updatedProjects.slice(i, i + chunkSize));
            }
        } 
        else {
            for (let i = 0; i < filteredArray.length; i += chunkSize) {
                newProjectChunks.push(filteredArray.slice(i, i + chunkSize));
            }   
        }

        // Reset the active slide index when consultant/client/offering/tool selection changes
        setActiveSlide(0);

        setProjectChunks(newProjectChunks)
        // console.log("selected tool from use effect:", selectedTool)
        console.log("project chunks:", projectChunks)
    }, [selectedClient, updatedProjects.length, isClientEmpty, selectedConsultant, isConsultantEmpty, updatedProjects, selectedOffering, isOfferingEmpty, isToolEmpty, selectedTool])



    // Set selected consultant when clicked in the dropdown
    const handleSelectConsultant = (e) => {
        // console.log("handleSelectConsultant has been called")
        setSelectedConsultant(e);
    }

    //Set selected client when clicked in the dropdown
    const handleSelectClient = (e) => {
        setSelectedClient(e);
        // console.log("handleSelectClient has been called. Client id:", selectedClient)


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

    // Set selected offering when clicked in the dropdown
    const handleSelectOffering = (e) => {
        // console.log("handleSelectOffering has been called: ", e)
        setSelectedOffering(e);
    }

    // Set selected tool when clicked in the dropdown
    const handleSelectTool = (e) => {
        // console.log("handleSelectTool has been called")
        setSelectedTool(e);
    }

    useEffect(() => {
        // Filter updatedProjectList based on client
        const filteredProjectsBySelectedClient = updatedProjects.filter(project => {
           const matchesClient = !selectedClient || project.clientuuid === selectedClient;
           return matchesClient;           
        });
   
        // console.log("XX", filteredProjectsBySelectedClient)
    }, [])
    

    // Funktion til at åbne modal ved click på et projekt
    const handleProjectClick = (chunkIndex, projectIndex) => {
        setSelectedProjectChunkIndex(chunkIndex);
        setSelectedProjectIndex(projectIndex);
    };
    
    // Funktion til at lukke modal
    const handleModalClose = () => {
        setSelectedProjectChunkIndex(null);
        setSelectedProjectIndex(null);
    };

    // Funktion der bliver kaldt for at sortere. Funktionen kalder ovenstående hjælpefunktioner.
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

    // Sort consultans based on firstname
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

    // Sort Consultant by selected client
    const sortConsultantBySelectedClient = (client) => {
        const clientId = client.clientuuid;

        

    };

    // useEffect til at tjekke hvornår projekter er blevet sorteret. Kan slettes.
    // useEffect(() => {
    //     console.log("Updated projects after sorting alphabetically:", updatedProjects);
    // }, [updatedProjects]);


    const handleCreateProject = () => {
        const externalURL = 'https://intra.trustworks.dk/#!projectdescriptions';
        window.open(externalURL, '_blank'); // '_blank' opens in a new window/tab
    };

    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'long' };
        return new Date(dateString).toLocaleDateString('da-DK', options);
    };


    return (
        <Wrapper 
            // style={{
            //     backgroundImage: 'none',
            //     // Add any other styles specific to this page if needed
            // }}
          >
            <ButtonGroup style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ flex: 1, marginRight: '10px' }}>
                    <Button className="back" onClick={() => navigate('/')}> <ArrowIosBack size="24" /> Tilbage til home </Button>
                </div>

                <div style={{ flex: 1, marginLeft: '10px' }}>
                    <Button className="add" onClick={handleCreateProject}  > < Add size="24" /> Opret projekt </Button>
                </div>
                
                <div style={{ flex: 1, marginLeft: '10px' }}>
                    <Button className="nulstil" onClick={() => removeFilters() } > < BackInTime size="24" /> Nulstil filtre </Button>
                </div>
            </ButtonGroup>
            
            <br/>
            <br/>
            <br/>
            <div className="project-container" >
                <Row className="dropdown.buttons" >
                    <Col className="dropdown-col d-flex justify-content-center" >
                    <DropdownButton title="Sorter efter"  size="lg" >
                        <Dropdown.Item onClick={(event) => handleSortChange(event)} >Alfabetisk på projektnavn</Dropdown.Item>
                        <Dropdown.Item onClick={(event) => handleSortChange(event)} >Alfabetisk på kundenavn</Dropdown.Item>
                        <Dropdown.Item> Senest til tidligst </Dropdown.Item>
                        <Dropdown.Item> Tidligst til senest </Dropdown.Item>
                    </DropdownButton>
                    </Col>

                    <Col className="dropdown-col d-flex justify-content-center" >
                    <DropdownButton title="Kunde" onSelect={handleSelectClient} size="lg" >
                            {uniqueProjectClients.map(client => (
                                <Dropdown.Item eventKey={client.clientuuid} > {client.clientName} </Dropdown.Item>
                            )) }
                    </DropdownButton>
                    </Col>

                    <Col className="dropdown-col d-flex justify-content-center" >
                    <DropdownButton title="Konsulent" onSelect={ handleSelectConsultant } size="lg" >
                        { uniqueProjectConsultants.map(consultant => (
                            <Dropdown.Item eventKey={consultant.useruuid} > {consultant.firstName} {consultant.lastName} </Dropdown.Item>
                        )) }
                    </DropdownButton>
                    </Col>
                    
                    <Col className="dropdown-col d-flex justify-content-center" >
                    <DropdownButton title="Kompetence" size="lg" onSelect={handleSelectOffering}  >
                        { uniqueProjectOfferings.map((offering) => (
                            <Dropdown.Item eventKey={offering} > {offering}  </Dropdown.Item>
                        )) }
                    </DropdownButton>
                    </Col>

                    <Col className="dropdown-col d-flex justify-content-center" >
                    <DropdownButton title="Tool" size="lg" onSelect={handleSelectTool } >
                        { uniqueProjectTools.map((tool) => (
                            <Dropdown.Item eventKey={tool} > {tool} </Dropdown.Item>
                        )) }
                    </DropdownButton>
                    </Col>
                </Row>

                <Row>

                <Carousel 
                    defaultActiveIndex={0}
                    activeIndex={activeSlide} // Set the active index
                    onSelect={(index) => setActiveSlide(index)} // Update the active index  
                >
                {projectChunks.map((chunk, chunkIndex) => (
                    <Carousel.Item key={chunkIndex} interval={5000} >
                    <div className="carousel-content">
                        <div className="row">
                        {chunk.map((project, projectIndex) => (
                            <div className="col" key={projectIndex}>
                            <Card className="card" onClick={() => handleProjectClick(chunkIndex, projectIndex)}>
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

                <Modal 
                    show={selectedProjectIndex !== null} 
                    onHide={handleModalClose} 
                    centered
                    size="lg"
                >
                <Modal.Body >
                    {selectedProjectIndex !== null && selectedProjectChunkIndex !== null && (
                    <div>
                        <img src={`data:image/jpeg;base64,${getClientLogo(projectChunks[selectedProjectChunkIndex][selectedProjectIndex].clientuuid)}` }  ></img>
                        <h2 className="modalheader" > {projectChunks[selectedProjectChunkIndex][selectedProjectIndex].name} </h2>
                        <p> { formatDate(projectChunks[selectedProjectChunkIndex][selectedProjectIndex].from)} - { formatDate(projectChunks[selectedProjectChunkIndex][selectedProjectIndex].to)} </p>
                        <br/>
                        <Row>
                            <Col>
                            <h3>Tools:</h3>
                            <p> {projectChunks[selectedProjectChunkIndex][selectedProjectIndex].toolsList.join(', ')} </p>
                            </Col>

                            <Col>
                            <h3>Kompetencer:</h3>
                            <p> {projectChunks[selectedProjectChunkIndex][selectedProjectIndex].offeringList.join(', ')} </p>
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









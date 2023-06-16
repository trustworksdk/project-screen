import axios from "axios";
import { useEffect, useState } from "react";
import { Card, Button, Row, Col, Dropdown, DropdownButton, CardGroup, Carousel } from "react-bootstrap";
import { Wrapper } from "./FindProject.styles";
import { useNavigate } from "react-router-dom";
import {config} from "../Components/API";
// import Carousel from 'react-multi-carousel';
// import { useSpringCarousel } from 'react-spring-carousel'


const FindProject = () => {

    const navigate = useNavigate();

    const [projects, setProjects] = useState([]);
    const [newProjects, setNewProjects] = useState([]);
    const [clients, setClients] = useState([]);
    const [activeClients, setActiveClients] = useState([]);
    const [allConsultants, setAllConsultants] = useState([]);
    const [activeConsultants, setActiveConsultants] = useState([]);
    const [value, setValue] = useState("");
    const [clientList, setClientList] = useState([]);

    const handleChange = (event) => {
        setValue(event.target.value);
    };

    useEffect(() => {
        axios.get('https://api.trustworks.dk/clients', config)
        .then(response => {
            setClients(() => response.data)

            setActiveClients( 
                clients.filter(x => 
                    x.active === false
                    )
             )
            
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


    
    
    useEffect(() => {
        projects?.map(project => {

            const foundClient = clients.find(item => item.uuid === project.clientuuid)
            const foundClientName = foundClient.name      

            setNewProjects( projectsList => [...projectsList, {clientname: foundClientName, projectname: project.name, startdate: project.from, enddate: project.to, description: project.description}] )
        })
    }, [projects]);


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
    const projectChunks = [];
    for (let i = 0; i < projects.length; i += chunkSize) {
        projectChunks.push(projects.slice(i, i + chunkSize));
    }

    return (
        <Wrapper>
            
            <h1>This is FindProject</h1>
            <br/>
            <Button onClick={() => navigate('/')}> Tilbage til home </Button>
            <br/>
            <br/>
            <br/>
            <div>
                <Row className="dropdown.buttons" >
                    <Col>
                    <DropdownButton title="Kunde" >
                        { clients.map(client => (
                            <Dropdown.Item onClick={() => handleChange()} > {client.name} </Dropdown.Item>
                        )) }
                    </DropdownButton>
                    </Col>

                    <Col>
                    <DropdownButton title="Konsulent" >
                        { activeConsultants.map(consultant => (
                            <Dropdown.Item> { consultant.firstname } {consultant.lastname} </Dropdown.Item>
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
                {projectChunks.map((chunk, index) => (
                    <Carousel.Item key={index} interval={100000}>
                        <div className="carousel-contenct">
                        <div className="row">
                            {chunk.map((project, projectIndex) => (
                                <div className="col" key={projectIndex}>
                                    <Card className="card-1">
                                    <div class="white-circle" >
                                    <Card.Img className="avatar" variant="top" src={`data:image/jpeg;base64,${ getClientLogo(project.clientuuid) }`} />
                                    </div>
                                    <div className="content">
                                        <p> {project.name} </p>
                                    </div>
                                        
                                        
                                    </Card>
                                </div>
                            ))}

                        </div>
                        </div>

                    </Carousel.Item>
                    

                ))}
            </Carousel>
                    

                    
                    
                </Row>

       
            
            </div>
        </Wrapper>
    )
}

export default FindProject









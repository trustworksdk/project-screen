import axios from "axios";
import { useEffect, useState } from "react";
import { Card, Button, Row, Col, Dropdown, DropdownButton, CardGroup } from "react-bootstrap";
import { Wrapper } from "./FindProject.styles";
import { useNavigate } from "react-router-dom";
import {config} from "../Components/API";
import Carousel from 'react-multi-carousel';


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

    //  Hente liste fra knwledge/projects
    // liste clientuuid 
    // omsat clientuuid til clientname via /client  
    
    
    useEffect(() => {
        projects?.map(project => {

            const foundClient = clients.find(item => item.uuid === project.clientuuid)
            const foundClientName = foundClient.name
            // console.log(foundClientName)        

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
            setAllConsultants(() => response.data)

            setActiveConsultants(
                allConsultants.filter(x => 
                   x.active === true &&
                   (x.statuses.some(y => 
                       y.type === "CONSULTANT") ||
                   x.statuses.some(y => 
                       y.type === "STUDENT"))
               ) );
             
        }).catch(error => {
            console.log(error)
        });
    }, []);

   



    return (
        <Wrapper>

            {console.log(newProjects)}

            {/* {console.log("Clients:", clients)   }
            {console.log("Active clients:", activeClients)   } */}

            
             {/* {() => getActiveallConsultants() } */}

            {/* {console.log("active consultants:", activeConsultants)} */}

            

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

            <br/>
            <br/>
            <br/>


                <Row>
                    
                    
                </Row>

       
            
            </div>
        </Wrapper>
    )
}

export default FindProject









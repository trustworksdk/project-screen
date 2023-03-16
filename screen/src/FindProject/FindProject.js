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
    const [clients, setClients] = useState([]);
    const [consultants, setConsultants] = useState([]);
    const [value, setValue] = useState("");

    const handleChange = (event) => {
        setValue(event.target.value);
    };
    

    // useEffect(() => {
    //     axios.get('https://api.trustworks.dk/knowledge/projects', config)
    //     .then(response => {
    //         setProjects(() => response.data)
    //         console.log("Projects:", projects)   
    //     }).catch(error => {
    //         console.log(error)
    //     });
    // }, []);


    useEffect(() => {
        axios.get('https://api.trustworks.dk/clients', config)
        .then(response => {
            setClients(() => response.data)
            console.log("Clients:", clients)   
        }).catch(error => {
            console.log(error)
        });
    }, []);


    useEffect(() => {
        axios.get('https://api.trustworks.dk/users', config)
        .then(response => {
            setConsultants(() => response.data)
            console.log("Consultants:", consultants)   
        }).catch(error => {
            console.log(error)
        });
    }, []);




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
                        { consultants.map(consultant => (
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









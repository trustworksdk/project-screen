import { Wrapper } from "./Home.styles";
import axios from "axios";
import { useEffect, useState } from "react";
import { Card, Button, CardGroup, Carousel, Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { Base64 } from "js-base64";
import {config} from "../Components/API";
import {ArrowIosBack} from  '@styled-icons/evaicons-solid/ArrowIosBack';
import { useToolContext } from "../Contexts/ToolContext";


 
const Home = () => {

    const navigate = useNavigate();
    const [projects, setProjects] = useState();
    const [employeeList, setEmployeeList] = useState([]);
    const [clientList, setClientList] = useState([]);
    const { selectedTool, updateSelectedTool, setSelectedTool } = useToolContext();

    

    // Setting projects
    // useEffect(() => {
    //     axios.get('https://api.trustworks.dk/knowledge/projects', config)
    //     .then(response => {
    //         setProjects(() => response.data) 
    //     }).catch(error => {
    //         console.log(error)
    //     });
    // }, []);

    useEffect(() => {
        axios
          .get('https://api.trustworks.dk/knowledge/projects', config)
          .then(response => {
            // Sort the projects by the "from" field in descending order
            const sortedProjects = response.data.sort((a, b) => {
              // Convert the "from" values to Date objects for comparison
              const dateA = new Date(a.from);
              const dateB = new Date(b.from);
      
              // Compare the dates in reverse order (newest first)
              return dateB - dateA;
            });
      
            // Set the sorted projects in the state
            setProjects(sortedProjects);
          })
          .catch(error => {
            console.log(error);
          });
      }, []);

      

    // Making employee list consisting of id and photo file
    useEffect(() => {
        projects?.map(project => {
            project.projectDescriptionUserList?.map(user => {
                axios.get(`https://api.trustworks.dk/public/users/${user.useruuid}/photo`, config).then(response => { 
                    // setEmployeePhoto(response.data.file);
                    const photo = response.data.file;
                    setEmployeeList(employeeList => [...employeeList, {id: user.useruuid, file: photo}])  
                }).catch(error => {
                    console.log(error)
                }) 
            })
        })
    }, [projects]);


    // Function to get the employee photo
    function getEmployee(props) {
        const foundItem = employeeList.find(item => item.id === props);
        return foundItem ? foundItem.file : null;
    }


    // Making client list consisting of id and photo file
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


    // Function to get the client logo
    function getClientLogo(props) {
        const foundItem = clientList.find(item => item.id === props);
        return foundItem ? foundItem.file : null;
    }

    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'long' };
        return new Date(dateString).toLocaleDateString('da-DK', options);
    };

    const handleToolButtonClick = (tool) => {
        // setSelectedTool(tool);
        navigate('/findproject');
        // console.log("From home page: handleToolButtonClick: ", tool)

        // updateSelectedTool(tool);
        setSelectedTool(tool);
    };


    return (
        <Wrapper className="body::before" >
        <Button  onClick={() => navigate('/findproject')} >  < ArrowIosBack size="24" /> Flere projekter</Button>


        <Carousel className="carousell" >
            {projects?.map(project => (

                <Carousel.Item interval={100000} >

                    <CardGroup>
                    <div className="col-sm-4">
                    <div className="seperator">
                        <Card className="card bg-transparent border-0" >
                            <Card.Img class="mx-auto" variant="top" src={`data:image/jpeg;base64,${ getClientLogo(project.clientuuid) }`} width={400} height={200} style={{ borderRadius: '3%' }}/>
                        </Card>
                        <div className="ydelser-og-tools">
                        <Card className="ydelser bg-transparent border-0">
                                <Card.Title className="ydelser-og-tools-overskrift" > Ydelser </Card.Title>
                                <Card.Text>
                                    { project.offeringList.map(tool => (
                                        <button className="ydelser-og-tools-knap"> {tool} </button>
                                    )) }
                            </Card.Text>
                            </Card>
                        <Card className="tools bg-transparent border-0">
                            <Card.Title className="ydelser-og-tools-overskrift" > Tools </Card.Title>
                            <Card.Text> 
                                { project.toolsList.map(tool => (
                                    <button 
                                        key={tool}
                                        className="ydelser-og-tools-knap"
                                        onClick={() => handleToolButtonClick(tool)}
                                        > {tool} 
                                    </button>
                                )) }
                            </Card.Text>
                        </Card>
                        </div>
                    </div>
                    </div>

                    <div className="col-sm-8" >
                        <Card className="card bg-transparent border-0" >
                            <Card.Body>
                                <Card.Title>
                                    <h1> {project.name} </h1>
                                    <br></br>
                                    <h2 className="periode"> {formatDate(project.from)} - {formatDate(project.to)} </h2>
                                    <h2 className="beskrivelse"> {project.description} </h2>
                                </Card.Title>



                                <Row className="employeerow" >
                                { project.projectDescriptionUserList?.map(user => (
                                    <Col className="employeecol" >
                                    <img className="employeephoto" src={`data:image/jpeg;base64,${ getEmployee(user.useruuid) }`}  />
                                    <p>  </p>
                                    </Col>
                                )) }
                                </Row>
                            </Card.Body>
                        </Card>
                    </div>

                    </CardGroup>
                </Carousel.Item>
            ))}
        </Carousel>
        </Wrapper> 
    )
}

export default Home

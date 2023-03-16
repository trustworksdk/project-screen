import { Wrapper } from "./Home.styles";
import dsb from "../img/dsb2.png"
import axios from "axios";
import { useEffect, useState } from "react";
import { Card, Button, CardGroup, Carousel } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { Base64 } from "js-base64";
import kurt from "../img/kurt.jpg"
import {config} from "../Components/API";

 
const Home = () => {

    const navigate = useNavigate();

    const [projects, setProjects] = useState();
    const [employeeList, setEmployeeList] = useState([]);
    const [clientList, setClientList] = useState([]);
    

    useEffect(() => {
        axios.get('https://api.trustworks.dk/knowledge/projects', config)
        .then(response => {
            setProjects(() => response.data)
            // console.log("Projects:", projects)   
        }).catch(error => {
            console.log(error)
        });
    }, []);

    
    useEffect(() => {
        projects?.map(project => {
            project.projectDescriptionUserList?.map(user => {
                axios.get(`https://api.trustworks.dk/users/${user.useruuid}/photo`, config).then(response => { 
                    // setEmployeePhoto(response.data.file);
                    const photo = response.data.file;
                    setEmployeeList(employeeList => [...employeeList, {id: user.useruuid, file: photo}])  
                }).catch(error => {
                    console.log(error)
                }) 
            })
        })
        // setEmployeeList(employeeList.filter( (ele, ind) => ind === employeeList.findIndex( elem => elem.id === ele.id && elem.file === ele.file)))
    }, [projects]);


    function getEmployee(props) {
        const foundItem = employeeList.find(item => item.id === props);
        return foundItem ? foundItem.file : null;
    }


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


    return (
        <Wrapper className="body::before" >
        <Button onClick={() => navigate('/findproject')} > Flere projekter</Button>


        <Carousel className="carousell" >
            {projects?.map(project => (

                <Carousel.Item interval={100000} >

                    <CardGroup>
                    <div className="col-sm-4">
                        <Card className="card bg-transparent border-0" >
                            <Card.Img class="mx-auto" variant="top" src={`data:image/jpeg;base64,${ getClientLogo(project.clientuuid) }`} width={270} height={150} style={{ borderRadius: '3%' }}/>
                            <Card.Body className="people" >
                                { project.projectDescriptionUserList?.map(user => (
                                    <Card className="person card bg-transparent border-0" >
                                        <Card.Body className="personcardbody">

                                        <Card.Img className="person card image" src={`data:image/jpeg;base64,${ getEmployee(user.useruuid) }`}  style={{ width: 140, height: 120, borderRadius: '50%', float: "left" }}></Card.Img>
                                        <Card.Text className="userdescription"> {user.description}  </Card.Text>
                                        
                                         </Card.Body>
                                    </Card>
                                )) }
                            </Card.Body>
                        </Card>
                    </div>

                    <div className="col-sm-8" >
                        <Card className="card bg-transparent border-0" >
                            <Card.Body>
                                <Card.Title>
                                    <h1> {project.name} </h1>
                                    <br></br>
                                    <h2> {project.description} </h2>
                                </Card.Title>
                            </Card.Body>
                        </Card>


                        <CardGroup className="ydelser-og-tools ">
                            <Card className="ydelser bg-transparent border-0">
                                <Card.Title> <h2>Ydelser</h2> </Card.Title>
                                <Card.Text> hej </Card.Text>
                            </Card>
                            <Card className="tools bg-transparent border-0">
                                <Card.Title> <h2>Tools</h2> </Card.Title>
                                <Card.Text> hej </Card.Text>
                            </Card>
                        </CardGroup>




                    </div>



                    </CardGroup>
                </Carousel.Item>
            ))}
        </Carousel>

        <br></br>
        <br></br>
        <br></br>
        <br></br>





            {/* <div className="row">
            <CardGroup >
            <div className="col-sm-4">
                <Card  className="card bg-transparent border-0" >
                    <Card.Img class="mx-auto" variant="top" src={dsb} width={170} height={150} ></Card.Img>
                    <Card.Body className="people">

                        <Card className="person card bg-transparent border-0">
                            <Card.Body>
                            <Card.Img className="person card image" src={kurt} style={{ width: 140, height: 120, borderRadius: '50%', float: "left" }}  ></Card.Img>
                            <div className="person card text bg-transparent border-0" > Løsningsarkitekt- Hjælper med tekniks projektledelse, konceptualisering samt roadmaps. </div>
                            </Card.Body>
                        </Card>
                        <Card className="person card bg-transparent border-0">
                            <Card.Body>
                            <Card.Img className="person card image" src={kurt} style={{ width: 140, height: 120, borderRadius: '50%', float: "left" }}  ></Card.Img>
                            <div className="person card text bg-transparent border-0" > Løsningsarkitekt- Hjælper med tekniks projektledelse, konceptualisering samt roadmaps. </div>
                            </Card.Body>
                        </Card>
                        <Card className="person card bg-transparent border-0">
                            <Card.Body>
                            <Card.Img className="person card image" src={kurt} style={{ width: 140, height: 120, borderRadius: '50%', float: "left" }}  ></Card.Img>
                            <div className="person card text bg-transparent border-0" > Løsningsarkitekt- Hjælper med tekniks projektledelse, konceptualisering samt roadmaps. </div>
                            </Card.Body>
                        </Card>  
                    </Card.Body>
                </Card>

                </div>
                <div className="col-sm-8">
                <Card className="card bg-transparent border-0">
                    <Card.Body>
                        <Card.Title> 
                            <h1> Projektnavn </h1> 
                            <h2> Periode for projektet </h2>
                        </Card.Title>
                        <br></br>
                        <Card.Text> Signaldriften. Kortlægningen er en viderebygning på den prototype Press og Stefanlavede tidligere i 2020. Projekter berørte følgende snitflader. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. </Card.Text>
                    </Card.Body>
                    <br></br>
                    <br></br>
                    <br></br>
                

                    <CardGroup className="ydelser-og-tools">
                        <Card className="ydelser2">
                            <Card.Title> <h2>Ydelser</h2> </Card.Title>
                            <Card.Text> hej </Card.Text>
                        </Card>
                        <Card>
                            <Card.Title> <h2>Tools</h2> </Card.Title>
                            <Card.Text> hej </Card.Text>
                        </Card>
                    </CardGroup>

       
                </Card>


           
                </div>

            
            </CardGroup>
            </div> */}


            {/* {projects?.map(project => (
            <Card  >
                <Card.Body>
                    <img src={`data:image/jpeg;base64,${ getClientLogo(project.clientuuid) }`} style={{ width: 540, height: 230, borderRadius: '3%' }}/>
            
                    <Card.Title className="cardtitle" > {project.name} </Card.Title>
                    <Card.Text className="cardtext" >
                        <div>  {project.description} </div>
                        <br></br>
                        <br></br>
                        <b> Trustworkere på projektet: </b>
                        
                        { project.projectDescriptionUserList?.map(user => (
                            <div>
                                 {<img src={`data:image/jpeg;base64,${ getEmployee(user.useruuid) }`} style={{ width: 140, height: 130, borderRadius: '50%' }}  />}
                                <div> {user.description } </div>
                            </div>
                        )) }
                    </Card.Text>
                </Card.Body>
            </Card>
            ))} */}

        
        </Wrapper>
        
    )
}

export default Home

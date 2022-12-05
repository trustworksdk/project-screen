import axios from "axios";
import { useEffect, useState } from "react";
import { Card, Button } from "react-bootstrap";
import { Wrapper } from "./FindProject.styles";
import { useNavigate } from "react-router-dom";
import { Base64 } from "js-base64";
import Project from "../Project";

const FindProject = () => {

    const navigate = useNavigate();

    const token = "eyJraWQiOiIvcHJpdmF0ZUtleS5wZW0iLCJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJpc3MiOiJodHRwczovL3RydXN0d29ya3MuZGsiLCJwcmVmZXJyZWRfdXNlcm5hbWUiOiJkaXR0ZS5oam9ydGgiLCJpYXQiOjE2NjgzNjE3MTIsImV4cCI6MTY2ODM5NzcxMiwiZ3JvdXBzIjpbIlVTRVIiXSwianRpIjoiYzZjMDBmYTItNTNiYy00YjE4LWE1MGQtYTRkMGU5ZjlkNmU1In0.gBkDiJZBN-FHiPGl6Pihj0e7hCSLxHI4BIEVF21mQfh_hvNS0BPr2RjFj9SRn0W2ZMTT3H3SFtdUWMSGllppLqnSqolmNmdGw1dII_haR0aQbtPCzARryCsghfTARXCR31AnSpHrTgNtHwV4ahKNUdh9jiwf9Kde59MVv4x4l24JiII6C-LTSI2-csI6ERtSs4TPTlZSiqxIYbjc_Krt8h8qA-xQYXQjOZGL0kBBzYjDn9e_uZxHqzBCjwEChKMSlWh7oy3pkSqswi6AquXag3REQtWuvq7eO4aGsYt5zwYeLVjT1UkGxHclg4VnshcHdWxm92uL8OR5swZ7dHrsGfFUd1WC7BWre0HX4nknjsDGQpycxK3VhyVXMqjxcqMg_lqUP7QHNmErjVI2VAs2QvnFVa19D4lzBGZ5MDhwjsotkXsTdvdsQulzBFEHDmLyuX_tpjpC8Z8b9tywjGjPNzp_fVEA6WJaFklTLaK4W005hdHwww3o4qIUcnLV5HSnJP5hAtICvEz1GligJHhPReMu8PGG8SFZUDySST-zfa4E-flsWyAmosfxWJDnz8GY8CdUjev448LNph-XKrNgDR2LnJXAVxiZ88l2WfosIENskALOdYWEmsWqPtol8rKhF2QelEKn69YACp2-KB1wjZdkn_R9pn8KhHz0pXM92l0";
    const config = {
        headers: { Authorization: `Bearer ${token}`}
    };

    const [projects, setProjects] = useState();
    const [projectData, setProjectData] = useState();
    const [clientData, setClientData] = useState();
    const [clientID, setClientID] = useState();
    const [clientLogo, setClientLogo] = useState();
    const [useruuid, setUseruuid] = useState();
    

    useEffect(() => {
        axios.get('https://api.trustworks.dk/knowledge/projects', config)
        .then(response => {
            setProjects(() => response.data)
            // console.log("Projects:", projects)   
        }).catch(error => {
            console.log(error)
        });
    }, []);

   

   
    // const printProjectsToConsole = () => {
    //     axios.get('https://api.trustworks.dk/knowledge/projects', config)
    //     .then(response => {
    //         setProjects(() => response.data)
    //         // console.log("Projects:", projects)
    //     }).catch(error => {
    //         console.log(error)
    //     })
    // }

    useEffect(() => {
        setProjectData(projects);
    }, []);



    // const getLogo = (props) => {
    //     axios.get(`https://api.trustworks.dk/files/photos/${props.useruuid}`, config)
    //     .then(response => {
    //         // setClientData(() => response.data)
    //         setClientData(() => response.data)
    //         console.log("clientdata.file: ", clientData.file)
            
            
    //     })
    //     return (
    //         <div>
    //             <img src={"data:image/png;base64," + clientLogo} />
    //         </div>
    //     )
    // }

    


    return (
        <Wrapper>
            <h1>This is FindProject</h1>
            <h3>Test af API kald: </h3>
            {/* <Button onClick={printProjectsToConsole} >Print projects</Button> */}
            {/* <button onClick={getProjectName} >Get project name</button> */}
            <br/>
            <br/>
            <Button onClick={() => navigate('/')}> Tilbage til home </Button>
            <br/>
            <br/>
            <h2> Projekter: </h2>
            {/* <div> <ProjectCards></ProjectCards> </div> */}

            <div>
            {projects?.map(project => (
            <Card>
                <Card.Body>
            
                    <Card.Title className="cardtitle" > {project.name} </Card.Title>
                    <Card.Text className="cardtext" >
                        <div>  {project.description} </div>
                        
                        {/* <img src={"data:image/png;base64," + clientLogo} /> */}
                        
                        
                        {/* <div> {GetClientLogo(project)} </div> */}
                        {/* { getLogo(() => project) } */}

                       {/* {getLogo(project)} */}


                        
                       <br></br>
                        <br></br>
                        <b> Trustworkere på projektet: </b>
                        { project.projectDescriptionUserList?.map(user => (
                            <div> 
                            <div> Id: {user.useruuid} </div>
                            <div> Beskrivelse: {user.description } </div>
                            <br></br>
                            </div>
                        )) }
                    </Card.Text>
                </Card.Body>
            </Card>
            ))}
            </div>

            


            
            

        </Wrapper>
    )
}

export default FindProject







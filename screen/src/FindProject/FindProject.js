import axios from "axios";
import { useEffect, useState } from "react";
import { Card, Button } from "react-bootstrap";
import { Wrapper } from "./FindProject.styles";
import { useNavigate } from "react-router-dom";
import { Base64 } from "js-base64";

const FindProject = () => {
    const navigate = useNavigate();

    const token = "eyJraWQiOiIvcHJpdmF0ZUtleS5wZW0iLCJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJpc3MiOiJodHRwczovL3RydXN0d29ya3MuZGsiLCJwcmVmZXJyZWRfdXNlcm5hbWUiOiJkaXR0ZS5oam9ydGgiLCJpYXQiOjE2NjYzNTIxMjgsImV4cCI6MTY2NjM4ODEyOCwiZ3JvdXBzIjpbIlVTRVIiXSwianRpIjoiNmQzNDA5YjktNjNhZC00MDVjLWJkZTItMDRiZmM5NWJkMmQ4In0.Le_8Aw9wZ2uhmX57EGSejjBfNfQzQ5_mUbnn9KI5p4amGKM1TjwE-QFXHY4QCvN3creTk1eOHjgFc-aGOuJM1uoUJtp54KlKZJX5wTOD02zVMbOR0BHudWir7k_4Vsc4OGif1IPXhHh_vxD-g-ZntAsBWInPxHRV8Xc2sKOzSB9kiEDMMEq5MXCcrGozNUH9ZHci7lEQoBi8g5QI7aYNDsgq9VYagXfTgaawIb1JxiHog4HM57vFl2cmE4Cv6RTEQCLBj8gDR1Sj-CaNBnEKfKG4qScUYgzziFnuEzFBZMdWrWxiuuXM_O9p7Fjes1e1O0QeTAsHgwxmdD8B_Xb89DYGxDwv9UyJAAOIusVUiSehNgaCw5Rk8XjW6vADd8kuDPmJ60bVfxykCk_6xgybWlcU2xB1jiL-KvPjDVViLIWu9pW6RF2PLYuPJTSiejelsDHNi8b1S3jGI-h3bAfSysEyym16vlzQF9IsE4EVI2FmhvBcPdp2VCmh0cHA1VZW4ycm68YOXThrgveqBKDX0Z9YwH1bM7WA-G9cvdiTzSKSRGQ_sy-eJ5RDtyoySDrvnuVc21v66_iS0yayBRCalOAM0_yzwvFFCiAsJ59U59oZpk1Nk71vXc3A-GZY6t6qkHQqn5PIk6r4pFX2SYDRK4l59f64fB6F9BfEya33yuI";
    const config = {
        headers: { Authorization: `Bearer ${token}`}
    };

    const [projects, setProjects] = useState();
    const [projectData, setProjectData] = useState();
    const [clientData, setClientData] = useState();
    const [clientID, setClientID] = useState();
    const [clientLogo, setClientLogo] = useState();
    

    useEffect(() => {
        axios.get('https://api.trustworks.dk/knowledge/projects', config)
        .then(response => {
            setProjects(() => response.data)
            // console.log("Projects:", projects)   
        }).catch(error => {
            console.log(error)
        });
    }, []);

   
    const printProjectsToConsole = () => {
        axios.get('https://api.trustworks.dk/knowledge/projects', config)
        .then(response => {
            setProjects(() => response.data)
            // console.log("Projects:", projects)
        }).catch(error => {
            console.log(error)
        })
    }

    useEffect(() => {
        setProjectData(projects);
        // console.log("projectData:", projectData);
    }, [projects]);



    useEffect(() => {
        setClientID(projectData?.clientuuid);
        // console.log("client id:", clientID);
    }, [projects])

  


    useEffect(() => {
        projects?.map(project => (
        // axios.get('https://api.trustworks.dk/files/photos/7d34db42-9d11-4fe2-84df-449a46cdfcc9', config)
        axios.get(`https://api.trustworks.dk/files/photos/${project.clientuuid}`, config, )
        .then(response => {
            setClientData(() => response.data)
            console.log(clientData)
            // setClientLogo(() => clientData.file)
            // console.log(clientLogo)


            // setClientData(() => response.data)
            
            

            
        }).catch(error => {
            console.log(error)
        }) ));
    }, []);

    
   


    return (
        <Wrapper>
            <h1>This is FindProject</h1>
            <h3>Test af API kald: </h3>
            <Button onClick={printProjectsToConsole} >Print projects</Button>
            {/* <button onClick={getProjectName} >Get project name</button> */}
            <br/>
            <br/>
            <Button onClick={() => navigate('/')}> Tilbage til home </Button>
            <br/>
            <br/>
            <h2> Projekter: </h2>
            
            <div>
                {projects?.map(project => (
                    <Card>
                        <Card.Body>
                            {/* <div> {Base64.decode(clientLogo)} </div> */}
                            <Card.Title className="cardtitle" > {project.name} </Card.Title>
                            <Card.Text className="cardtext" >
                                <div>  {project.description} </div>
                                
                                {/* <img src={"data:image/png;base64," + clientLogo} /> */}
                                <div>
                                    {/* <img src="data:image/png;base64, " /> */}
                                </div>
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
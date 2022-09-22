import axios from "axios";
import { useEffect, useState } from "react";
import { Card, Button } from "react-bootstrap";
import { Wrapper } from "./FindProject.styles";
import { useNavigate } from "react-router-dom";
import { Base64 } from "js-base64";

const FindProject = () => {
    const navigate = useNavigate();

    const token = "eyJraWQiOiIvcHJpdmF0ZUtleS5wZW0iLCJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJpc3MiOiJodHRwczovL3RydXN0d29ya3MuZGsiLCJwcmVmZXJyZWRfdXNlcm5hbWUiOiJkaXR0ZS5oam9ydGgiLCJpYXQiOjE2NjM3NzA1MjUsImV4cCI6MTY2MzgwNjUyNSwiZ3JvdXBzIjpbIlVTRVIiXSwianRpIjoiZDI0ZjQ0ODQtNjkwNS00YTU2LTk4MjgtOTExNWMyMDA5OGJlIn0.LGPB5VGGL6vTwrweROTl3BFxsEBF-Jm_pZMHJoDThZUhUn8mtOU3cLSp0qzn_iAy48SUUn3eB8DcbqfbtAKrhtnrruxSycrhcTycf5gkIJ_Xbf4yWLALXTyjMVH8vbXX0DasiLxcZf4chaHAbJuACrG8DrNbiyEmHPbNtysVY7Ay5z_Gt7nAsnArtBV4SShZE6Qqv8ktgcvK75cNK1fbHvw-o6fnPCp4ix8eyBqdVdSyU85Y8nSyHlIgSZX_oeDn1CE8PQ9GLP6-RAJqTu1YotinpWHJjAT9LMQkL5dfACnPxelPlQBUfDCftKsngmwfk2n65VHtljxDLLo84-KrWUUMh_jxNWwu4grZjPkKe0o69yz46zW5lFoRiS2Qof3-ejj2xWzmQGTAKXbGPMurnrra4WRxYputveeHyC69_9jfn9q_bON8mpo9jkr_BDR5zW8PVZBb8dgzCVRmSnXZYWwuhY9c7Bz1QDN_Mf-zyBNC2Z6Mh1-BSz4pbTZDZhEh0KwJT6-5VH89QEYm5noZO_NJ3LaZFja9l8rApm36lIAVpGb4sysXjYIoCu_D3PH7AdxMLXh_1-wd1iBZm9FCK5Nol3BCSqykW2oMfQbBLHtj9yyYntEUK7RcvNk2ufMwyMBcweAa_EfdT8-LxFAxXVryu9Ww7QBvttKK6XpEU0E";

    const config = {
        headers: { Authorization: `Bearer ${token}`}
    };

    const [projects, setProjects] = useState();
    const [projectData, setProjectData] = useState();
    const [clientData, setClientData] = useState();
    const [clientID, setClientID] = useState();
    

    useEffect(() => {
        axios.get('https://api.trustworks.dk/knowledge/projects', config)
        .then(response => {
            setProjects(() => response.data)
            console.log("Projects:", projects)
            
            
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
        // axios.get('https://api.trustworks.dk/files/photos/7d34db42-9d11-4fe2-84df-449a46cdfcc9', config)
        axios.get(`https://api.trustworks.dk/files/photos/${clientData?.uuid}`, config, )
        .then(response => {
            setClientData(() => response.data)
            console.log("logo data: ", response.data)
            console.log("id: ", clientData?.uuid);
            
            
            // setClientID(projectData?.clientuuid);
            // console.log("logo string: ", clientData.file)
            // setClientLogo(() => clientData?.file)
        }).catch(error => {
            console.log(error)
        });
    }, []);

    useEffect(() => {
        setClientID(projectData?.clientuuid);
        // console.log("client id:", clientID);
    }, [projects])
   


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
                                
                                <img src={"data:image/png;base64," + clientData?.file} />
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
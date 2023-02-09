import axios from "axios";
import { useEffect, useState } from "react";
import { Card, Button } from "react-bootstrap";
import { Wrapper } from "./FindProject.styles";
import { useNavigate } from "react-router-dom";
import { Base64 } from "js-base64";
import Project from "../Project";

const FindProject = () => {

    const navigate = useNavigate();

    const token = "eyJraWQiOiIvcHJpdmF0ZUtleS5wZW0iLCJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJpc3MiOiJodHRwczovL3RydXN0d29ya3MuZGsiLCJwcmVmZXJyZWRfdXNlcm5hbWUiOiJkaXR0ZS5oam9ydGgiLCJpYXQiOjE2NzU5NTMwMjgsImV4cCI6MTY3NTk4OTAyOCwiZ3JvdXBzIjpbIlVTRVIiXSwianRpIjoiM2VlNGFmZTYtOGQ4MS00Y2Q1LTlkY2ItNGIwOGNjYTM1NzAxIn0.I3qfK2EQbqDLj4UrC49sUs58j1iwW7y0N7yzZzYSeVzCvc18G7nJvawW0H69q3qcR1tFkijcNf7DQgil7axaPKkahoGTAkgVmbM-UfbVYFxbN3ylCqsOIZs5nB_CXQaNTiuNHLXzzA6wbC4GXM9Gfd27Up2Sf1RbR0EE_pnj9TVe3i6QyH1HuSEvGDG2EjrGLtjnyTkV_hp3Q7ZXpbRxW84FREauqaDxaW7kzMbGJWKuPASIW9Rgpu3LMGrJ183ICIbYq2iZuOaCq0p-rc4hI1GgfCcdrd2vdxntcGVNSVM9CiGb8SSws3e55hEp4XmjUmj0REbRC6glo753krxv2RDYkZnuBm9U9jqu1LMBqz0mHImCdXLnRdKbeyWl3u3sxdWTQEn7sshYE5oz28T3hB_oWD9PtUiotaxtIslWEi0mqk6_or3N-dgL1N_Z8malvw7sv5ODy7atRWY4RvDKSiaTC6RE2vLefO8gGV6o1uKII_J5MUwpX4-kqzacQ4g3OWepswy8h3jLF_dnJgMxwscGJ-Ps0UgJMkzn5qq-ZLCgC67frxQ58ErDgYmKsgcnZ5YiQCDvlkFaWwcHNoT_5EUBdB9cEjg6zUtlo0A3l7WzbR53FeE8QW7ZwxqePM7dl6GdSLtK7VIGxEdQdPgKXUCLk5aaIy-f1dNqo3Eq7NE";
    const config = {
        headers: { Authorization: `Bearer ${token}`}
    };

    const [projects, setProjects] = useState();
    const [projectData, setProjectData] = useState();
    const [clientData, setClientData] = useState();
    const [clientID, setClientID] = useState();
    const [clientLogo, setClientLogo] = useState();
    const [useruuid, setUseruuid] = useState();
    const [employeePhoto, setEmployeePhoto] = useState();
    const [employeeList, setEmployeeList] = useState([]);
    

    useEffect(() => {
        axios.get('https://api.trustworks.dk/knowledge/projects', config)
        .then(response => {
            setProjects(() => response.data)
            // console.log("Projects:", projects)   
        }).catch(error => {
            console.log(error)
        });
    }, []);


    const getEmployee = () => {
        projects.map(project => (
            project.projectDescriptionUserList?.map(employee => {
                console.log("employee:", employee.useruuid)
            })
        ) )
    }

    const getEmployeePhoto2 = (props) => {
        axios.get(`https://api.trustworks.dk/users/${props}/photo`, config).then(response => {
            console.log(response.data.file)
            var photo = response.data.file
            return photo
            
            
        }).catch(error => {
            console.log(error)
        })
    }

    function getEmployeePhoto(props) {
        axios.get(`https://api.trustworks.dk/users/${props}/photo`, config).then(response => {
            console.log(response.data.file)
            var photo = response.data.file
            setEmployeePhoto(response.data.file)
            return ( 
                employeePhoto
            )
            
        
        }).catch(error => {
            console.log(error)
        })

    }

    // 8fa7f75a-57bf-4c6f-8db7-7e16067c1bcd
    // useEffect(() => {
    //     axios.get(`https://api.trustworks.dk/users/${projects.projectDescriptionUserList.useruuid}/photo`, config)
    //     .then(response => {
    //         setEmployee(() => response.data)
    //         console.log("Employee:", employee)   
    //     }).catch(error => {
    //         console.log(error)
    //     });
    // }, []);

   

   
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



    const getLogo = (props) => {
        axios.get(`https://api.trustworks.dk/files/photos/${props.clientuuid}`, config)
        .then(response => {
            // setClientData(() => response.data)
            setClientData(() => response.data)
            console.log("clientdata.file: ", clientData.file)  
        })
        return (
            <div>
                <img src={"data:image/png;base64," + clientLogo} />
            </div>
        )
    }

    


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
                        {/* {console.log(project)} */}
                        
                        {/* <img src={"data:image/png;base64," + clientLogo} /> */}
                        
                        
                        {/* <div> {GetClientLogo(project)} </div> */}
                        {/* { getLogo(() => project) } */}

                       {/* {getLogo(project)} */}

                       {/* <div> {getLogo} </div> */}

                       {/* {getEmployee()} */}


                        
                       <br></br>
                        <br></br>
                        <b> Trustworkere på projektet: </b>
                        
                        
                        { project.projectDescriptionUserList?.map(user => (
                            <div> 
                            <div> Id: {user.useruuid} </div>
                            <div> Beskrivelse: {user.description } </div>
                            <br></br>
                            {/* {getEmployeePhoto(user.useruuid)} */}

                            <div> Employeefile: 
                                <img src={"data:image/png;base64, " + getEmployeePhoto(user.useruuid)} />
                            </div>
                            <span> span: {getEmployeePhoto(user.useruuid)} </span>
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







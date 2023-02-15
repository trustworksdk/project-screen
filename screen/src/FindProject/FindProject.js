import axios from "axios";
import { useEffect, useState } from "react";
import { Card, Button } from "react-bootstrap";
import { Wrapper } from "./FindProject.styles";
import { useNavigate } from "react-router-dom";
import { Base64 } from "js-base64";
import Project from "../Project";
// import kurt from "../img/kurt.jpg";

const FindProject = () => {

    const navigate = useNavigate();

    const token = "eyJraWQiOiIvcHJpdmF0ZUtleS5wZW0iLCJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJpc3MiOiJodHRwczovL3RydXN0d29ya3MuZGsiLCJwcmVmZXJyZWRfdXNlcm5hbWUiOiJkaXR0ZS5oam9ydGgiLCJpYXQiOjE2NzY0NjMwOTgsImV4cCI6MTY3NjQ5OTA5OCwiZ3JvdXBzIjpbIlVTRVIiXSwianRpIjoiYTNhYTRlMjctYWEwYi00NTlkLWFjNmYtMWFiODEwMTkzZDM5In0.B3JHug7-oqJH2nMJufII3vpi2k8yeU9Pcy53IZUTwmx5S-s6pGh3M5blsiRbJqWpXjUZ03zoEp500LgpWOXqvztSSxafyGx6_vVSfl_3E5Ih1FkBG8Qzh7OjFYU6qPMlyiW3JsBiWdlWYZy2uiXUN9AUALg75XHbK6EQ3UapuLLYayI8Vp1NLkF6Wfi9zZRz1G0Jp_ruiyy8rLvADQisWNfyTdH9dPHUwo-MvxCG9eBZftztkFM073ybu0VVCc3KgDS6QC4RAdOE3MvWX8ZrvNUf_hRI9yzbWXgCKoXj72E85LElFAh4dDINDXnpJKzzFSD60BXR3s7zPAnW1f1UfxcKo-bpJh5abr1VXtKkXSnb9tiYXja6-FCjVQBAnT76WOqR8VVOKaPtoZEtl-dQxgQ-uE7h-o9uEJeF99LawVrelnCYpDPdR6BctfUG3KqrPiUcnI6DNLSbNAAy5qwpgyrWX1GJccTWyoP-JQeLXzbkJLYyH8VlYBNUVs3BMDjwyYy3RQJ_6cokI8lzLHuslkY48EM2IKHRC4fNQXk4Ka-S2ggb0LxUqEL3fr0aIu9pDcfXf9DKEPAe8vYsRzpUXo8pBXbb6FsbQQBjQUuT0_hDAZwEKOSzNebMDYxLSBiUnOWw88VojRbISRJSig_Z7JogBwevViFgnqh52jhy6gg";
    const config = {
        headers: { Authorization: `Bearer ${token}`},
        // mode: 'no-cors',
        // 'Access-Control-Allow-Origin': 'http://localhost:3000',
        // 'Access-Control-Allow-Methods': 'GET, PUT, POST, DELETE, OPTIONS',
        // 'Access-Control-Request-Headers': 'Content-Type, Authorization',
        // withCredentials: true,
        // credentials: 'same-origin',
        
      
    };

    const [projects, setProjects] = useState();
    const [projectData, setProjectData] = useState();
    const [clientData, setClientData] = useState();
    const [clientID, setClientID] = useState();
    const [clientLogo, setClientLogo] = useState();
    const [employeeId, setemployeeId] = useState();
    const [employeePhotos, setEmployeePhotos] = useState([]);
    const [employeePhoto, setEmployeePhoto] = useState("");
    const [employeeDescription, setEmployeeDescription] = useState("");
    const [employeeList, setEmployeeList] = useState([]);
    const [fileList, setFileList] = useState([]);
    const [employeesOnProjectsList, setEmployeesOnProjectsList] = useState([]);


    

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
        setProjectData(projects);
    }, []);


    useEffect(() => {
        projects?.map(project => {
            project.projectDescriptionUserList?.map(user => {
                employeeList.push(user)
            })
        })
        employeeList.forEach((element) => {
            element.file = "";
        })
        console.log(employeeList)
    }, [projects]);




    // useEffect(() => {
    //     projects?.map(project => {
    //         project.projectDescriptionUserList?.map(user => {
    //             employeeList.push(user)
    //         })
    //     })
    //     employeeList?.map(employee => {
    //         let id = employee.useruuid;
    //         axios.get(`https://api.trustworks.dk/users/${id}/photo`, config).then(response => {
    //         fileList.push(response.data.file)
    //     })
    //     })
    // }, []);



    
    // const getEmployee = () => {
    //     projects.map(project => (
    //         project.projectDescriptionUserList?.map(employee => {
    //             console.log("employee:", employee.useruuid)
    //         })
    //     ) )
    // }


    // let getUser = (id) => {
    //     axios.get(`https://api.trustworks.dk/users/${id}/photo`, config)
    //     .then(response => {
            
    //     })
    // }

    

    // useEffect(() => {
    //     axios.get('https://api.trustworks.dk/users', config)
    //     .then(response => {
    //         setEmployeeList(response.data)
    //         console.log(employeeList)
    //     }).catch(error => {
    //         console.log(error)
    //     });
    // }, []);


    // const getEmployee = () => {
    //     const id = "d7a1061b-8de5-44f6-8bc2-ee52ed32a149";
    //     const employeeId = employeeList.find((person) => person.uuid === id);
    //     console.log(employeeId)
    //     return <h1>userid: {employeeId.uuid}</h1>
    // }



    // const binaryToImage = (props) => {
    //     return <img src={`data:image/jpeg;base64,${props}`} />
    // }







    

    const getEmployeePhoto1 = (props) => {
        axios.get(`https://api.trustworks.dk/users/${props}/photo`, config)
        .then(response => {
            // setEmployeePhoto(response.data.file)
            let fileString = response.data.file;
            // console.log(fileString)
            
            let objIndex = employeeList.findIndex((obj => obj.id === {props}));
            console.log(objIndex)
            // employeeList[objIndex].file = fileString;
        }).catch(error => {
            console.log(error)
        })
        // return <img src={`data:image/jpeg;base64,${employeePhoto}`} /> 
    }



    function getEmployeePhoto(props) {
        axios.get(`https://api.trustworks.dk/users/${props}/photo`, config)
        .then(response => {

            // setEmployeeList(response.data)
            
            const photo = response.data.file
            // console.log(employeeList)



            // return <img src={props.src} lat="" />
        }).catch(error => {
            console.log(error)
        })
    }


    function Test(props) {
        return ( 
            <div>
                <h1>Hello, {props.useruuid}</h1>
                {/* <img src={kurt} /> */}
            </div>
        )
    }


    // function printEmployeeList() {
    //     console.log(employeeList)
    // }

    



    // function getEmployeePhoto(props) {
    //     axios.get(`https://api.trustworks.dk/users/${props}/photo`, config).then(response => {
    //         // console.log(response.data.file)
    //         var photo = response.data.file
    //         setEmployeePhoto(response.data.file)
    //         return ( 
    //             employeePhoto
    //         )
    //     }).catch(error => {
    //         console.log(error)
    //     })

    // }

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

   



    // const getLogo = (props) => {
    //     axios.get(`https://api.trustworks.dk/files/photos/${props.clientuuid}`, config)
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
            <Card  >
                <Card.Body>
            
                    <Card.Title className="cardtitle" > {project.name} </Card.Title>
                    <Card.Text className="cardtext" >
                        <div>  {project.description} </div>
             
                        <br></br>
                        <br></br>
                        <b> Trustworkere på projektet: </b>



                        
                        {/* {setemployeeId(user.useruuid)}
                        <h2> EmployeeId variable: {employeeId} </h2> */}

                        

                        

                        
                        
                        
                        { project.projectDescriptionUserList?.map(user => (
                            

                            <div> 
                                
                                

                                

                                {/* {setEmployeesOnProjectsList(user)}
                                {console.log(employeesOnProjectsList)} */}

                                {getEmployeePhoto1(user.useruuid)}
                                

                                
                                
                            
                            <div> Id: {user.useruuid} </div>
                            <div> Beskrivelse: {user.description } </div>
                            <br></br>

                            <div> 
                                Employeefile:
                            </div>
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









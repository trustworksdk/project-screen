import axios from "axios";
import { useEffect, useState } from "react";
import { Card, Button, Row, Col } from "react-bootstrap";
import { Wrapper } from "./FindProject.styles";
import { useNavigate } from "react-router-dom";
import { Base64 } from "js-base64";
import Project from "../Project";
import kurt from "../img/kurt.jpg";


const FindProject = () => {

    const navigate = useNavigate();

    const token = "eyJraWQiOiIvcHJpdmF0ZUtleS5wZW0iLCJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJpc3MiOiJodHRwczovL3RydXN0d29ya3MuZGsiLCJwcmVmZXJyZWRfdXNlcm5hbWUiOiJkaXR0ZS5oam9ydGgiLCJpYXQiOjE2NzY5MTIyNzksImV4cCI6MTY3Njk0ODI3OSwiZ3JvdXBzIjpbIlVTRVIiXSwianRpIjoiMDY4ZDRkNTctNTMwMi00NWJmLTgyZmMtNjE2NmE5NzY4NDc4In0.eoXxFlZWl_rz-LGT1pFzMtmc-rICbgnt4UBML0rksqJUpETS8_fQXDw5UiB0SsMhiR5iMuyVm12NBliLkKptrb5GwyZ-kIsab7rYuXhEGBAuVjmgerI9-cqo7UuDFc5CHNK4nqOLqe_Xv_wvajLNDOO4vDmio7PxFdER4TGb0l42lSO6HrG5VvjFmPSL6LjrmzXZ8omU1xOiJlGjoj_plCf6AG8TRYYIweHMDaxsipXWJqzgYZ_7jPIVE6KyGlgKJneQ2kiLTKmW0tDdJTBL0JXMEsmBk14h7c-rjFAP9pdXP0DbsWm0eyxmd2rAmqz2RrTeVIoPpksi4QDvfkuJEa86fJZvg2KJ-zd6e1SBpSsXjrWq9PTUTmlZvwOeMMzbT1qcoOoi5bAm2nKs_UGjfigrFuKFYFE8hiT-sPUhw_kT481ZbpA3fp9nmTWek0IUE3aVr1AyiiddPbrsf58_euBMYIgNALuXEBAjw3jKGs3beUCo2ZlZHJQfGfDCo4vdwHhCUYj-ls3wUUJ4XT6-rV2oChj-aABEuTXeUojFBtY7p7ZtrjBAF8HKA7sNlD70F0tQr-PKHROYZqHJ7Ee69gba-x_LCGzFn5nfhgF3eTrfi-xvq-ETtT8l9WcfHRDdCzNtr7sjNCRc-bceRc66qS5WdDosAy64xzhBUpRBwGg";
    const config = { headers: { Authorization: `Bearer ${token}`} };

    const [projects, setProjects] = useState();
    
    const [clientData, setClientData] = useState();
    const [clientID, setClientID] = useState();
    const [clientLogo, setClientLogo] = useState();

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
        // console.log(employeeList)
    }, [projects]);


    function handleEmployeeList() {
        // let pp = employeeList.filter( (ele, ind) => ind === employeeList.findIndex( elem => elem.useruuid === ele.useruuid && elem.file === ele.file))
        // setEmployeeList(pp)
        // console.log(pp)
    }


    function getEmployee(props) {
        const foundItem = employeeList.find(item => item.id === props);
        // console.log(foundItem)
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
        <Wrapper>

            {/* {handleEmployeeList()} */}
           


            <h1>This is FindProject</h1>
            <br/>
            <br/>
            <Button onClick={() => navigate('/')}> Tilbage til home </Button>
            <br/>
            <br/>
    

            <div>
            {projects?.map(project => (
            <Card  >
                <Card.Body>
                    {/* {getClientLogo(project.clientuuid)} */}
                    {/* <Card.Img  /> */}
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
            ))}
            </div>
        </Wrapper>
    )
}

export default FindProject









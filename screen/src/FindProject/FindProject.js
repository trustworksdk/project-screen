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

    const token = "eyJraWQiOiIvcHJpdmF0ZUtleS5wZW0iLCJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJpc3MiOiJodHRwczovL3RydXN0d29ya3MuZGsiLCJwcmVmZXJyZWRfdXNlcm5hbWUiOiJkaXR0ZS5oam9ydGgiLCJpYXQiOjE2NzY4OTgxMzQsImV4cCI6MTY3NjkzNDEzNCwiZ3JvdXBzIjpbIlVTRVIiXSwianRpIjoiZWZlZDMyODQtOWQ3NC00MzcwLTkyYzItMTRhMmI2ZTRjYmEzIn0.gdKr3nT4jFjnGIJO9-o0YTLsWzTqXinzdlpyW-IdfwsrafIHilcuKd3WP1fZX6IYE7QJvGtjY_fEy3KqQQYyhtPIZx1ziYH24LPNUwgXSMuzjscFB_w2blWKt1SVShutmZ_S8OX_OAodtC6lQlkLE6neqORven8-xOKy-Idq-XXlo1kk9asA4_jfpNzO_f-xN9Gin9NyrJfWRwIGINxW2uh6Ksue2TnVl9qwzZfGDm_YXfYv69qlQlG1p78RWexWoKUJui5XF_CoiVCmdTzRjn1LTQjGZRRB_clbVF-yPxd-EWBGAJXCVpXMRlviC26uzet2o4KUNrRkLOPXosnd8tM-e6_wKQw3NxoKyMPiO924s-EyCsd2gatCEUl8SdArK47XX1H6ZFmcSHQL4ImBrvuBjW3se_Cs3f_Y0Ntu6e7KAWu5DJRcfEFH_h_fuWFHjns0henRCqnbVetue3xneRzB_FrB__DoA08iZQ1MjRf7IpeWaXnC-Y16azIge-g-CC0EwpWoxL8P73-7FKp6nnsBEbljuEwhP48IRV3RUu8jzMa3ZVEt6DRjYmzQGYAXWKxzimoJTqfmfb6hxM1HGk-8vcojfjpu_CwEW6TUGtlN6BYONdW7hFjmOnIgN7onMaaNTKupO9FjqqyQ1BtjFSpXtJx--kBE5gECrcjSRZI";
    const config = { headers: { Authorization: `Bearer ${token}`} };

    const [projects, setProjects] = useState();
    
    const [clientData, setClientData] = useState();
    const [clientID, setClientID] = useState();
    const [clientLogo, setClientLogo] = useState();

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









import axios from "axios";
import { useEffect, useState } from "react";
import { Card, Button, Carousel } from "react-bootstrap";
import { Wrapper } from "./FindProject.styles";
import { useNavigate } from "react-router-dom";
import { Base64 } from "js-base64";
import kurt from "../img/kurt.jpg"


const FindProject = () => {

    const navigate = useNavigate();

    const token = "eyJraWQiOiIvcHJpdmF0ZUtleS5wZW0iLCJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJpc3MiOiJodHRwczovL3RydXN0d29ya3MuZGsiLCJwcmVmZXJyZWRfdXNlcm5hbWUiOiJkaXR0ZS5oam9ydGgiLCJpYXQiOjE2Nzc4MzYwNDUsImV4cCI6MTY3Nzg3MjA0NSwiZ3JvdXBzIjpbIlVTRVIiXSwianRpIjoiYjZhNDZjNWEtZTRiMi00NDllLThiYzItOTgxMmNkNTdhNGNhIn0.XmVmDetMaK6LGt3Qq2_Uzdl-Z6DAbQoPnqQ_c4W640AKgGRgk69UuWvtTMeKZYKZTlIPfu5AGT3cbpa5kCR_mk-qNOutZvNOgB1Wpj_wwd4hqvn9IHCBkeZYOaruX1V-_clLOpkFFuK1b-y9wzo9KUWicEr50Nzkdm98C2Op0wzaE0yhQXn2sa0b6YK51SsVv5BYGXQQM2yIPeNILlZx6guE_0GvwpqjS7sBWLp9r7_6H93SPkn_pWofh_y-5YFRXsM8FfarSyLztqjZPYoCbuMVrLOUYnRGvYBFkQbMkseE8uIUjwKvJvykf5_GZGNoousUCQou4Hk3BaT4A30vRLtEBcIEsx6Ar7yAvoQXV0xf3mCDDjSjBqfwCtLUaWgaG6OaeLNheFL8HrVqNnBXAf7U1HXlOeKl0ATFM2rZ0gaZSbVfs7c7cfX9vbSar4Rv2--zFSENhtMdC8l6VxKbb4YSn9suKFb48zZ74RVAgGP4zX54mYpTNbQ3uNBX9RroGcge8glATvmSFfycZFBSRlhTdbgxdUAQZg1EeDCRI69UuEegwgJRQbs7_qaR-umh8ebnIRUqwjz5iHvqzWwuA3BK3AYih9cye4VCROCPxKMF5E-tLTC2o2KOxu9SdAkBxyONM9kInyxA21MNDZZuGRLK0UdsXb0uzkQJbWfhuS0";
    const config = { headers: { Authorization: `Bearer ${token}`} };

    const [projects, setProjects] = useState();
    const [employeeList, setEmployeeList] = useState([]);
    const [clientList, setClientList] = useState([]);
   
    

    useEffect(() => {
        axios.get('https://api.trustworks.dk/knowledge/projects', config)
        .then(response => {
            setProjects(() => response.data)
            console.log("Projects:", projects)   
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
        <Wrapper>

            <h1>This is FindProject</h1>
            <br/>
            <Button onClick={() => navigate('/')}> Tilbage til home </Button>
            <br/>

            {/* <Carousel>
                <Carousel.Item> 
                    <img src={kurt} alt="First slide" />
                    <Carousel.Caption>
                        <h3>First slide label</h3>
                        <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item> 
                    <img src={kurt} alt="First slide" />
                    <Carousel.Caption>
                        <h3>Second slide label</h3>
                        <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
                    </Carousel.Caption>
                </Carousel.Item>
            </Carousel> */}
  
            <div>



            <Carousel >
            {projects?.map(project => (
            <Carousel.Item  >
                
                    <img src={`data:image/jpeg;base64,${ getClientLogo(project.clientuuid) }`} style={{ width: 540, height: 230, borderRadius: '3%' }}/>
            
                    <Carousel.Caption> 
                        <h1> {project.name} </h1> 
                        <p> {project.description} </p> 
                        <b> Trustworkere på projektet: </b>

                        <p>                        
                        { project.projectDescriptionUserList?.map(user => (
                            <div>
                                 {<img src={`data:image/jpeg;base64,${ getEmployee(user.useruuid) }`} style={{ width: 140, height: 130, borderRadius: '50%' }}  />}
                                <div> {user.description } </div>
                            </div>
                        )) }
                        </p>
                    </Carousel.Caption>
                    
                
            </Carousel.Item>
            ))}
            </Carousel>
            
            



            {projects?.map(project => (
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
            ))}
            

            
            </div>
        </Wrapper>
    )
}

export default FindProject









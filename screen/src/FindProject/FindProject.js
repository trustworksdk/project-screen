import axios from "axios";
import { useEffect, useState } from "react";
import { Card } from "react-bootstrap";
import { Wrapper } from "./FindProject.styles";



// test API: https://jsonplaceholder.typicode.com/todos/1

const Home = () => {

    const token = "eyJraWQiOiIvcHJpdmF0ZUtleS5wZW0iLCJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJpc3MiOiJodHRwczovL3RydXN0d29ya3MuZGsiLCJwcmVmZXJyZWRfdXNlcm5hbWUiOiJkaXR0ZS5oam9ydGgiLCJpYXQiOjE2NjM2OTIzOTcsImV4cCI6MTY2MzcyODM5NywiZ3JvdXBzIjpbIlVTRVIiXSwianRpIjoiZjkzM2UxZDgtZDBhMi00YmI3LWE4ZDItZmY1Y2YyMjk0NGQzIn0.H4Ml2DPcREtHZ0584100j4c2rQKc_W2BNf9HhSJy15NPdoJ-X13Buj3yzZMle5KBAVw4xb0C2ZU-9MWXbGpOQnRpM-SzUu_Etmciiwnrdh29kdM-gPKs6qLencuI4oh-Z-LPMsXEfOfCJc_x9yJkiYQi0i_6evEQty99hJ78j1NqSfcWvz5tGEzsGDCT6rzqhJsNKF81Kv8TWffRJbLT6heaPy1L8nY8i_PuaYCE0RS5XqYEA3vzsYbv-oMnE9SiyQfnY_mgktwfIs0qlZOmHpnhKNe0woT84-rcNbye_cIirzRglUGQJFv3g6ipYujaltdiCkEYcHb8SKhWgnnURLxSM_JQ5uyBDsT7P7UujismcazqbtbvFGXJ6_AKf64VO5_PuF-RZ4rJTYHH_i-p_qfPKBbBBJg9s7e4yzDArDdz6MrX1KBcUaenbjyHO7yLZOmhOrrpUbwF_INc36lv5qDvhrZHUWEGixfJ5iCWJu1PnBxk8pY_nfHzj-O-CMox3emvry-6A0IzAmvxT621GAebvYOY8DuZdl5d3qO73mHsmHYsesAyvZFlXgQDa5Xaq3yDwSoI4LiJFi9eaiiKigCqD98oz6wQ7Pm2arWQSfXopSOPjdRMeUXmbCvybe612ltwWGKjKeBasuP3ydz4gZvyiJRzid3XghGUq_hM2fc";

    const config = {
        headers: { Authorization: `Bearer ${token}`}
    };

    const [projects, setProjects] = useState();
    const [projectData, setProjectData] = useState();

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
            console.log("Projects:", projects)
        }).catch(error => {
            console.log(error)
        })
    }

    useEffect(() => {
        setProjectData(projects);
        // console.log("projectData:", projectData);
    }, [projects]);


    const getProjectName = () => {
        console.log("Project name:", projectData.name )
    }

    return (
        <Wrapper>
            <h1>This is home</h1>
            <h3>Test af API kald: </h3>
            <button onClick={printProjectsToConsole} >Print projects</button>
            {/* <button onClick={getProjectName} >Get project name</button> */}
            <br/>
            <br/>
            <h2> Projekter: </h2>
            <div>
                {projects?.map(project => (
                    <Card>
                        <Card.Body>
                            <Card.Title className="cardtitle" > {project.name} </Card.Title>
                            <Card.Text>
                                <div>  {project.description} </div>
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

export default Home
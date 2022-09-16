import axios from "axios";
import { useEffect, useState } from "react";
import { Card } from "react-bootstrap";
import { Wrapper } from "./FindProject.styles";



// test API: https://jsonplaceholder.typicode.com/todos/1

const Home = () => {

    const token = "eyJraWQiOiIvcHJpdmF0ZUtleS5wZW0iLCJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJpc3MiOiJodHRwczovL3RydXN0d29ya3MuZGsiLCJwcmVmZXJyZWRfdXNlcm5hbWUiOiJkaXR0ZS5oam9ydGgiLCJpYXQiOjE2NjMzMTg1NTEsImV4cCI6MTY2MzM1NDU1MSwiZ3JvdXBzIjpbIlVTRVIiXSwianRpIjoiNmE0ZTdkZDMtMGQ1ZC00OWUzLWEzNmYtODc5Njk1ZThjNTc1In0.GRP--WphWfJ4v7a_WjK5kw4Y_ZAdIl6waFTX61fwhS4Jj_OMxWXKLTZmeVxl8yAH1ZG5vNFWaB6wuV40YlWk3SBKamy3Zcx23XHk3nvB-wXlpQVskFCzLOigLjB7erslgUWUEbZvzFz-xAyroKY5zpxUi_P0yzOULmK4jIED4IAICH6VVrPDpLHTE2d_5oFFyUePKUfGTrL2KjT0Ka4r-m0uL0d0vmcvtq-gVcRuKEeev-NEKQoyP6jI9aO7vyOLIYe0jzpOizeKS5r8c6U7rYo04st1lzde7SzhNvSNftiBijdkZF2djaqlcrBtNbTkazqcxC0qYsMQ_-GwmZPk_ymjCvgKWskBN02H-gTPe7XNIiHJeiOf6qEQhH1NykgfpTQetfhxhKa4vKEOcUsux_MGwNbC3nRrQKVdZvj360oQ5nBRo8JHjiPh94L5SvZQYIXtlspQOEwDAIRZaQ7cBe94jRsFphUoXqTUckOFkpferVVz9zqZ54I3KkuR6HxmRsxd_HhFKz1KWDJylErYIHyzEK3ytg_QZb7HSh1iPEo3_NdJGaG1x4NXTPNcqGx-rg3_F8jzVnikiKkx7MVf3t-jT_x8Ldhc4yM-2iofciAKo2cpoVHBMs-C3ivvQy1NMkK0vi0fGe-t75gsDNhyiIEgBkqO8pDPitGNUyQ_RxM";

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
                            </Card.Text>
                        </Card.Body>
                    </Card>
                ))}
            </div>
        </Wrapper>
    )
}

export default Home
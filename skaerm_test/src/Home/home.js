import axios from "axios";
import { useEffect, useState } from "react";
import { Card } from "react-bootstrap";

// test API: https://jsonplaceholder.typicode.com/todos/1

const Home = () => {

    const token = "eyJraWQiOiIvcHJpdmF0ZUtleS5wZW0iLCJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJpc3MiOiJodHRwczovL3RydXN0d29ya3MuZGsiLCJwcmVmZXJyZWRfdXNlcm5hbWUiOiJkaXR0ZS5oam9ydGgiLCJpYXQiOjE2NjMyNTA2MTcsImV4cCI6MTY2MzI4NjYxNywiZ3JvdXBzIjpbIlVTRVIiXSwianRpIjoiNWU0ZDY0OWItOWMzNC00NGEyLTk3NWItZjA0ZGEzMjBiOGM1In0.nlwQEUKXRQ61N0WbQ_93R9DN33z8WAdKAfaAvotsfZmD8XeGfgeU1jQM5fIipBNBgWjw5WY_bHCmZGmu9JzGJNo66t6dDNdySrYAU5_87GKihlOn_cva2UsVqiFNFq57qWMAN31ultQk3dWLdxZJJrzFuLUUX2KiXQyS0hPtc2Vu2gZkfPjFVxbh75dUIs6o9mL8NQ23EzqcawZLUVk7ivod-35RKc26FK2TePqqoUKdTmH6xpAXk_GySKJa5HiBOWp48H-fryUn0U3DGC2UaWldfO3vSE6JUqNgV83qNOuUm7k4yQkyQ0JBm7EwMp-SktjSAniFr_FSvR-Zx_8txRN23gcAjnXt1zpSclQMtD-nDOoVcqc6l2F7GQtq2W34CkyV2zBCrvMeh5Jxdhcpzkf2CnhhezgzXsm12yJDtmwvFhOz40Cr83NPG0D5SKCz2ruzOohWJfTMABVRTQ08QVsi8p492_EvXQ4R2TSwgjY7gqraf86eBKVNMm8YRTwrOeItxk6k8ByF8dAW-JhIcAnXp8xbi65KWaerwdb-6CMVSxHw0WrGbC67ylD3LLsHb07R2zEaS3PHANo98KPPqlIwlaWZV1_9fCWbXQn_1E_Qgn-CXDZ1veaKcefpYoco64uihmYB2tgYFxm1jH0Hxc-rulVGv6NuRPKHPguhCLM";

    const [projects, setProjects] = useState();
    const [projectData, setProjectData] = useState();

    const config = {
        headers: { Authorization: `Bearer ${token}`}
    };

   
    const getProjects = () => {
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
        console.log(projectData);
    }, [projects]);


    const getProjectName = () => {
        console.log("Project name:", projectData.name )
    }

    return (
        <div>
            <h1>This is home</h1>
            <h3>Test af API kald: </h3>
            <button onClick={getProjects} >Get projects</button>
            <button onClick={getProjectName} >Get project name</button>
            <br/>
            <br/>
            <h2> Projekter: </h2>
            <div>
                {projects?.map(project => (
                    <Card>
                        <Card.Body>
                            <Card.Title> Projekt navn: {project.name} </Card.Title>
                            <Card.Text>
                                <div> Beskrivelse: {project.description} </div>
                            </Card.Text>
                        </Card.Body>
                    </Card>
                ))}
            </div>
        </div>
    )
}

export default Home
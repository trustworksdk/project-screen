import axios from "axios";
import { useEffect, useState } from "react";

// https://api.trustworks.dk/knowledge/projects



const Home = () => {

    const token = "xxx"

    const [project, setProject] = useState();
    const [projectData, setProjectData] = useState();

    const config = {
        headers: { Authorization: `Bearer ${token}`}
    };

   
    const getProjects = () => {
        axios.get('https://jsonplaceholder.typicode.com/todos/1', config)
        .then(response => {
            setProject(() => response.data)
            console.log("Projects:", project)
        }).catch(error => {
            console.log(error)
        })
    }

    useEffect(() => {
        setProjectData(project);
        // console.log(projectData);
    }, [project]);


    const getProjectName = () => {
        console.log("Project name:", project.title )
    }

    return (
        <div>
            <h1>This is home</h1>
            <h3>Test af API kald: </h3>
            <button onClick={getProjects} >Get projects</button>
            <button onClick={getProjectName} >Get project name</button>

        </div>
    )
}

export default Home
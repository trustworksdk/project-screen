//med
import React, { useEffect, useState } from "react";
import { Wrapper } from "./Home.styles";
import { useNavigate } from "react-router-dom";
import {ArrowIosBack} from  '@styled-icons/evaicons-solid/ArrowIosBack';
import { useToolContext } from "../Contexts/ToolContext";
//med - mindre indhold
import { Button, Carousel} from "react-bootstrap";
import { getProjects, getClientLogoUudid, getEmployeePhotoUuid} from "../Components/API";
import ProjectCard from "./ProjectCard";

const Home = () => {
    const navigate = useNavigate();
    const { setSelectedTool } = useToolContext();
    const [projects, setProjects] = useState([]);
    const [employees, setEmployeeList] = useState([]);
    const [clientList, setClientList] = useState([]);

    useEffect(() => {
        getProjects(setProjects);
    }, []);
  
    // Making list of employees consisting of id and photo file
    useEffect(() => {
        projects?.map(project => {
            project.projectDescriptionUserList?.map(user => {
                getEmployeePhotoUuid(user.useruuid)
                .then(photo =>{
                    setEmployeeList((prevList) => [...prevList, { id: user.useruuid, file: photo }]);
                })
                .catch(error => {
                    console.log(error)
                })
            })
        })
    }, [projects]);

    //Function to get the employee photo
    function getEmployeePhoto(props) {
        const foundItem = employees.find(item => item.id === props);
        return foundItem ? foundItem.file : null;
    }

    // Making list of clients consisting of id and photo file
    useEffect(() => {
        projects?.map(project => {
            getClientLogoUudid(project.clientuuid)
            .then(photo =>{
                setClientList(clientList => [...clientList, {id: project.clientuuid, file: photo}]);  
            })
            .catch(error => {
                console.log(error)
            })
        })
    }, [projects]);

    // Function to get the client logo
    function getClientLogo(props) {
        const foundItem = clientList.find(item => item.id === props);
        return foundItem ? foundItem.file : null;
    }

    const handleToolButtonClick = (tool) => {
        navigate("/findproject");
        setSelectedTool(tool);
    };

    return (
        <Wrapper className="body::before">
        <Button onClick={() => navigate("/findproject")}>
            <ArrowIosBack size="24" /> Flere projekter
        </Button>

        <Carousel className="carousell">
        {projects.map((project) => (
            <Carousel.Item key={project.id} interval={5000}>
            <ProjectCard
            project={project}
            onToolButtonClick={handleToolButtonClick}
            getClientLogo={getClientLogo}
            getEmployeePhoto={getEmployeePhoto}
            />
            </Carousel.Item>
        ))}
        </Carousel>
        </Wrapper>
    );
};

export default Home;
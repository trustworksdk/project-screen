import React, { useEffect, useState } from "react";
import { Carousel } from "react-bootstrap";
import { getProjects, getClientLogoUudid, getEmployeePhotoUuid } from "../Components/API";
import ProjectCardVer from "../Home/ProjectCardVer";

const ProjectCarousel = () => {
    const [projects, setProjects] = useState([]);
    const [employees, setEmployeeList] = useState([]);
    const [clientList, setClientList] = useState([]);

    useEffect(() => {
        getProjects(setProjects);
    }, []);

    useEffect(() => {
        projects?.map(project => {
            project.projectDescriptionUserList?.map(user => {
                getEmployeePhotoUuid(user.useruuid)
                .then(photo => {
                    setEmployeeList((prevList) => [...prevList, { id: user.useruuid, file: photo }]);
                })
                .catch(error => {
                    console.log(error)
                })
            })
        })
    }, [projects]);

    function getEmployeePhoto(props) {
        const foundItem = employees.find(item => item.id === props);
        return foundItem ? foundItem.file : null;
    }

    useEffect(() => {
        projects?.map(project => {
            getClientLogoUudid(project.clientuuid)
            .then(photo => {
                setClientList(clientList => [...clientList, {id: project.clientuuid, file: photo}]);  
            })
            .catch(error => {
                console.log(error)
            })
        })
    }, [projects]);

    function getClientLogo(props) {
        const foundItem = clientList.find(item => item.id === props);
        return foundItem ? foundItem.file : null;
    }

    return (
        <Carousel>
        {projects.map((project) => (
            <Carousel.Item key={project.id} interval={5000000}>
            <ProjectCardVer
            project={project}
            getClientLogo={getClientLogo}
            getEmployeePhoto={getEmployeePhoto}
            />
            </Carousel.Item>
        ))}
        </Carousel>
    );
};

export default ProjectCarousel;

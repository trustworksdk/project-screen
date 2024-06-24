import React, { useEffect, useState } from "react";
import { Wrapper } from "./Home.styles";
import { useNavigate } from "react-router-dom";
import {ArrowIosBack} from  '@styled-icons/evaicons-solid/ArrowIosBack';
import { useToolContext } from "../Contexts/ToolContext";
import { Button, Carousel} from "react-bootstrap";
import { getProjects, getClientLogoUudid, getEmployeePhotoUuid, getConsultants, getActiveConsultants} from "../Components/API";
import ProjectCard from "./ProjectCard";
import ProjectCardVer from "./ProjectCardVer";

const Home = () => {
    const navigate = useNavigate();
    const { setSelectedTool } = useToolContext();
    const [projects, setProjects] = useState([]);
    const [activeProjects, setActiveProjects] = useState([]);
    const [employees, setEmployeeList] = useState([]);
    const [consultants, setConsultants] = useState([]);
    const [clientList, setClientList] = useState([]);

    useEffect(() => {
        getProjects(setProjects);
        getConsultants(setConsultants);
    }, []);



    useEffect(() => {
        if (projects.length > 0 && consultants.length > 0){
            // Create a Set of active consultant IDs
            const activeConsultantIds = new Set(consultants.map(consultant => consultant.uuid));

            // Filter projects to only include active consultants in projectDescriptionUserList
            const filteredProjects = projects.map(project => ({
                ...project,
                projectDescriptionUserList: (project.projectDescriptionUserList || [])
                .filter(user => activeConsultantIds.has(user.useruuid))
            }));

            const today = new Date();
            const oneYearAgo = new Date(today.setFullYear(today.getFullYear()-3));
            
            const projectsActiveLastYear = filteredProjects.filter(project => {
                const inputDate = new Date(project.to);
                return inputDate > oneYearAgo;
            });
            setActiveProjects(projectsActiveLastYear);
        }
    }, [projects]);

    // Update employee list based on active consultants
    useEffect(() => {  
        if (activeProjects.length > 0) {
            console.log("Projekter: ", activeProjects);
        
            const fetchPhotosForActiveConsultants = async () => {
                const photoPromises = activeProjects.flatMap(project =>
                    project.projectDescriptionUserList.map(async user => {
                        try {
                            const photo = await getEmployeePhotoUuid(user.useruuid);
                            return { id: user.useruuid, file: photo };
                        } catch (error) {
                            console.error(`Error fetching photo for user ${user.useruuid}:`, error);
                            return null;
                        }
                    })
                );
    
                const newEmployeeList = (await Promise.all(photoPromises)).filter(Boolean);
                setEmployeeList(newEmployeeList);
            };

            fetchPhotosForActiveConsultants();
        }
    }, [activeProjects, consultants]);


    //Function to get the employee photo
    function getEmployeePhoto(props) {
        const foundItem = employees.find(item => item.id === props);
        return foundItem ? foundItem.file : null;
    }

    // Making list of clients consisting of id and photo file
    useEffect(() => {
        const fetchClientPhotos = async () => {
            const clientPhotoPromises = activeProjects.map(async project => {
                try {
                    const photo = await getClientLogoUudid(project.clientuuid);
                    return { id: project.clientuuid, file: photo };
                } catch (error) {
                    console.error(error);
                    return null;
                }
            });

            const newClientList = (await Promise.all(clientPhotoPromises)).filter(Boolean);
            setClientList(newClientList);
        };

        fetchClientPhotos();
    }, [activeProjects]);


    // Function to get the client logo
    function getClientLogo(props) {
        const foundItem = clientList.find(item => item.id === props);
        return foundItem ? foundItem.file : null;
    }

    const handleToolButtonClick = (tool) => {
        navigate("/findproject");
        setSelectedTool(tool);
    };

      

    //interval=5000=5sec
    return (
        <Wrapper className="body::before">
        {/* <Button onClick={() => navigate("/findproject")}>
            <ArrowIosBack size="24" /> Flere projekter
        </Button> */}

        <Carousel>
        {activeProjects.map((project, index) => (
            <Carousel.Item key={project.id} interval={50000}> 
            <ProjectCardVer
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
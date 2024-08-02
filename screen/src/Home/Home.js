import React, { useEffect, useState } from "react";
import { Wrapper } from "./Home.styles";
import { useNavigate } from "react-router-dom";
// import { ArrowIosBack } from '@styled-icons/evaicons-solid/ArrowIosBack';
import { useToolContext } from "../Contexts/ToolContext";
import { Carousel } from "react-bootstrap";
import { getProjects, getClientLogoUudid, getEmployeePhotoUuid, getConsultants, getEvents } from "../Components/API";
import HomeCard from "./HomeCard";
import Calendar from "../Components/Calendar";

const MILLISECONDS_PER_SLIDE = 10 * 1000 * 1000
const MILLISECONDS_PER_DAY = 60 * 60 * 24 * 1000
const REFRESH_RATE = MILLISECONDS_PER_DAY / 4

const Home = () => {
    const navigate = useNavigate();
    const { setSelectedTool } = useToolContext();
    const [projects, setProjects] = useState([]);
    const [activeProjects, setActiveProjects] = useState([]);
    const [employees, setEmployeeList] = useState([]);
    const [consultants, setConsultants] = useState([]);
    const [clientList, setClientList] = useState([]);
    const [events, setEvents] = useState([]);

    // setInterval(() => navigate(0), REFRESH_RATE)

    useEffect(() => {
        getProjects(setProjects);
        getEvents(setEvents)
        getConsultants(setConsultants);
    }, []);

    useEffect(() => {
        if (projects.length > 0 && consultants.length > 0) {
            // Create a Set of active consultant IDs
            const activeConsultantIds = new Set(consultants.map(consultant => consultant.uuid));

            // Filter projects to only include active consultants in projectDescriptionUserList
            const filteredProjects = projects.map(project => ({
                ...project,
                projectDescriptionUserList: (project.projectDescriptionUserList || [])
                    .filter(user => activeConsultantIds.has(user.useruuid))
            }));

            const today = new Date();
            const oneYearAgo = new Date(today.setFullYear(today.getFullYear() - 3));

            const projectsActiveLastYear = filteredProjects.filter(project => {
                const inputDate = new Date(project.to);
                return inputDate > oneYearAgo;
            });
            setActiveProjects(projectsActiveLastYear);
        }
    }, [projects, consultants]);

    // Update employee list based on active consultants
    useEffect(() => {
        if (activeProjects.length > 0) {
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
    }, [activeProjects]);

    //Function to get the employee photo
    function getEmployeePhoto(props) {
        const foundItem = employees.find(item => item.id === props);
        return foundItem ? foundItem.file : null;
    }

    // Making list of clients consisting of id and photo file
    useEffect(() => {
        if (activeProjects.length > 0) {
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

                // const newClientList = (await Promise.all(clientPhotoPromises)).filter(Boolean);
                const newClientList = (await Promise.all(clientPhotoPromises)).filter(Boolean);
                setClientList(newClientList);
            };
            fetchClientPhotos();
        }

    }, [activeProjects]);


    // Function to get the client logo
    function getClientLogo(props) {
        const foundItem = clientList.find(item => item.id === props);
        return foundItem ? foundItem.file : null;
    }

    const handleToolButtonClick = tool => {
        navigate("/findproject");
        setSelectedTool(tool);
    };
    //interval=5000=5sec
    return (
        <Wrapper className="body::before">
            <Carousel data-wrap>
                <Carousel.Item key="calendar" interval={MILLISECONDS_PER_SLIDE}>
                    <Calendar events={events} />
                </Carousel.Item>
                {activeProjects.map((project, index) => (
                    <Carousel.Item key={index} interval={MILLISECONDS_PER_SLIDE}>
                        <HomeCard
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

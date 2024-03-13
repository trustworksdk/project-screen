import { useNavigate } from "react-router-dom";
import { Button} from "react-bootstrap";


const Home = () => {
    const navigate = useNavigate();


    return (
     <Button onClick={() => navigate("/ProjectCarousel")}>
            Navigate to Project Carousel
        </Button>

    );
};

export default Home;
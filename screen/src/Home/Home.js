import { Button } from "react-bootstrap"
import { useNavigate } from "react-router-dom"

const Home = () => {

    const navigate = useNavigate();

    return (
        <div>
            <h1>This is Home</h1>
            <Button onClick={() => navigate('/findproject')} > Flere projekter</Button>
            
        </div>
    )
}

export default Home

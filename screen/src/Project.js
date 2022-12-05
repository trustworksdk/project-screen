import axios from "axios";
import { Base64 } from "js-base64";

function Project (props) {

    const name = props.name;
    const description = props.description;
    

    return (
        <div>
            <h1>My name is {name}</h1>
            <p>My description is {description} </p>
            <p>logo:</p>
            
        </div>
    );
}

export default Project
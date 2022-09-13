import axios from "axios"

const Home = () => {

    const getProjects = () => {
        axios.get('https://api.trustworks.dk/knowledge/projects')
        .then(response => {
            console.log(response)
        }).catch(error => {
            console.log(error)
        })
    }



    return (
        <div>
            <h1>This is home</h1>
            <h3>Test af API kald: </h3>
            <button onClick={getProjects} >Get projects</button>

        </div>
    )
}

export default Home
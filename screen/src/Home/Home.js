import { Button, Container, Row, Col, Card, CardGroup } from "react-bootstrap"
import { useNavigate } from "react-router-dom"
import { Wrapper } from "./Home.styles";
// import dsb from "../img/dsb2.png"
import kurt from "../img/kurt.png"



const Home = () => {

    const navigate = useNavigate();

    return (
        <Wrapper>
        <Button onClick={() => navigate('/findproject')} >  Flere projekter</Button>

            <div className="row">
            <CardGroup >
            <div className="col-sm-4">
                <Card  className="card bg-transparent border-0" >
                    {/* <Card.Img class="mx-auto " variant="top" src={dsb} width={170} height={150} ></Card.Img> */}
                    <Card.Body className="people">

                        <Card className="person card bg-transparent border-0">
                            <Card.Body>
                            <Card.Img className="person card image" src={kurt} style={{ width: 140, height: 120, borderRadius: '50%', float: "left" }}  ></Card.Img>
                            <div className="person card text bg-transparent border-0" > Løsningsarkitekt- Hjælper med tekniks projektledelse, konceptualisering samt roadmaps. </div>
                            </Card.Body>
                        </Card>
                        <Card className="person card bg-transparent border-0">
                            <Card.Body>
                            <Card.Img className="person card image" src={kurt} style={{ width: 140, height: 120, borderRadius: '50%', float: "left" }}  ></Card.Img>
                            <div className="person card text bg-transparent border-0" > Løsningsarkitekt- Hjælper med tekniks projektledelse, konceptualisering samt roadmaps. </div>
                            </Card.Body>
                        </Card>
                        <Card className="person card bg-transparent border-0">
                            <Card.Body>
                            <Card.Img className="person card image" src={kurt} style={{ width: 140, height: 120, borderRadius: '50%', float: "left" }}  ></Card.Img>
                            <div className="person card text bg-transparent border-0" > Løsningsarkitekt- Hjælper med tekniks projektledelse, konceptualisering samt roadmaps. </div>
                            </Card.Body>
                        </Card>  
                    </Card.Body>
                </Card>

                </div>
                <div className="col-sm-8">
                <Card className="card bg-transparent border-0">
                    <Card.Body>
                        <Card.Title> 
                            <h1> Projektnavn </h1> 
                            <h2> Periode for projektet </h2>
                        </Card.Title>
                        <br></br>
                        <Card.Text> Signaldriften. Kortlægningen er en viderebygning på den prototype Press og Stefanlavede tidligere i 2020. Projekter berørte følgende snitflader. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. </Card.Text>
                    </Card.Body>
                    <br></br>
                    <br></br>
                    <br></br>
                    
                    {/* <div className="row">
                        <div className="col-sm-6 ydelser">
                            <Card className="card bg-transparent border-0">
                                <Card.Body>
                                <Card.Title> <h2>Ydelser</h2> </Card.Title>
                                <Card.Text>    
                                    <Button className="ydelse-tool-knap" >Ydelse 1</Button> <Button className="ydelse-tool-knap" >Ydelse 2</Button>
                                </Card.Text>
                                </Card.Body>
                            </Card>
                        </div>
                        <div className="col-sm-6 tools">
                            <Card className="card bg-transparent border-0">
                                <Card.Body>
                                <Card.Title> <h2>Tools</h2> </Card.Title>
                                <Card.Text>
                                    <Button className="ydelse-tool-knap" >Tool 1 </Button> <Button className="ydelse-tool-knap" >Tool 2</Button>
                                </Card.Text>
                                </Card.Body>
                            </Card>
                            
                        </div>

                    </div> */}

                    <CardGroup className="ydelser-og-tools">
                        <Card className="ydelser2">
                            <Card.Title> <h2>Ydelser</h2> </Card.Title>
                            <Card.Text> hej </Card.Text>
                        </Card>
                        <Card>
                            <Card.Title> <h2>Tools</h2> </Card.Title>
                            <Card.Text> hej </Card.Text>
                        </Card>
                    </CardGroup>

       
                </Card>


                {/* <Row md={2} >
                        <Col className="col-md-6" >
                        <Card>
                            <Card.Title> <h2>Ydelser</h2> </Card.Title>
                            <Card.Text> hej </Card.Text>
                        </Card>
                        </Col>
                        <Col className="col-md-6">
                        <Card>
                            <Card.Title> <h2>Tools</h2> </Card.Title>
                            <Card.Text> hej </Card.Text>
                        </Card>
                        
                        </Col>
                </Row> */}
                </div>

            
            </CardGroup>
            </div>







        
       
        
        
  
 



        
            
            
            
        
        </Wrapper>
        
    )
}

export default Home

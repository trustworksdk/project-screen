import React from "react";
import { Card, CardGroup, Row, Col } from "react-bootstrap";
import { formatDate } from "../Components/utils";

const FindProjectCard = ({ project, getClientLogo }) => (
    <Wrapper>
    <ButtonGroup style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
    <div style={{ flex: 1, marginRight: '10px' }}>
        <Button className="back" onClick={() => navigate('/')}> <ArrowIosBack size="24" /> Tilbage til home </Button>
    </div>

    <div style={{ flex: 1, marginLeft: '10px' }}>
        <Button className="add" onClick={handleCreateProject}  > < Add size="24" /> Opret projekt </Button>
    </div>
    
    <div style={{ flex: 1, marginLeft: '10px' }}>
        <Button className="nulstil" onClick={() => removeFilters() } > < BackInTime size="24" /> Nulstil filtre </Button>
    </div>
    </ButtonGroup>

    <div className="project-container" >
        <Row className="dropdown.buttons" >
                    <Col className="dropdown-col d-flex justify-content-center" >
                    <DropdownButton title="Sorter efter"  size="lg" >
                        <Dropdown.Item onClick={(event) => handleSortChange(event)} >Alfabetisk på projektnavn</Dropdown.Item>
                        <Dropdown.Item onClick={(event) => handleSortChange(event)} >Alfabetisk på kundenavn</Dropdown.Item>
                        <Dropdown.Item> Senest til tidligst </Dropdown.Item>
                        <Dropdown.Item> Tidligst til senest </Dropdown.Item>
                    </DropdownButton>
                    </Col>

                    <Col className="dropdown-col d-flex justify-content-center" >
                    <DropdownButton title="Kunde" onSelect={handleSelectClient} size="lg" >
                            {uniqueProjectClients.map(client => (
                                <Dropdown.Item eventKey={client.clientuuid} > {client.clientName} </Dropdown.Item>
                            )) }
                    </DropdownButton>
                    </Col>

                    <Col className="dropdown-col d-flex justify-content-center" >
                    <DropdownButton title="Konsulent" onSelect={ handleSelectConsultant } size="lg" >
                        { uniqueProjectConsultants.map(consultant => (
                            <Dropdown.Item eventKey={consultant.useruuid} > {consultant.firstName} {consultant.lastName} </Dropdown.Item>
                        )) }
                    </DropdownButton>
                    </Col>
                    
                    <Col className="dropdown-col d-flex justify-content-center" >
                    <DropdownButton title="Kompetence" size="lg" onSelect={handleSelectOffering}  >
                        { uniqueProjectOfferings.map((offering) => (
                            <Dropdown.Item eventKey={offering} > {offering}  </Dropdown.Item>
                        )) }
                    </DropdownButton>
                    </Col>

                    <Col className="dropdown-col d-flex justify-content-center" >
                    <DropdownButton title="Tool" size="lg" onSelect={handleSelectTool } >
                        { uniqueProjectTools.map((tool) => (
                            <Dropdown.Item eventKey={tool} > {tool} </Dropdown.Item>
                        )) }
                    </DropdownButton>
                    </Col>
                </Row>
    </div>
    </Wrapper>
    
);

export default FindProjectCard;
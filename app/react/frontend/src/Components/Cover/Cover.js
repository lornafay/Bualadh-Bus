import './Cover.css';
import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import logo from './Logo.png';

export default function Cover() {
    return (
        <div id='cover'>
            <Container>
                <Row>
                    <Col>
                        <section id='cover-section'>
                            <h1>BUALADH BUS</h1>
                            <h2>Dublin Bus</h2>
                            <Button variant="primary" id='cover-button'>ABOUT THE APP</Button>
                        </section>
                    </Col>
                    <Col>
                        <section>
                            <img src={ logo } id='cover-img'></img>    
                        </section>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}
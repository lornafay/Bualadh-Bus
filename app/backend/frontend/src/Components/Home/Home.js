import './Home.css'
import React from 'react';
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

export default function Home() {
    return (
        <div id='home'>
            <Container>
                <Row>
                    <Col>
                        <section id='sec1'>
                            <p>Container</p>
                        </section>
                        <section id='sec2'>
                            <p>Current Weather</p>
                        </section>
                    </Col>
                    <Col>
                        <section id='sec3'>
                            <p>Map</p>
                        </section>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}
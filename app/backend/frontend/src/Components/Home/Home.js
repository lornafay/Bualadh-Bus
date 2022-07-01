import './Home.css';
import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSun } from '@fortawesome/free-solid-svg-icons';
import ToggleButton from './ArrivalDeparture';
import Maps from './Maps'

export default function Home() {
    return (
        <div id='home'>
            <Container>
                <Row>
                    <Col>
                        <section id='home-section1'>
                            <h3 id='home-section-title'>Container</h3>
                            <Form>
                                <ToggleButton />
                                <Form.Control placeholder="Your Location" id='home-section1-input'/>
                                <Form.Control placeholder="Destination" id='home-section1-input'/>
                            </Form> 
                            <p id='home-section1-error'>Error message</p>
                            <table>
                                <tr>
                                    <td id='home-section1-tableitem'>Font Size</td>
                                    <td id='home-section1-tableitem'>Audio</td>
                                    <td id='home-section1-tableitem'>Wheelchair Accessible</td>
                                </tr>
                            </table>
                            <p id='home-section1-content'>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                            <p id='home-section1-content'>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. </p>
                            <p id='home-section1-content'>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                        </section>
                        <section id='home-section2'>
                            <h3 id='home-section-title'>Current Weather</h3>
                            <table id='home-section2-table'>
                                <tr>
                                    <td>
                                        <FontAwesomeIcon icon={faSun} id='home-section2-weathericon'/>
                                    </td>
                                    <td>
                                        <tr>
                                            Sunny
                                        </tr>
                                        <tr>
                                            Current 16°
                                        </tr>
                                        <tr>
                                            H:17° L:13°
                                        </tr>
                                    </td>
                                </tr>
                            </table>
                        </section>
                    </Col>
                    <Col>
                        <section id='home-section3'>
                            <Maps />
                            <table id='map-table'>
                                <tr>
                                    <td id='map-table-col'>
                                        <Form.Check
                                            reverse
                                            label="Attractions"
                                            name="group"
                                            type='radio'
                                            id='map-check'
                                        />
                                    </td>
                                    <td id='map-table-col'>
                                        <Form.Check
                                            label="Activities"
                                            name="group"
                                            type='radio'
                                            id='map-check'
                                        />
                                    </td>
                                    <td id='map-table-col'>
                                        <Form.Check
                                            label="Accomodation"
                                            name="group"
                                            type='radio'
                                            id='map-check'
                                        />
                                    </td>
                                </tr>
                            </table>
                        </section>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}
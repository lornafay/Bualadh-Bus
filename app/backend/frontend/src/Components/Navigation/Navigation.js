import './Navigation.css'
import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container'
import Nav from 'react-bootstrap/Nav'


export default function Navigation() {
    return (
        <Navbar bg="backgroundcolor" variant="dark">
            <Container>
                <Navbar.Brand href="#home">BUALADH BUS</Navbar.Brand>
                <Nav className="me-auto">
                    <Nav.Link href="#home">HOME</Nav.Link>
                    <Nav.Link href="#faq">FAQ</Nav.Link>
                    <Nav.Link href="#timetables">TIMETABLES</Nav.Link>
                    <Nav.Link href="#aboutus">ABOUT US</Nav.Link>
                </Nav>
            </Container>
        </Navbar>
    )
}
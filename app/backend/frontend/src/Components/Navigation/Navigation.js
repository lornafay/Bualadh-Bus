import './Navigation.css'
import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container'
import Nav from 'react-bootstrap/Nav'


export default function Navigation() {
    return (
        <Navbar bg="backgroundcolor" variant="dark">
            <Container>
                <Navbar.Brand href="#home" id='nav-brand'>BUALADH BUS</Navbar.Brand>
                <Nav className="me-auto">
                    <Nav.Link href="#home" id='nav-item'>HOME</Nav.Link>
                    <Nav.Link href="#faq" id='nav-item'>FAQ</Nav.Link>
                    <Nav.Link href="#timetables" id='nav-item'>TIMETABLES</Nav.Link>
                    <Nav.Link href="#aboutus" id='nav-item'>ABOUT US</Nav.Link>
                </Nav>
            </Container>
        </Navbar>
    )
}
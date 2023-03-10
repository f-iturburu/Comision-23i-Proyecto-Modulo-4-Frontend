import React from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom';



const Navegation = () => {
    return (
        <div>
            <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="#home">Navbar</Navbar.Brand>
          <Nav className="me-auto">
            <Link className="nav.link">Home</Link>
            <Link className="nav.link">Survays</Link>
            <Link className="nav.link">Login</Link>
            <Link className="nav.link">Register</Link>
          </Nav>
        </Container>
      </Navbar>
        </div>
    );
};

export default Navegation;
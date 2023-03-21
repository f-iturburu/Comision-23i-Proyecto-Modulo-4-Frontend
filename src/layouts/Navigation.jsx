import React from 'react';
import { Button } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { NavLink } from 'react-router-dom';


const Navigation = () => {
    return (      
      <Navbar className='bg-light' expand="lg">
         <Container>
            <Navbar.Brand href="/">Home</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar.nav"/>
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav>
                <NavLink className="nav-link" to="/about">
                    Nosotros
                </NavLink>
                <NavLink className="nav-link" to="/surveys">
                    Encuestas
                </NavLink>
                <NavLink className="nav-link" to="/contact">
                    Contacto
                </NavLink>
                <Button>Sign in</Button>
              </Nav>    
            </Navbar.Collapse>               
         </Container>
       </Navbar>
    );
};

export default Navigation;
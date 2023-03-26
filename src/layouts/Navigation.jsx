import React from "react";
import { Button } from "react-bootstrap";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { NavLink } from "react-router-dom";
import { Link } from "react-router-dom";
import Login from "../views/login/login";

const Navigation =


  ({ loggedUser, setLoggedUser }) => {
    const logout = ()=>{
    localStorage.removeItem("user-token");
    setLoggedUser({})
    navigate("/")};

    return (
      <Navbar className="bg-light" expand="lg">
        <Container>
          <Navbar.Brand href="/">Home</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar.nav" />
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
              {loggedUser.token ? (
                <>
                  <Link
                    className="nav-link"
                    to="/admin">
                    Manage Surveys
                  </Link>
                  <Button variant="dark" onClick={logout}>
                    Log out
                  </Button>
                </>
              ) : (
                <Link className="nav-link" to="/login">
                  Login
                </Link>
               )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

    );
  };

export default Navigation;

import React from "react";
import { Button } from "react-bootstrap";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { NavLink } from "react-router-dom";
import { Link } from "react-router-dom";
import css from "./nav.css"
import { useNavigate } from "react-router-dom";
import {Image} from "react-bootstrap";

const Navigation = ({adminLoginKey,userLoginKey }) => {
  let token = JSON.parse(localStorage.getItem("user-token"))

  const navigate = useNavigate();
  
    const logout = ()=>{
    localStorage.removeItem("user-token");
    navigate("/")};

    return (
      <Navbar className="nav" expand="lg">
        <Container>
          <Navbar.Brand href="/" > <Image  fluid={true} style={{maxHeight:"5vh"}} src="/assets/img/Logo/Rolling Nav.png"/></Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar.nav" />
          <Navbar.Collapse>
            <Nav className="me-auto">
            <NavLink className="nav-link" to="/">
                Inicio
              </NavLink>
              <NavLink className="nav-link" to="/aboutUs">
                Sobre Nosotros
              </NavLink>
              <NavLink className="nav-link me-auto" to="/contactUs">
                Contacto
              </NavLink>
              {token?.token ? (
                <> 
                  <NavLink
                    className="nav-link"
                    to="/survey/newsurvey">
                    Crear encuesta
                  </NavLink>        
                  <NavLink
                    className="nav-link"
                    to="/mysurveys">
                    Mis encuestas
                  </NavLink>     
                
                </>
              ) : (
             null
               )}     
                 {token?.role == adminLoginKey ?  <>
                <NavLink className="nav-link" to="/admin">
                    Admin
                </NavLink>
               </> : <>
               </>}
            </Nav>
            <Nav>
           {token?.token? 
             <li className="nav-item dropdown ">
             <a className="nav-link dropdown-toggle fs-5 " href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
             <i className="bi bi-person-circle"></i>
             </a>
             <ul className="dropdown-menu dropdown-menu-end bg-dark">
               <li className="dropdownItem" ><NavLink className="nav-link dropdownItem text-light" to="/userdashboard">Opciones <i className="bi bi-gear"></i></NavLink></li>
               <li className="dropdownItem"> <NavLink className="nav-link dropdownItem text-light" onClick={logout}>Cerrar sesión <i className="bi bi-box-arrow-in-left"></i></NavLink></li>
             </ul>
           </li> : <>
           <NavLink className="nav-link" to="/login"><Button variant="outline-primary sign-in-button">Ingresar <i className="bi bi-box-arrow-in-right"></i></Button></NavLink>     
           <NavLink className="nav-link" to="/signup"><Button variant="primary sign-up-button">Registrase <i className="bi bi-clipboard2-data-fill"></i></Button></NavLink>     
           </>}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

    );
  };

export default Navigation;

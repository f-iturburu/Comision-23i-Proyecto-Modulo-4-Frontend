import React from "react";
import { Button } from "react-bootstrap";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { NavLink } from "react-router-dom";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const Navigation = ({adminLoginKey,userLoginKey }) => {
  let token = JSON.parse(localStorage.getItem("user-token"))

  const navigate = useNavigate();
  
    const logout = ()=>{
    localStorage.removeItem("user-token");
    navigate("/")};

    return (
      <Navbar className="bg-light" expand="lg">
        <Container>
          <Navbar.Brand href="/" >Home</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar.nav" />
          <Navbar.Collapse>
            <Nav className="me-auto">
              <NavLink className="nav-link" to="/about">
                Sobre Nosotros
              </NavLink>
              <NavLink className="nav-link me-auto" to="/contact">
                Contacto
              </NavLink>
              {token?.role == adminLoginKey ?  <>
                <NavLink className="nav-link" to="/adminpanel">
                    Admin
                </NavLink>
               </> : <>
               </>}
              {token?.token ? (
                <> 
                  <NavLink
                    className="nav-link"
                    to="/admin">
                    Mis encuestas
                  </NavLink>            
                </>
              ) : (
             null
               )}       
            </Nav>

            <Nav>
           {token?.token? 
             <li class="nav-item dropdown ">
             <a class="nav-link dropdown-toggle fs-5 " href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
             <i class="bi bi-person-circle"></i>
             </a>
             <ul class="dropdown-menu dropdown-menu-end">
               <li ><Link className="nav-link" to="/userdashboard">Opciones</Link></li>
               <li> <NavLink className="nav-link" onClick={logout}>Cerrar sesión <i class="bi bi-box-arrow-in-left"></i></NavLink></li>
             </ul>
           </li> : <NavLink className="nav-link" to="/login">Ingresar <i class="bi bi-box-arrow-in-right"></i></NavLink>}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

    );
  };

export default Navigation;

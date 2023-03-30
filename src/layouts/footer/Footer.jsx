import React from "react";
import { NavLink } from "react-router-dom";

import "./FooterStyles.css";


const Footer = () => {
  return (
    <>
      <div className="footer">
        <div className="top">
          <div>
            <h1>Rolling Surveys</h1>
            <p>Creando datos, simplificando tus decisiones</p>
          </div>
          <div>
            <a href="https://facebook.com/">
              <i className="fa-brands fa-facebook-square"></i>
            </a>
            <a href="https://instagram.com/">
              <i className="fa-brands fa-instagram-square"></i>
            </a>
            <a href="https://www.linkedin.com/">
              <i className="fa-brands fa-linkedin "></i>
            </a>
            <a href="https://twitter.com/?lang=es">
              <i className="fa-brands fa-twitter-square"></i>
            </a>
          </div>
        </div>

        <div className="bottom">
          <div>
            <h4 className="text-uppercase fw-bold mb-4">Encuestas</h4>
            <NavLink className="nav-link" to="/mysurveys">
                Mis Encuestas
            </NavLink>
            <NavLink className="nav-link" to="/mysurveys">
                Mis Encuestas
            </NavLink>
            <NavLink className="nav-link" to="/mysurveys">
                Mis Encuestas
            </NavLink>
          </div>
          <div>
            <h4 className="text-uppercase fw-bold mb-4">Community</h4>
            <NavLink className="nav-link" to="/home">
                Inicio
            </NavLink>
            <NavLink className="nav-link" to="/about">
                Sobre Nosotros
            </NavLink>
            <NavLink className="nav-link me-auto" to="/contact">
                Contacto
            </NavLink>
          </div>
          <div>
            <h4 className="text-uppercase fw-bold mb-4">Ayuda</h4>
            <a href="*">Terms of Service</a>
            <a href="*">Privacy Policy</a>
            <a href="*">License</a>
          </div>
          <div>
            <h4 className="text-uppercase fw-bold mb-4">Contáctenos</h4>
              <p><i className="fas fa-envelope me-3"></i>rollingsurveys@gmail.com</p>
              <p><i className="fas fa-phone me-3"></i> 011 0303 456</p>
              <p><i className="fas fa-home me-3"></i> Av. Presidente Julio A. Roca 609, CABA</p>
          </div>
        </div>
        <hr/>
        <div className="bg-red py-4">
        <p className="m-0 fs-5 text-center">
          Rolling Surveys. All rights reserved &copy;
        </p>
      </div>
      </div>
    </>
  );
};

export default Footer;

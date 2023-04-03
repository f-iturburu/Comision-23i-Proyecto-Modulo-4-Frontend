import React from "react";
import { NavLink } from "react-router-dom";
import css from "./FooterStyles.css"


const Footer = () => {
  return (
    <footer class="bg-black">
      <div class="container mt-5">
        <div class="row pb-1 text-white">
          <div class="col-12 text-center p-4 py-2">
            <div class="d-flex justify-content-center">
              <div class="w-100 d-flex justify-content-center">
                <div class="py-5 py-md-2 mx-3">
                  <NavLink className="h5 text-secondary text-decoration-none "
                    to="https://www.instagram.com/"
                    target="_blank">
                    
                  <i class="fa-brands fa-instagram fa-2x"></i>
                  </NavLink>    
                </div>
                <div class="py-5 py-md-2 mx-3">
                  <NavLink
                  className="h5 text-secondary text-decoration-none "
                  to="https://www.facebook.com/"
                  target="_blank"
                  >
                  <i class="fa-brands fa-facebook-f fa-2x"></i>

                  </NavLink>
                </div>
                <div class="py-5 py-md-2 mx-3">
                  <NavLink
                   className="h5 text-secondary text-decoration-none"
                   to="https://twitter.com"
                   target="_blank">

                  <i class="fa-brands fa-twitter fa-2x"></i>
                  </NavLink>
                </div>
                <div class="py-5 py-md-2 mx-3">
                <NavLink
                 className="h5 text-secondary text-decoration-none  color-transparent"
                 to="https://www.youtube.com/"
                 target="_blank">
                 <i class="fa-brands fa-youtube fa-2x"></i>
                </NavLink>  
                </div>
              </div>
            </div>
          </div>
          <div class="col-12 col-md-4 p-4 py-2 text-center">
            <NavLink to="/">
              <img
                src="/assets/img/Logo/RollingBlancofooter.png"
                alt="Logo de RollingSurveys"
                className="img-fluid logoFooter"
              />
            </NavLink>
          </div>

          <div class="col-12 col-md-4 py-3 text-center text-md-start">
            <div class="mb-1">
              <div class="mb-1">
                <NavLink
                className="text-secondary text-start text-decoration-none itemFooter"
                to="/aboutUs">
                Sobre nosotros
                </NavLink>
              </div>
              <div class="mb-1">
                <NavLink
                 className="text-secondary text-decoration-none itemFooter"
                 to="/contactUs"
                >
                Contacto
                </NavLink>
              </div>
              <div class="mb-1">
                <NavLink
                className="text-secondary text-decoration-none itemFooter"
                to="/help"
                >
                     Centro de ayuda
                </NavLink>
              </div>
            </div>
          </div>
          <div class="col-12 col-md-4 py-3 text-center text-md-start">
            <div class="mb-1">
              <div class="mb-1">
                <NavLink
                 className="text-secondary text-decoration-none itemFooter"
                 to="/privacyPolicy"
                >
                Politica de privacidad
                </NavLink>
              </div>
              <div class="mb-1">
                <NavLink
                 className="text-secondary text-decoration-none itemFooter"
                 to="/cookiesPolicy"
                >
                    Preferencias de cookies
                </NavLink>
              </div>
              <div class="mb-1">
                <NavLink
                 className="text-secondary text-decoration-none itemFooter"
                 to="/legal"
                >
                Avisos legales
                </NavLink>
              </div>
            </div>
          </div>
          <div class="col-12 pt-2 border-top border-2">
            <p class="text-white text-center">
              &copy; 2023 <b>Rolling Surveys</b> - Todos los Derechos
              Reservados.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

import React from "react";
import { Image, Row, Col } from "react-bootstrap";
import Wave from "react-wavify";
import AboutUSCard from "./components/aboutUsCard";
import { Container } from "react-bootstrap";

const AboutUs = () => {
  const us = [
    {
      name: "Leonardo Del Brio",
      description: "Fullstack Developer",
      avatar: "/public/assets/img/icons/icon2.png",
      linkedin: "https://www.linkedin.com/in/leodelbrio/",
      github: "https://github.com/leodelbrio",
    },
    {
      name: "Francisco Iturburu",
      description: "Fullstack Developer",
      avatar: "/public/assets/img/icons/icon1.png",
      linkedin: "https://www.linkedin.com/in/francisco-iturburu/",
      github: "https://github.com/f-iturburu",
    },
    {
      name: "Lucas Ibañez",
      description: "Fullstack Developer",
      avatar: "/public/assets/img/icons/icon3.png",
      linkedin: "https://www.linkedin.com/in/lucas-iba%C3%B1ez-644756106",
      github: "https://github.com/Lucasi17",
    },
  ];

  const CardComponents = us.map((i) => (
    <AboutUSCard
      key={i.name}
      name={i.name}
      description={i.description}
      avatar={i.avatar}
      linkedin={i.linkedin}
      github={i.github}
    />
  ));

  return (
    <div>
      <div className="bannerContainer">
        <Image
          className="mb-2 mt-2"
          style={{ maxHeight: "12vh" }}
          fluid={true}
          src="/public/assets/img/About us/sobre nosotros negro.png"
        />
      </div>
      <Wave
        fill="#7531f9"
        style={{ transform: "rotateX(180deg)" }}
        paused={false}
        options={{
          height: 15,
          amplitude: 50,
          speed: 0.15,
          points: 5,
        }}
      />
      ;
      <Container>
        <h5 className="text-light mb-4 glass-bg p-4" style={{textAlign:"justify"}}>
          Somos un grupo de tres jovenes estudiantes de desarrollo web que
          decidimos crear Rolling Surveys, una plataforma de encuestas donde lo que prime sea la transparencia.
          
        Juntos, estamos
          comprometidos con la meta de ofrecerle al usuario una experiencia 
          accesible y confiable. Nos enorgullece
          trabajar en un proyecto que puede ayudar a la comunidad a tomar
          decisiones informadas y a los usuarios a expresar sus opiniones de
          manera clara y efectiva. ¡Gracias por ser parte de nuestra historia!
        </h5>
        <Row className="d-flex flex-row justify-content-center">
          {CardComponents}
        </Row>
      </Container>
    </div>
  );
};

export default AboutUs;

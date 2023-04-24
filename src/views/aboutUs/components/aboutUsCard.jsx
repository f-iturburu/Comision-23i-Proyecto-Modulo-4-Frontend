import { Image } from "react-bootstrap";
import { Link } from "react-router-dom";
import { Col } from "react-bootstrap";
import css from "./aboutUsCard.css";

function AboutUSCard({ name, description, avatar, linkedin, github }) {
  return (
    <Col className="mb-5" md={4}>
      <div className="glass-bg w-100 text-light about-us-card h-100 ">
        <div className="text-center">
          <Image className="p-3 about-us-image" fluid={true} src={avatar} />
        </div>
        <div>
          <h3 className="text-center fw-bold">{name}</h3>
          <h5 className="ms-4 fw-normal text-center">{description}</h5>
        </div>
        <div className="d-flex justify-content-center">
          <div className="border-bottom w-75 mb-3"></div>
        </div>
        <div className="d-flex justify-content-around pb-3">
          <Link to={github} target="_blank">
            <i className="fa-brands fa-2x fa-github"></i>
          </Link>
          <Link to={linkedin} target="_blank">
            <i className="fa-brands fa-2x fa-linkedin-in"></i>
          </Link>
        </div>
      </div>
    </Col>
  );
}

export default AboutUSCard;

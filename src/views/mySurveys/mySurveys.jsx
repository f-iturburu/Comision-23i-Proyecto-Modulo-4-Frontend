import { useState } from "react";
import SurveysTable from "./components/MySurveysTable";
import { Button } from "antd";
import { Link } from "react-router-dom";
import Wave from "react-wavify";
import { Image } from "react-bootstrap";

function MySurveys({ URL, token }) {
  return (
    <>
      <div className="bannerContainer">
        <Image
          className="mb-2 mt-2"
          style={{ maxHeight: "12vh" }}
          fluid={true}
          src="/public/assets/img/My surveys/mis encuestas negro.png"
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
      <div className="container mt-4">
        <div className="d-flex">
          <Link
            className="text-decoration-none text-dark ms-auto mb-2"
            to={"/survey/newsurvey"}
          >
            {" "}
            <Button className="" variant="primary">
              {" "}
              Añadir nueva encuesta
            </Button>
          </Link>
        </div>
        <SurveysTable URL={URL} token={token} />
      </div>
    </>
  );
}

export default MySurveys;

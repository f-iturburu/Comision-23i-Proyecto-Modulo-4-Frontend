import React from "react";
import Wave from "react-wavify";
import { Image } from "react-bootstrap";
const Error404 = () => {
  return (
    <div>
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
      <div className="text-center">
        <Image
          style={{ maxHeight: "75vh" }}
          fluid={true}
          src="/assets/img/404/404.png"
        />
      </div>
    </div>
  );
};

export default Error404;

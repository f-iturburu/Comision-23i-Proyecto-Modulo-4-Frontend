import { Button } from "antd";
import ChangeUsernameComponent from "./changeUsername";
import ChangePasswordComponent from "./changePassword";
import { useEffect, useState } from "react";
import { Row, Col } from "react-bootstrap";
import MyInfo from "./myInfo";
import Wave from "react-wavify";
import {Image} from "react-bootstrap";
import css from './userDashboard.css'

function UserDashboard({ URL, token }) {
  const [currentComponent, setCurrentComponent] = useState(
    <MyInfo URL={URL} token={token} />
  );

  return <div className="user-dashboard">
           <div className='bannerContainer'>
         <Image
    className="mb-2 mt-2"
     style={{maxHeight:'12vh'}}
      fluid={true}
      src="/assets/img/Panel de opciones/panel de opciones negro.png"
    />
    </div>
    <Wave  fill='#7531f9'
        style={{transform:'rotateX(180deg)'}}
       paused={false} options={{
        height: 15,
    amplitude: 50,
    speed: 0.15,
    points: 5,}} />

    <div className="mt-4 container glass-bg p-5">
      <Row>
        <Col md={4}>
          <div className="d-flex flex-column text-center container">
            <Button
            className="my-2 btn-dashboard"
              variant="primary"
              onClick={() =>
                setCurrentComponent(
                    <MyInfo URL={URL} token={token} />
                )
              }
            >
              Mi información
            </Button>
            <Button
            className="my-2 btn-dashboard"
              variant="primary"
              onClick={() =>
                setCurrentComponent(
                  <ChangeUsernameComponent URL={URL} token={token} />
                )
              }
            >
              Cambiar nombre de usuario
            </Button>
            <Button
            className="my-2 btn-dashboard"
              variant="primary"
              onClick={() =>
                setCurrentComponent(
                  <ChangePasswordComponent URL={URL} token={token} />
                )
              }
            >
              Cambiar contraseña
            </Button>
          </div>
        </Col>
        <Col md={8}>
          <div className="mt-2 container">{currentComponent}</div>
        </Col>
      </Row>
    </div>
  </div>
}

export default UserDashboard;

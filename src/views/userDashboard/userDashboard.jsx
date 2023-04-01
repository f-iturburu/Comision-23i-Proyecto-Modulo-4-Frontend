import { Button } from "antd";
import ChangeUsernameComponent from "./changeUsername";
import ChangePasswordComponent from "./changePassword";
import { useEffect, useState } from "react";
import { Row, Col } from "react-bootstrap";
import MyInfo from "./myInfo";

function UserDashboard({ URL, token }) {
  const [currentComponent, setCurrentComponent] = useState(
    <MyInfo URL={URL} token={token} />
  );

  return (
    <div className="mt-4 container" style={{ minHeight: "80vh" }}>
      <Row>
        <Col md={4}>
          <div className="d-flex flex-column text-center container">
            <Button
            className="my-2"
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
            className="my-2"
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
            className="my-2"
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
  );
}

export default UserDashboard;

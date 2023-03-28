import React from "react";
import { useState } from "react";
import { Alert, Container, Form } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "antd";
import AlertDismissible from "../../layouts/alert";
import Swal from "sweetalert2";
import axios from "axios";

function Login ({ URL }) {
  const [inputs, setInputs] = useState({});
  const [errorMessage, setErrorMessage] = useState('');
  const [loginLoading, setLoginLoading] = useState(false)

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs((values) => ({ ...values, [name]: value }));
  };

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage()
    //! VALIDAR TODO
    try {
      setLoginLoading(true)
      const res = await axios.post(`${URL}/login`,{
       user: inputs.email,
       password: inputs.password,
      })

      if (res.status === 200) {
        Swal.fire("", "Has ingresado correctamente.", "success");
        const data = res.data; 
        localStorage.setItem("user-token", JSON.stringify(data));
        setTimeout(()=>{
          window.location.href='/'
        }, 1000 )
      }
    } catch (error){ 
      setLoginLoading(false)
      setErrorMessage(<AlertDismissible message={'Lo sentimos, ha ocurrido un error, intente de nuevo mas tarde.'} state={true}/>)
    }
  };

  return (
    <div>
      <Container className="py-5">
        <h1>Login</h1>
        <hr />
        <Form className="my-5">
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email*</Form.Label>
            <Form.Control
              type="text"
              placeholder="pepe@gmail.com"
              name="email"
              value={inputs.email || ""}
              onChange={(e) => handleChange(e)}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password*</Form.Label>
            <Form.Control
              type="password"
              placeholder="Ej: Ingrese su password"
              name="password"
              value={inputs.password || ""}
              onChange={(e) => handleChange(e)}
            />
          </Form.Group>
          <Link
            to="/register"
            className="btn-primary text-decoration-none"
          >
            No tienes una cuenta? Registrate!
          </Link>
          <div className="text-center">
          {/* <Button variant="primary" onClick={handleSubmit}>Ingresar</Button> */}

          <Button
              type="primary"
              loading={loginLoading}
              onClick={handleSubmit}
            >
              Ingresar
            </Button>
          </div>
        </Form>
          {errorMessage}
      </Container>
    </div>
  );
};

export default Login

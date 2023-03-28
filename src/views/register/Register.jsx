import React, { useState } from "react";
import { Alert, Container, Form } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import axios from "axios";

const Register = ({}) => {
  const [inputs, setInputs] = useState({});
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const URL = import.meta.env.VITE_APP_API_ROLLINGSURVEYS_USER;
  

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs((values) => ({ ...values, [name]: value }));
  };
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newUser = {
      username: inputs.name,
      email: inputs.email,
      password: inputs.password,
    };
    try {
      const res = await fetch(`https://comision-23i-proyecto-modulo-4-backend.onrender.com/user`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(newUser),
          });
      

      if (res.status === 201) {
        Swal.fire("Created!", "Your user has been created.", "success");
        const data = await res.json(); 
        localStorage.setItem("user-token", JSON.stringify(data));
        navigate("/login");
      }
    } catch (error) {
      setError(true);
      error.response.data?.message && setErrorMessage(error.response.data?.message)
    }
  };

  return (
    <div>
      <Container className="py-5">
        <h1>Register</h1>
        <hr />
        <Form className="my-5" onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="formBasicUserName">
            <Form.Label>User name*</Form.Label>
            <Form.Control
              type="text"
              placeholder="Ej: Pepe"
              name="name"
              value={inputs.name || ""}
              onChange={(e) => handleChange(e)}
            />
          </Form.Group>
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
          <Link to="/login" className="btn-primary text-decoration-none">
            Back to login
          </Link>
          <div className="text-center">
            <button className="btn-yellow">Send</button>
          </div>
        </Form>
        {error ? (
        <Alert variant="danger" onClick={() => setError(false)} dismissible>
          {errorMessage}
        </Alert>
      ) : null}
      </Container>
    </div>
  );
};

export default Register;

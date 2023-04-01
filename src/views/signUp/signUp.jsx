import React, { useRef, useState } from "react";
import { Alert, Container, Form } from "react-bootstrap";
import { Button } from "antd";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import axios from "axios";

const SignUp = ({URL}) => {
  const [loading, setLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState('');
  const usernameRef = useRef()
  const emailRef = useRef()
  const passwordRef = useRef()

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs((values) => ({ ...values, [name]: value }));
  };

  function AlertDismissible({message}) {
    const [show, setShow] = useState(true);
  
    if (show) {
      return (
        <Alert variant="danger" className="p-1 m-1" onClose={() => setShow(false)} dismissible>
          <p>
           {message}
          </p>
        </Alert>
      );
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true)
    const newUser = {
      username: usernameRef.current.value,
      email: emailRef.current.value,
      password: passwordRef.current.value,
    };
    try {  
      const res = await axios.post(`${URL}/user`,newUser)      
      if (res.status === 201) {
        Swal.fire("","Tu usuario ha sido creado exitosamente", "success");
        const data = await res.data; 
        localStorage.setItem("user-token", JSON.stringify(data));
        setTimeout(()=>{
          window.location.href='/'
        }, 1000 )
      }
    } catch (error) {
      setLoading(false)
      setErrorMessage()
      if (error.response?.status == 400) {
        let message = error.response.data.message
        setErrorMessage(<AlertDismissible message={message}/>)
      }else if (error.response?.status == 401){
        let message = error.response.data.message.details[0].message 
        setErrorMessage(<AlertDismissible message={message}/>)
      }else{
        setErrorMessage(<AlertDismissible message={'Lo sentimos, ha ocurrido un error. Vuelve a intentarlo mas tarde.'}/>)
      }
    }
  };

  return (
    <div>
      <Container className="py-5">
        <h1>Sign up</h1>
        <hr />
        <Form className="my-5" onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="formBasicUserName">
            <Form.Label>Nombre de usuario</Form.Label>
            <Form.Control
              type="text"
              placeholder="Ingrese su nombre de usuario"
              name="name"
              required
              maxLength='15'
              ref = {usernameRef}
            />
             <Form.Text muted>
             Su nombre de usuario debe ser de entre 6 y 15 caracteres, no se permiten espacios ni caracteres especiales.
             </Form.Text>
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="text"
              placeholder="Ingrese su direccion de correo electrónico"
              name="email"
              required
              maxLength='30'
              ref={emailRef}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Contraseña</Form.Label>
            <Form.Control
              type="password"
              placeholder="Ingrese su contraseña"
              name="password"
              required
              maxLength='30'
              ref={passwordRef}
            />
              <Form.Text muted>
              Su contraseña debe ser de un minimo de 8 caracteres y debe contener al menos una letra y un número.
             </Form.Text>
          </Form.Group>
          <Button
              type="primary"
              loading={loading}
              onClick={handleSubmit}
            >
              Registrarme
            </Button>
        </Form>
        {errorMessage}
      </Container>
    </div>
  );
};

export default SignUp;
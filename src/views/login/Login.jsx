import React, { useRef } from "react";
import { useState } from "react";
import { Alert, Container, Form } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "antd";
import AlertDismissible from "../../layouts/alert";
import Swal from "sweetalert2";
import Wave from "react-wavify";
import {Image} from "react-bootstrap";
import axios from "axios";

function Login ({ URL }) {
  const userInput = useRef()
  const passwordInput = useRef()
  const [errorMessage, setErrorMessage] = useState('');
  const [loginLoading, setLoginLoading] = useState(false)

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage()
    try {
      setLoginLoading(true)
      const res = await axios.post(`${URL}/login`,{
       user: userInput.current.value,
       password: passwordInput.current.value,
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
      if (error.response.status == 418) {
        setLoginLoading(false)
        return setErrorMessage(<AlertDismissible message={'Has ingresado un nombre de usuario o email incorrecto.'} state={true}/>)
      } else if(error.response.status == 400){
        setLoginLoading(false)
        return setErrorMessage(<AlertDismissible message={'Has ingresado una contraseña invalida.'} state={true}/>)
      }else{
        setLoginLoading(false)
        return setErrorMessage(<AlertDismissible message={'Lo sentimos, ha ocurrido un error, intente de nuevo mas tarde.'} state={true}/>)
      }
  
    }
  };

  return <>
      <div className='bannerContainer'>
<Image
className="mb-2 mt-2"
style={{maxHeight:'12vh'}}
fluid={true}
src="/src/assets/img/Sign in/ingreso negro.png"
/>
</div>
<Wave  fill='#7531f9'
style={{transform:'rotateX(180deg)'}}
paused={false} options={{
height: 15,
amplitude: 50,
speed: 0.15,
points: 5,}} />;
    <div>
      <Container className="p-4 glass-bg">
        <Form className="my-5">
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label className="text-light">Email o nombre de usuario</Form.Label>
            <Form.Control
              type="text"
              placeholder="Ingrese su nombre de usuario o dirección de correo electrónico"
              name="email"
              ref= {userInput}
              required
              maxLength='30'
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label className="text-light">Contraseña</Form.Label>
            <Form.Control
              type="password"
              placeholder="Ingrese su contraseña"
              name="password"
              required
              maxLength='30'
              ref= {passwordInput}   
            />
          </Form.Group>
          <Link
            to="/register"
            className="btn-primary text-decoration-none"
          >
            No tienes una cuenta? Registrate!
          </Link>
          <div className="text-center">

<div className="text-end">
          <Button
              type="primary"
              loading={loginLoading}
              onClick={handleSubmit}
            >
              Ingresar
            </Button>
  
</div>
          </div>
        </Form>
          {errorMessage}
      </Container>
    </div>
  </>
};

export default Login

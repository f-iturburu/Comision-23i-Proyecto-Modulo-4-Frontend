import React, { useRef, useState } from "react";
import { Alert, Container, Form } from "react-bootstrap";
import {Button} from "react-bootstrap";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import Wave from "react-wavify";
import {Image} from "react-bootstrap";
import axios from "axios";
import InputGroup from 'react-bootstrap/InputGroup';
import {Spinner} from "react-bootstrap";

const SignUp = ({URL}) => {
  const [loading, setLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState('');
  const [showPassword,setShowPassword] = useState(false)
  const usernameRef = useRef()
  const emailRef = useRef()
  const passwordRef = useRef()
  const repeatPasswordRef= useRef()

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

    if (passwordRef.current.value !== repeatPasswordRef.current.value) {
      return setErrorMessage(<AlertDismissible message={'Las contraseñas no coinciden.'}/>)
    }

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
   <div className='bannerContainer'>
<Image
className="mb-2 mt-2"
style={{maxHeight:'12vh'}}
fluid={true}
src="/assets/img/Sign up/register negro.png"
/>
</div>
<Wave  fill='#7531f9'
style={{transform:'rotateX(180deg)'}}
paused={false} options={{
height: 15,
amplitude: 50,
speed: 0.15,
points: 5,}} />;
      <Container className="p-4 glass-bg">
        <Form className="my-5" onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="formBasicUserName">
            <Form.Label className="text-light">Nombre de usuario</Form.Label>
            <Form.Control
              type="text"
              placeholder="Ingrese su nombre de usuario"
              name="name"
              required
              maxLength='15'
              ref = {usernameRef}
            />
             <Form.Text className="text-light" muted>
             Su nombre de usuario debe ser de entre 6 y 15 caracteres, no se permiten espacios ni caracteres especiales.
             </Form.Text>
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label className="text-light">Email</Form.Label>
            <Form.Control
              type="text"
              placeholder="Ingrese su direccion de correo electrónico"
              name="email"
              required
              maxLength='30'
              ref={emailRef}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label className="text-light">Contraseña</Form.Label>
            <InputGroup>
            <Form.Control
              type={showPassword? 'text': 'password'}
              placeholder="Ingrese su contraseña"
              name="password"
              required
              maxLength='30'
              ref={passwordRef}
            />
              <Button className="sign-in-button" variant="outline-primary" onClick={()=> setShowPassword(!showPassword)}> {showPassword? <i class="bi bi-eye-slash"></i> : <i class="bi bi-eye"></i>}  </Button>
               </InputGroup>
              <Form.Text className="text-light" muted>
              Su contraseña debe ser de un minimo de 8 caracteres y debe contener al menos una letra y un número.
             </Form.Text>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label className="text-light">Vuelva a ingresar su contraseña</Form.Label>
            <Form.Control
              autocomplete="new-password"
              type={showPassword? 'text': 'password'}
              placeholder="Ingrese su contraseña"
              name="password"
              required
              maxLength='30'
              onPaste={(e)=>e.preventDefault()}
              ref={repeatPasswordRef}
            />
          </Form.Group>
          <div className="d-flex">
          <Button
          className="ms-auto"
              type="primary"
              onClick={handleSubmit}
            >
              {!loading? 'Registrarme':  <>
              <Spinner
              className="me-2"
          as="span"
          animation="border"
          size="sm"
          role="status"
          aria-hidden="true"
        /> 
            Registrarme
              </> 
        }
            </Button>
            
          </div>
        </Form>
        {errorMessage}
      </Container>
    </div>
  );
};

export default SignUp;

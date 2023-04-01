import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import { Button } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import axios from 'axios';

const ChangeUsernameComponent = ({URL,token}) =>{
     const [showPassword, setShowPassword] = useState(false)



        return <div className='d-flex flex-column mx-auto'>
             <Form.Label className='mb-0'>Nombre de usuario</Form.Label>
         <InputGroup className="mb-3">
        <Form.Control
          placeholder="Username"
          aria-label="Username"
        />
      </InputGroup>
      <Form.Label className='mb-0'>Contraseña</Form.Label>
      <InputGroup className="mb-3">
        <Form.Control
          placeholder="Ingrese su contraseña"
          type={showPassword? 'text': 'password'}
          aria-label="password"
        />
        <Button  variant="outline-primary" onClick={()=> setShowPassword(!showPassword)}> {showPassword? <i class="bi bi-eye-slash"></i> : <i class="bi bi-eye"></i>}  </Button>
      </InputGroup>
        </div>
}

export default ChangeUsernameComponent
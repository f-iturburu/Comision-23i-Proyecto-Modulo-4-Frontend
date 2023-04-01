import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import { Button } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useRef } from 'react';
import AlertDismissible from '../../layouts/alert';
import {Spinner} from 'react-bootstrap';

const ChangeUsernameComponent = ({URL,token}) =>{
     const [showPassword, setShowPassword] = useState(false)
     const [loading,setLoading] = useState(false)
     const [disabled,setDisabled] = useState(false)
     const [errorMessage, setErrorMessage] = useState()
     const currentUsername = useRef()
     const newUsername = useRef()
     const password = useRef()
     const ADMIN_LOGIN_KEY = import.meta.env.VITE_ADMIN_LOGIN_KEY;

     useEffect(()=>{
        if (token.role == ADMIN_LOGIN_KEY) {
            setDisabled(true)
        }
    },[])

    const submitHandler = async () =>{
        setLoading(true)
        setErrorMessage()
        if (currentUsername.current.value == newUsername.current.value) {
            setLoading(false)
            return setErrorMessage(<AlertDismissible message={'Ingrese un nombre de usuario distinto'} state={true}/>)
        }
        const resBody = {
            username: newUsername.current.value,
            password: password.current.value
        }
        try {
            const res = await axios.patch(`${URL}/user/username`,resBody,{
                headers:{
                    'auth-token': token.token
                }
            })

            if (res.status == 200) {
                setLoading(false)
                Swal.fire("", "Has cambiado tu nombre de usuario exitosamente.", "success");
            }
        } catch (error) {
            setLoading(false)
            setErrorMessage()
            if (error.response?.status == 400) {
              let message = error.response.data.message
              setErrorMessage(<AlertDismissible message={message} state={true}/>)
            }else if (error.response?.status == 401){
              let message = error.response.data.error
              setErrorMessage(<AlertDismissible message={message} state={true}/>)
            }else{
              setErrorMessage(<AlertDismissible message={'Lo sentimos, ha ocurrido un error. Vuelve a intentarlo mas tarde.'} state={true}/>)
            }
        }
    }

        return <div className='d-flex flex-column mx-auto'>
             <Form.Label className='mb-0'>Nombre de usuario actual</Form.Label>
         <InputGroup className="mb-3">
        <Form.Control
        disabled={disabled}
        required 
        maxLength={15}
          ref={currentUsername}
          placeholder={disabled? 'El administrador no puede cambiar sus credenciales': "Ingrese su nombre de usuario actual"}
       type='text'
        />
      </InputGroup>
         <Form.Label className='mb-0'>Nuevo nombre de usuario</Form.Label>
         <Form.Text muted>
             Su nombre de usuario debe ser de entre 6 y 15 caracteres, no se permiten espacios ni caracteres especiales.
             </Form.Text>
      <InputGroup className="mb-3">
        <Form.Control
        disabled={disabled}
           required 
           maxLength={15}
        ref={newUsername}
          placeholder={disabled? 'El administrador no puede cambiar sus credenciales': "Ingrese su nuevo nombre de usuario"}
          type='text'
        />
      </InputGroup>
      <Form.Label className='mb-0'>Contraseña</Form.Label>
      <InputGroup className="mb-3">
        <Form.Control
        disabled={disabled}
           required 
           maxLength={30}
        ref={password}
        placeholder={disabled? 'El administrador no puede cambiar sus credenciales': "Ingrese su contraseña"}
          type={showPassword? 'text': 'password'}
          aria-label="password"
        />
        <Button disabled={disabled} variant="outline-primary" onClick={()=> setShowPassword(!showPassword)}> {showPassword? <i class="bi bi-eye-slash"></i> : <i class="bi bi-eye"></i>}  </Button>
      </InputGroup>
      <div className='mt-2 mb-2'>
        {errorMessage}
     </div>
      <div className='mt-2 w-100 d-flex justify-content-center'>
         <Button disabled={disabled ? disabled : loading} onClick={submitHandler}>{loading? <><Spinner animation="border" size="sm"/> Guardar cambios</>: "Guardar cambios" }</Button>
     </div>
        </div>
}

export default ChangeUsernameComponent
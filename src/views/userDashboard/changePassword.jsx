import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import { Button } from 'react-bootstrap';
import { useEffect, useRef, useState } from 'react';
import AlertDismissible from '../../layouts/alert';
import axios from 'axios';
import {Spinner} from 'react-bootstrap';
import Swal from 'sweetalert2';

const ChangePasswordComponent = ({URL,token}) =>{  
    const [showOldPassword, setShowOldPassword] = useState(false)
    const [showNewPassword, setShowNewPassword] = useState(false)
    const [errorMessage, setErrorMessage] = useState()
    const [loading,setLoading] = useState(false)
    const [disabled,setDisabled] = useState(false)
    const oldPassword = useRef()
    const newPassword = useRef()
    const newPassword2 = useRef()
    const ADMIN_LOGIN_KEY = import.meta.env.VITE_ADMIN_LOGIN_KEY;

    useEffect(()=>{
        if (token.role == ADMIN_LOGIN_KEY) {
            setDisabled(true)
        }
    },[])

    const submitHandler = async () =>{
        setLoading(true)
        setErrorMessage()
        if (newPassword.current.value !== newPassword2.current.value) {
            setLoading(false)
            return setErrorMessage(<AlertDismissible message={'Las contraseñas no coinciden'} state={true}/>)
        }
        const resBody = {
            oldPassword: oldPassword.current.value,
            newPassword: newPassword.current.value
        }
        try {
            const res = await axios.patch(`${URL}/user/password`,resBody,{
                headers:{
                    'auth-token': token.token
                }
            })

            if (res.status == 200) {
                setLoading(false)
                Swal.fire("", "Has cambiado tu contraseña exitosamente.", "success");
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
        <Form.Label>Contraseña actual</Form.Label>
     <InputGroup className="mb-3">
       <Form.Control
       disabled={disabled}
       required 
       maxLength={30}
       ref={oldPassword}
         placeholder={disabled? 'El administrador no puede cambiar sus credenciales': "Ingrese su contraseña actual"}
         type={showOldPassword? 'text':'password'}
         aria-label="password"
       />
       <Button disabled={disabled} variant="outline-primary" onClick={()=> setShowOldPassword(!showOldPassword)}> {showOldPassword? <i class="bi bi-eye-slash"></i> : <i class="bi bi-eye"></i>}  </Button>
     </InputGroup>
       <Form.Label className='mb-0'>Nueva contraseña</Form.Label>
       <Form.Text className='mb-1 mt-0' muted>
              Su nueva contraseña debe ser de un minimo de 8 caracteres y debe contener al menos una letra y un número.
             </Form.Text>
     <InputGroup className="mb-3">
       <Form.Control
        disabled={disabled}
        required 
        maxLength={30}
        ref={newPassword}
         placeholder={disabled? 'El administrador no puede cambiar sus credenciales':"Ingrese su nueva contraseña"}
         type={showNewPassword? 'text': 'password'}
         aria-label="password"
       />
       <Button  disabled={disabled}  variant="outline-primary" onClick={()=> setShowNewPassword(!showNewPassword)}> {showNewPassword? <i class="bi bi-eye-slash"></i> : <i class="bi bi-eye"></i>}  </Button>
    
     </InputGroup>
     
     <InputGroup className="mb-3">
       <Form.Control
        disabled={disabled}
        required 
        maxLength={30}
        ref={newPassword2}
         placeholder={disabled? 'El administrador no puede cambiar sus credenciales':"Vuelva a ingresar su nueva contraseña"}
         type='password'
         aria-label="password"
       />
     </InputGroup>
     <div className='mt-2 mb-2'>
        {errorMessage}
     </div>
     <div className='mt-2 w-100 d-flex justify-content-center'>
         <Button disabled={disabled ? disabled : loading} onClick={submitHandler}>{loading? <><Spinner animation="border" size="sm"/> Guardar cambios</>: "Guardar cambios" }</Button>
     </div>
       </div>

}

export default ChangePasswordComponent
import { Image } from "react-bootstrap";
import Wave from "react-wavify";
import Form from "antd/es/form/Form";
import Container from "react-bootstrap";
import {Input} from "react-bootstrap"

function RecoverPassword (){
return <>
<div className='bannerContainer'>
<Image
className="mb-2 mt-2"
style={{maxHeight:'12vh'}}
fluid={true}
src="/assets/img/recover password/Recuperar contraseña negro.png"
/>
</div>
<Wave  fill='#7531f9'
style={{transform:'rotateX(180deg)'}}
paused={false} options={{
height: 15,
amplitude: 50,
speed: 0.15,
points: 5,}} />

<Container>
<Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label className="text-light">Contraseña</Form.Label>
            <InputGroup>
            <Form.Control
               type={showPassword? 'text': 'password'}
              placeholder="Ingrese su contraseña"
              name="password"
              required
              maxLength='30'
              ref= {passwordInput}   
            />
            <Button className="sign-in-button" variant="outline-primary" onClick={()=> setShowPassword(!showPassword)}> {showPassword? <i class="bi bi-eye-slash"></i> : <i class="bi bi-eye"></i>}  </Button>
            </InputGroup>
          </Form.Group>

</Container>
<div style={{minHeight:'40vh'}}>
    
</div>
</>
}

export default RecoverPassword
import { Image } from "react-bootstrap";
import Wave from "react-wavify";
import InputGroup from 'react-bootstrap/InputGroup';
import  { Container, Form } from "react-bootstrap";


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
<Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label className="text-light">Email o nombre de usuario</Form.Label>
            <Form.Control
              type="text"
              placeholder="Ingrese su nombre de usuario o dirección de correo electrónico"
              name="email"
              required
              maxLength='30'
            />
          </Form.Group>
</Container>
<div style={{minHeight:'40vh'}}>
    
</div>
</>
}

export default RecoverPassword
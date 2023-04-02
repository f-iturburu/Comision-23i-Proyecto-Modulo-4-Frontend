import React, { useRef } from "react";
import emailjs from "@emailjs/browser";
import Swal from "sweetalert2";
import "./Contact.css";
import Wave from "react-wavify";
import { Image } from "react-bootstrap";
import { message } from "antd";

function Contact() {
    const form = useRef();
    

    const sendEmail = (e) => {
    e.preventDefault();
    
    emailjs.sendForm('service_secvbq8', 'template_w6p8k8f', form.current, 'pl2-nozHn9aOAaVT_')
      .then((result) => {
          console.log(result.text);
          console.log("mensaje enviado");
      }, (error) => {
          console.log(error.text);
      });
  };
   
   return (
    <div >
      <div className='bannerContainer'>
         <Image
    className="mb-2 mt-2"
     style={{maxHeight:'12vh'}}
      fluid={true}
      src="/src/assets/img/Contacto/contacto negro.png"
    />
    </div>
    <Wave  fill='#7531f9'
        style={{transform:'rotateX(180deg)'}}
       paused={false} options={{
        height: 15,
    amplitude: 50,
    speed: 0.15,
    points: 5,}} />;   
     
      <div className="form-container">
        <form ref={form} onSubmit={sendEmail}>
          <input placeholder="Nombre" type="text" name="nombre" />
          <input placeholder="Email" type="email" name="email"/>
          <textarea placeholder="Mensaje" name="mensaje" rows="4"></textarea>
          <button>Enviar</button>
        </form>
      </div>      
    </div>
   
  );
}

  

export default Contact;
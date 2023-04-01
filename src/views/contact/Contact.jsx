import React, { useRef } from "react";
import emailjs from "@emailjs/browser";
import Swal from "sweetalert2";
import "./Contact.css";
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
    <>
      <div className="form-container">
        <h1>Envianos un mensaje</h1>
        <form ref={form} onSubmit={sendEmail}>
          <input placeholder="Nombre" type="text" name="nombre" />
          <input placeholder="Email" type="email" name="email"/>
          <textarea placeholder="Mensaje" name="mensaje" rows="4"></textarea>
          <button>Enviar</button>
        </form>
      </div>
    </>
  );
}

  

export default Contact;
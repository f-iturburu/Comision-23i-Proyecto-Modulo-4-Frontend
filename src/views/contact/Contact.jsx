import React, { useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import "./Contact.css";
import Wave from "react-wavify";
import { Image } from "react-bootstrap";
import { message } from "antd";
import Swal from "sweetalert2";
import { Container, Form } from "react-bootstrap";
import { Alert } from "react-bootstrap";
import { Button } from "antd";

function AlertDismissible({ message }) {
  const [show, setShow] = useState(true);
  if (show) {
    return (
      <Alert
        variant="danger"
        className="p-1 m-1"
        onClose={() => setShow(false)}
        dismissible
      >
        <p>{message}</p>
      </Alert>
    );
  }
}

function Contact() {
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState();
  const nameRef = useRef()
  const emailRef = useRef()
 const refForm = useRef()


  const sendEmail = (e) => {
    e.preventDefault();

    const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    setLoading(true);

    if (nameRef.current.value.length == 0) {
      return setErrorMessage(
        <AlertDismissible message={"Debes ingresar un nombre"} />
      );
    } else if (!emailRegex.test(emailRef.current.value)) {
      return setErrorMessage(
        <AlertDismissible message={"El email ingresado es invalido"} />
      );
    } else if (message.length == 0) {
      return setErrorMessage(
        <AlertDismissible message={"Debes ingresar un mensaje"} />
      );
    }

    emailjs.sendForm(
        "service_secvbq8",
        "template_w6p8k8f",
        refForm.current,
        "pl2-nozHn9aOAaVT_"
      )
      .then(
        (result) => {
          Swal.fire("", "Su mensaje ha sido enviado correctamente.", "success");
          setLoading(false)
        },
        (error) => {
          setLoading(false)
          Swal.fire(
            "",
            "Lo sentimos, ha ocurrido un error. Intente de nuevo mas tarde.",
            "error"
          );
        }
      );
  };

  return (
    <>
      <div className="bannerContainer">
        <Image
          className="mb-2 mt-2"
          style={{ maxHeight: "12vh" }}
          fluid={true}
          src="/public/assets/img/Contacto/contacto negro.png"
        />
      </div>
      <Wave
        fill="#7531f9"
        style={{ transform: "rotateX(180deg)" }}
        paused={false}
        options={{
          height: 15,
          amplitude: 50,
          speed: 0.15,
          points: 5,
        }}
      />
      ;
      <Container className="glass-bg p-5">
        <Form ref={refForm} onSubmit={sendEmail}>
          <Form.Group className="mb-3">
            <Form.Label className="text-light">Nombre</Form.Label>
            <Form.Control
              type="text"
              placeholder="Ingrese su nombre"
              name="name"
              ref = {nameRef}
              required
              maxLength="30"
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label className="text-light">Email</Form.Label>
            <Form.Control
              type="email"
              placeholder="Ingrese su dirección de correo electrónico"
              name="email"
              ref = {emailRef}
              required
              maxLength="30"
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label className="text-light">Ingrese su mensaje</Form.Label>
            <Form.Control
              name="message"
              as="textarea"
              required
              maxLength="500"
              rows={3}
              onChange={(e) => setMessage(e.target.value)}
            />
            <div className="d-flex">
              <p className="ms-auto mt-3 text-light">{500 - message?.length}</p>
            </div>
          </Form.Group>
          <div className="d-flex">
            <Button loading={loading} type="primary" htmlType="submit" variant="primary" className="ms-auto">
              Enviar mensaje
            </Button>
          </div>
        </Form>
        <div className="mt-3">{errorMessage}</div>
      </Container>
    </>
  );
}

export default Contact;

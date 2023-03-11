import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import { Container } from "react-bootstrap";
import CreateQuestionSurvey from "./CreateQuestionSurvey";
import Stack from 'react-bootstrap/Stack';

function CreateNewSurvey() {
  const [data,setData] = useState([])
  console.log(data);
  const [show, setShow] = useState(false);
  const [questions, setQuestions] = useState([<CreateQuestionSurvey setData={setData} data={data}/>])
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  
  return (
    <>
      <div className="w-100 d-flex justify-content-center mt-5">
        <Button variant="primary" onClick={handleShow}>
          Agregar nueva encuesta
        </Button>
      </div>

      <Modal
        size="lg"
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
        scrollable={true}
      >
        <Modal.Header closeButton>
          <Modal.Title>Agregar nueva encuesta</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Container>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Ingrese el titulo de su encuesta</Form.Label>
              <Form.Control type="text" placeholder="" />
              <Form.Text muted>
        Your password must be 8-20 characters long, contain letters and numbers,
        and must not contain spaces, special characters, or emoji.
             </Form.Text>
            </Form.Group>
          </Form>
         {questions}

        

  
          </Container>
        </Modal.Body>
        <Modal.Footer>
        <Stack className="container-fluid" direction="horizontal" gap={3}>
         <Button variant="outline-success" onClick={()=> setQuestions((prevArray) => [...prevArray,<CreateQuestionSurvey setData={setData} data={data}/>,])}>Añadir pregunta</Button>
         <h5 className="my-auto me-auto">{questions.length}/15</h5>
          <Button className="ms-auto" variant="secondary" onClick={handleClose}>
            Cerrar
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Guardar
          </Button>
      </Stack>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default CreateNewSurvey;

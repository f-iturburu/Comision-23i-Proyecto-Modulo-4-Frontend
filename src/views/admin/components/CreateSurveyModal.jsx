import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import { Container } from "react-bootstrap";
import CreateQuestionSurvey from "./CreateQuestionSurvey";
import Stack from 'react-bootstrap/Stack';
import { DatePicker, Space } from 'antd';


function CreateNewSurvey() {
  const [data,setData] = useState([])
  console.log('data', data);
  const [show, setShow] = useState(false);
  const [questions, setQuestions] = useState([<CreateQuestionSurvey setData={setData} data={data}/>])
  const handleClose = () => {
    setShow(false)
    setData([])
    setQuestions([<CreateQuestionSurvey setData={setData} data={data}/>])
  };
  const handleShow = () => setShow(true);
const [dateBool, setDateBool] = useState(false)
const stateHandler = ()=> setDateBool(!dateBool)

  const onChange = (date, dateString) => {
    console.log(dateString);
  };
  
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
          <Stack className="container-fluid p-0 pb-2 mb-2 border-bottom " direction="horizontal" >
          <Form.Check 
          onChange={stateHandler}
    type="checkbox"
    key={'checkBoxFecha'}
    name="checboxSelectors"
    label={"Ingresar fecha de finalizacion de encuesta"}
  />
  
       {dateBool ? <Space  direction="vertical" className="ms-auto" >
    <DatePicker style={{minWidth:"8vw"}} onChange={onChange} placeholder={'Ingrese una fecha'}/>
       </Space>  :  <div> </div> }
            </Stack>
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
         <h5 className="my-auto me-auto">{questions.length}/7</h5>
          <Button className="ms-auto" variant="secondary" onClick={handleClose}>
            Cerrar
          </Button>
          <Button variant="primary">
            Guardar
          </Button>
      </Stack>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default CreateNewSurvey;

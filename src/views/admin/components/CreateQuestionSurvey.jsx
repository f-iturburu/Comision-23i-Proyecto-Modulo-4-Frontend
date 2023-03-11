import { Form, FormCheck } from "react-bootstrap";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { useEffect, useRef, useState } from "react";
import Button from "react-bootstrap/Button";



function SingleOptionComponent({data, setData})  {
  const optionsRef = useRef([]);
  const [radioSelectors, setRadioSelectors] = useState([]);
  const mappedRadioSelectors = radioSelectors.map((i) =>  <div className="d-flex "> 

    <Form.Check 
  type="radio"
  key={i}
  id="custom-switch"
  name="radioSelectors"
  label={i}
/>

<i className="bi bi-trash3 ms-auto" onClick={(e)=>{
    let elementToSearch = e.target.parentElement.textContent.toString()
    setRadioSelectors(radioSelectors.filter((i)=> i !== elementToSearch))
}
}></i>
  </div>)

  return (
    <Row className="mt-2">
      <Col xs={5}>
        <Form.Control
          ref={optionsRef}
          type="text"
          placeholder="Agregar opción"
        />
      </Col>
      <Col xs={1}>
        <Button onClick={() => setRadioSelectors((prevArray) => [...prevArray,optionsRef.current.value,])} variant="outline-primary">+</Button>
      </Col>
      
      <Col xs={12}>
  <Form className="mt-3">
     {mappedRadioSelectors}
  </Form>
      </Col>
    </Row>
  );
}

function MultipleOptionsComponent({data, setData}) {
    const optionsRef = useRef([]);
    const [radioSelectors, setRadioSelectors] = useState([]);
    const mappedRadioSelectors = radioSelectors.map((i) =>  <div className="d-flex"> 
  
      <Form.Check 
    type="checkbox"
    key={i}
    id="custom-switch"
    name="radioSelectors"
    label={i}
  />
  
  <i className="bi bi-trash3 ms-auto" onClick={(e)=>{
      let elementToSearch = e.target.parentElement.textContent.toString()
      setRadioSelectors(radioSelectors.filter((i)=> i !== elementToSearch))
  }
  }></i>
    </div>)
  
    return (
      <Row className="mt-2">
        <Col xs={5}>
          <Form.Control
            ref={optionsRef}
            type="text"
            placeholder="Agregar opción"
          />
        </Col>
        <Col xs={1}>
          <Button onClick={() => setRadioSelectors((prevArray) => [...prevArray,optionsRef.current.value,])} variant="outline-primary">+</Button>
        </Col>
        
        <Col xs={12}>
    <Form className="mt-3">
       {mappedRadioSelectors}
    </Form>
        </Col>
      </Row>
    );
}

function TextComponent() {

return (
    <Row className="mt-2">
        <Col xs={6}>
        <Form.Control
                type="text"
                placeholder="Texto de respuesta"
              />    
        </Col>
        <Col xs={6}>
        </Col>
    </Row>
    )
}

function NumbersComponents() {
    return (
        <Row className="mt-2">
            <Col xs={6}>
            <Form.Control
                    type="number"
                    placeholder="Ingrese un valor númerico"
                  />    
            </Col>
            <Col xs={6}>
            </Col>
        </Row>
        )
}

function CreateQuestionSurvey({data, setData}) {
  const [questionType, setQuestionType] = useState("");
  const questionTypeString = useRef()
 const [question,setQuestion] = useState("")

 const componentHandler = (questionTypeString)=>{
  console.log(questionTypeString);
   switch (questionTypeString) {
    case "singleOption":
      setQuestionType(<SingleOptionComponent setData={setData} data={data}/>)
      break;
    case "multipleOptions":
      setQuestionType(<MultipleOptionsComponent setData={setData} data={data}/>)
      break;
    case "text":
      setQuestionType(<TextComponent setData={setData} data={data} />)
      break;
    case "numbers":
      setQuestionType(<NumbersComponents setData={setData} data={data}/>)
      break;
    default:
      break;
   }
 }

 useEffect(() =>{
  setData([...data ,{
    'question': question, 
    'type':questionTypeString.current?.value,
    }])
 },[question,questionTypeString])

// const handleData =()=>{
 
// }
// handleData()

  return (
    <Form className="border-top pt-3">
      <Form.Group className="mb-3">
        <Row>
          <Col>
            <Form.Control onChange={(e)=> setQuestion(e.target.value)} type="text" placeholder="Pregunta" />
          </Col>
          <Col>
            <Form.Select
            ref={questionTypeString}
              defaultValue={"default"}
              onChange={(e) => componentHandler(questionTypeString.current?.value)}
            >
              <option disabled hidden value="default">
                Selecciona el tipo de respuesta
              </option>
              <option value="singleOption">Una opción</option>
              <option value="multipleOptions">Varias opciones</option>
              <option value="text">Texto</option>
              <option value="numbers">Números</option>
            </Form.Select>
          </Col>
        </Row>
        {questionType}
      </Form.Group>
    </Form>
  );
}

export default CreateQuestionSurvey;

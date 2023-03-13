import { Form, FormCheck, Stack } from "react-bootstrap";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { useEffect, useRef, useState } from "react";
import Button from "react-bootstrap/Button";
import AlertDismissible from "../../../layouts/alert";



function CreateQuestionSurvey({data, setData}) {
 const [questionType, setQuestionType] = useState("");
 const questionTypeString = useRef()
 const [question,setQuestion] = useState("")
 const [questionAnswers, setQuestionAnswers] = useState()
 const [object, setObject] = useState({
    'question': '', 
    'type':'',
    'possibleAnswers' : '',
    'id': crypto.randomUUID()
 })

useEffect(() =>{
  const updatedObject = { ...object ,
        'question': question, 
        'type':questionTypeString.current?.value,
        'possibleAnswers' : questionAnswers,
        }

  setObject(updatedObject)

 },[question,questionAnswers,questionType,questionTypeString])

useEffect(()=>{
  setData(prevArray =>
    {
      const existingObjectIndex = prevArray.findIndex(obj => obj.id === object.id);
      if (existingObjectIndex === -1){
        return [...prevArray, object];
      } else {
        const updatedArray = [...prevArray];
        updatedArray[existingObjectIndex] = { ...prevArray[existingObjectIndex], ...object };
        return updatedArray;
      }
    });
 },[object])


const componentHandler = (questionTypeString)=>{
  switch (questionTypeString) {
   case "singleOption":
     setQuestionType(<SingleOptionComponent/>)
     break;
   case "multipleOptions":
     setQuestionType(<MultipleOptionsComponent />)
     break;
   case "text":
     setQuestionType(<TextComponent  />)
     break;
   case "numbers":
     setQuestionType(<NumbersComponents />)
     break;
   default:
     break;
  }
}

 const SingleOptionComponent =() => {
  const optionsRef = useRef([]);
  const [radioSelectors, setRadioSelectors] = useState([]);
  const [errorMessage , setErrorMessage] = useState()
  console.log('Radio Selectors' + '' + radioSelectors);

  useEffect(()=>{
    setQuestionAnswers(radioSelectors)
  },[radioSelectors])

  const optionsHandler = ()=>{
    setErrorMessage('')
    setRadioSelectors((prevArray) =>{
      const optionFound = prevArray.find((i) => i == optionsRef.current.value)
      if (optionsRef.current.value == '') {
        setErrorMessage(<AlertDismissible message={'La opcion ingresada es invalida'} state={true}/>)
        return [...prevArray]
      }else if(radioSelectors.length >= 5 ){
        setErrorMessage(<AlertDismissible message={'Has ingresado demasiadas opciones (máximo 5)'} state={true}  />)
        return [...prevArray]
      }else if (optionFound){ 
        setErrorMessage(<AlertDismissible  message={'Ya has ingresado esta opción'}state={true}/>)
        return [...prevArray]
      } else {
        return[...prevArray,optionsRef.current.value]
      }
    } )
  }
  
  const mappedRadioSelectors = radioSelectors.map((i) =><div className="d-flex "> 
    <Form.Check 
  type="radio"
  key={i}
  id="custom-switch"
  name="radioSelectors"
  label={i}
/>

<i key={i + "delete"} className="bi bi-trash3 ms-auto" onClick={(e)=>{
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
        <Button variant="outline-primary" onClick={optionsHandler}>+</Button>
      </Col>
      
      <Col xs={12}>
     {errorMessage}
  <Form key={data.length} className="mt-3">
     {mappedRadioSelectors}
  </Form>
      </Col>
    </Row>
  );
}

const MultipleOptionsComponent = () => {
    const optionsRef = useRef([]);
    const [checboxSelectors, setChecboxSelectors] = useState([]);

    useEffect(()=>{
      setQuestionAnswers(checboxSelectors)
    },[checboxSelectors])

    const mappedChecboxSelectors = checboxSelectors.map((i) =>  <div className="d-flex"> 
    
  
      <Form.Check 
    type="checkbox"
    key={i}
    name="checboxSelectors"
    label={i}
  />
  
  <i className="bi bi-trash3 ms-auto" onClick={(e)=>{
      let elementToSearch = e.target.parentElement.textContent.toString()
      setChecboxSelectors(checboxSelectors.filter((i)=> i !== elementToSearch))
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
          <Button onClick={() => setChecboxSelectors((prevArray) => [...prevArray,optionsRef.current.value,])} variant="outline-primary">+</Button>
        </Col>
        
        <Col xs={12}>
    <Form className="mt-3">
       {mappedChecboxSelectors}
    </Form>
        </Col>
      </Row>
    );
}

const TextComponent =() => {

  useEffect(()=>{
    setQuestionAnswers([])
  },[])

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

const NumbersComponents =() => {
  useEffect(()=>{
    setQuestionAnswers([])
  },[])

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

  return (
    <Stack>
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
      </Form.Group>
    </Form>
      {questionType}
    </Stack>
  );
}

export default CreateQuestionSurvey;

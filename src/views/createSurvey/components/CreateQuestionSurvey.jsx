import { Form, FormCheck, Stack } from "react-bootstrap";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { useEffect, useRef, useState } from "react";
import Button from "react-bootstrap/Button";
import AlertDismissible from "../../../layouts/alert";
import TooltipQuestionmark from "../../../layouts/tooltip";
import css from "./createSurvey.css"


function CreateQuestionSurvey({id, data, setData , setSurveyQuestions, showDeleteState}) {
 const [questionType, setQuestionType] = useState([]);
 const questionTypeString = useRef()
 const [question,setQuestion] = useState("")
 const [questionAnswers, setQuestionAnswers] = useState([])
 const [object, setObject] = useState({
    'question': '', 
    'type':'',
    'possibleAnswers' : [],
    'id': crypto.randomUUID(),
    'key': id
 })

useEffect(() =>{
  const updatedObject = { ...object ,
        'question': question.charAt(0).toUpperCase() + question.slice(1), 
        'type':questionTypeString.current?.value,
        'possibleAnswers' : questionAnswers,
        }

  setObject(updatedObject)
 },[question,questionAnswers,questionType,questionTypeString])

useEffect(()=>{
  setData(prevArray =>{
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

  useEffect(()=>{
    setQuestionAnswers(radioSelectors)
  },[radioSelectors])

  const optionsHandler = ()=>{
    setErrorMessage()
    const optionsRegex = /^[a-zA-Z0-9áéíóúÁÉÍÓÚñÑüÜ\(\)\.,;:¿¡?!\s]{1,30}$/u
    setRadioSelectors((prevArray) =>{
      const optionFound = prevArray.find((i) => i == optionsRef.current.value)
      if (!optionsRegex.test(optionsRef.current.value)) {
        setErrorMessage(<AlertDismissible message={'La opcion ingresada es invalida'} state={true}/>)
        return [...prevArray]
      }else if(radioSelectors.length >= 7 ){
        setErrorMessage(<AlertDismissible message={'Has ingresado demasiadas opciones (máximo 7)'} state={true}  />)
        return [...prevArray]
      }else if (optionFound){ 
        setErrorMessage(<AlertDismissible  message={'Ya has ingresado esta opción'}state={true}/>)
        return [...prevArray]
      } else {
        return[...prevArray,optionsRef.current.value.charAt(0).toUpperCase() + optionsRef.current.value.slice(1)]
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
    <Row className="mt-1">
        <Form.Text className="mb-2"  muted>
      El usuario podra seleccionar solo una de las opciones proporcionadas.
             </Form.Text>
      <Col xs={5}>
        <Form.Control
        required
         maxLength='30'
          ref={optionsRef}
          type="text"
          placeholder="Agregar opción"
        />
      </Col>
      <Col xs={1}>
      <TooltipQuestionmark  message={'La opcion debe tener entre 1 y 30 caracteres y no puede contener caracteres especiales.'} item={<i className="bi bi-question-circle"></i>}/>
      </Col>
      <Col xs={1}>
        <Button variant="outline-primary" onClick={optionsHandler}><i className="bi bi-plus-lg"></i></Button>
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
    const [errorMessage , setErrorMessage] = useState()
    const [checboxSelectors, setChecboxSelectors] = useState([]);
    useEffect(()=>{
      setQuestionAnswers(checboxSelectors)
    },[checboxSelectors])
    const optionsHandler = ()=>{
      setErrorMessage('')
      
      const optionsRegex = /^[a-zA-Z0-9áéíóúÁÉÍÓÚñÑüÜ\(\)\.,;:¿¡?!\s]{1,30}$/u
      setChecboxSelectors((prevArray) =>{
        const optionFound = prevArray.find((i) => i == optionsRef.current.value)
        if (!optionsRegex.test(optionsRef.current.value)) {
          setErrorMessage(<AlertDismissible message={'La opcion ingresada es invalida'} state={true}/>)
          return [...prevArray]
        }else if(checboxSelectors.length >= 7 ){
          setErrorMessage(<AlertDismissible message={'Has ingresado demasiadas opciones (máximo 7)'} state={true}  />)
          return [...prevArray]
        }else if (optionFound){ 
          setErrorMessage(<AlertDismissible  message={'Ya has ingresado esta opción'}state={true}/>)
          return [...prevArray]
        } else {
          return[...prevArray,optionsRef.current.value.charAt(0).toUpperCase() + optionsRef.current.value.slice(1)]
        }
      } )
    }


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
      <Row className="mt-1">
         <Form.Text className="mb-2"  muted>
      El usuario podra seleccionar una o mas de las opciones proporcionadas.
             </Form.Text>
        <Col xs={5}>
          <Form.Control
          required 
          maxLength='30'
            ref={optionsRef}
            type="text"
            placeholder="Agregar opción"
          />
        </Col>
        <Col xs={1}>
      <TooltipQuestionmark  message={'La opcion debe tener entre 1 y 30 caracteres y no puede contener caracteres especiales.'} item={<i className="bi bi-question-circle"></i>}/>
      </Col>
        <Col xs={1}>
          <Button onClick={optionsHandler} variant="outline-primary"><i className="bi bi-plus-lg"></i></Button>
        </Col>
        
        <Col xs={12}>
        {errorMessage}
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
    <Row className="mt-2 mb-3">
        <Col xs={6}>
        <Form.Control
                type="text"
                disabled
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
        <Row className="mt-2 mb-3">
            <Col xs={6}>
            <Form.Control
                    type="number"
                    placeholder="Ingrese un valor númerico"
                    disabled
                  />    
            </Col>
            <Col xs={6}>
            </Col>
        </Row>
        )
}

const deleteQuestionsHandler = () =>{
  setSurveyQuestions((prevArray) =>{
      let filteredSurveyQuestionsArray = prevArray.filter((i) => i.key !== id.toString() );
    return [...filteredSurveyQuestionsArray]
  })

  setData((prevArray) =>{
     let filteredData = prevArray.filter((i)=> i.key !== id)
     return [...filteredData]
  })
 }

  return (
    <Stack className=" create-survey">
    <Form className="border-top border-dark pt-3">
      <Form.Group className="mb-3">
        <Row>
          <Col xs={'5'}>
            <Form.Control onChange={(e)=>setQuestion(e.target.value)} required maxLength='80' type="text" placeholder="Pregunta" />
          </Col>
          <Col xs={'1'}>
          <TooltipQuestionmark message={'La pregunta debe ser de entre 1 y 80 caracteres, no puede contener caracteres.'} item={<i className="bi bi-question-circle"></i>}/>
          </Col>
          <Col xs={'5'}>
            <Form.Select
            ref={questionTypeString}
              defaultValue={"default"}
              onChange={(e) => componentHandler(questionTypeString.current?.value)}
            >
              <option disabled hidden value="default">
                Selecciona el tipo de respuesta
              </option>
              <option value="singleOption">Opción única</option>
              <option value="multipleOptions">Opción multiple</option>
              <option value="text">Texto</option>
              <option value="numbers">Números</option>
            </Form.Select>
          </Col>
          {showDeleteState? <Col xs={'1'}>
          <i className="bi bi-trash3 ms-auto" onClick={deleteQuestionsHandler}></i>
          </Col>: <div></div>}    
        </Row>
      </Form.Group>
    </Form>
      {questionType}
    </Stack>
  );
}

export default CreateQuestionSurvey;

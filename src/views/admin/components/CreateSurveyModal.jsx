import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import { Container } from "react-bootstrap";
import CreateQuestionSurvey from "./CreateQuestionSurvey";
import Stack from 'react-bootstrap/Stack';
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { DatePicker, Space } from 'antd';
import AlertDismissible from "../../../layouts/alert";
import todayDate from "../../../helpers/todayDate";
import compareDates from "../../../helpers/compareDates";
import TooltipQuestionmark from "../../../layouts/tooltip";
import Swal from 'sweetalert2'

function CreateNewSurvey() {
  const [category,setCategory] = useState()
  const [surveyTitle, setSurveyTitle] = useState('')
  const [surveyTitleErrorMessage, setSurveyTitleErrorMessage] = useState()
  const [data,setData] = useState([])
  const [show, setShow] = useState(false);
  const [keyCounter, setKeyCounter] = useState(1)
  const [SurveyQuestions, setSurveyQuestions] = useState([<CreateQuestionSurvey key={0} id={0} setData={setData} data={data} showDeleteState={false}/>])
  const [errorMessage , setErrorMessage] = useState()
const [dateBool, setDateBool] = useState(false)
const [date, setDate] = useState()
const [submitErrorMessage, setSubmitErrorMessage] = useState()
const [questionWithNoTypeErrorMessage, setQuestionWithNoTypeErrorMessage] = useState()
const [questionsErrorMessage,setQuestionsErrorMessage] = useState()
const [multipleOrSingleOptionQuestionsErrorMessage , setMultipleOrSingleOptionQuestionsErrorMessage] = useState()
const [emptyQuestionErrorMessage, setEmptyQuestionErrorMessage] = useState()
const [emptySurveyTitleErrorMessage, setEmptySurveyTitleErrorMessage] = useState()
const [emptyCategoryErrorMessage,setEmptyCategoryErrorMessage] = useState()
const [duplicateQuestionsErrorMessage, setDuplicateQuestionsErrorMessage] =useState()
const [submitError, setSubmitError] = useState([['invalidQuestions', true],['duplicateQuestions',true],
['invalidDate', true],['surveyTitle', true],['noTypeAssignedToQuestion', true],['noOptionsAssigned',true],
['emptyQuestion',true],['emptySurveyTitle',true],['emptyCategory',true]])
console.table(submitError);



useEffect(()=>{
  validateQuestion(data)
  validateDuplicateQuestions(data)
  validateDate(dateBool,date)
  validateQuestionType(data)
  validateQuestionOptions(data)
  validateEmptyQuestion(data)
  validateEmptySurveyTitle(surveyTitle)
  validateEmptyCategory(category)
},[data,date,dateBool,surveyTitle,category])

const onChange = (date, dateString) => {
  setDate(dateString)
};

const validateQuestion = (data) =>{
  const questionRegex = /^[\p{L}0-9? ]{0,70}$/u
  if(!data.every(i => questionRegex.test(i.question))){
    setQuestionsErrorMessage(<AlertDismissible message={'Has ingresado una pregunta invalida'} state={true}/>)
    setSubmitError((prevArray)=>{
      const newArray = prevArray.map((subArray, i) =>
      i === 0 ? ['invalidQuestions', true] : subArray
    );
    return newArray
    })
  }else{
    setSubmitError((prevArray)=>{
      const newArray = prevArray.map((subArray, i) =>
      i === 0 ? ['invalidQuestions', false] : subArray
    );
    setQuestionsErrorMessage()
    return newArray
    })
  } 
}

const validateDuplicateQuestions = (data) =>{
  const questionsArray = data.map((i)=> i.question)
  const checkDuplicateQuestions = new Set(questionsArray).size !== questionsArray.length
 
   if (checkDuplicateQuestions) {
    setDuplicateQuestionsErrorMessage(<AlertDismissible message={'Has ingresado una pregunta duplicada'} state={true}/>)
   setSubmitError((prevArray)=>{
     const newArray = prevArray.map((subArray, i) =>
     i === 1 ? [subArray[0] ='duplicateQuestions', true] : subArray
   );
   return newArray
   })
  }else{
   setSubmitError((prevArray)=>{
     const newArray = prevArray.map((subArray, i) =>
     i === 1 ? [subArray[0] = 'duplicateQuestions', false] : subArray
   );
   return newArray
   })

   setDuplicateQuestionsErrorMessage()
  }
}

const validateDate =(dateBool, date) =>{
  if (dateBool) {
    if (compareDates(todayDate(),date)) {
      setSubmitErrorMessage()
      setSubmitError((prevArray)=>{
        const newArray = prevArray.map((subArray, i) =>
        i === 2 ? [subArray[0] = 'invalidDate', false] : subArray
      );
      return newArray
      })
    }else{
      setSubmitErrorMessage(<AlertDismissible message={'La fecha ingresada es invalida'} state={true}/>)
      setSubmitError((prevArray)=>{
        const newArray = prevArray.map((subArray, i) =>
        i === 2 ? [subArray[0] = 'invalidDate', true] : subArray
      );
      return newArray
      })
    }
  }else{
    setSubmitError((prevArray)=>{
      const newArray = prevArray.map((subArray, i) =>
      i === 2 ? [subArray[0] = 'invalidDate', false] : subArray
    );
    return newArray
    })
  setSubmitErrorMessage()
    setDate()
  }
}

const validateSurveyTitle =(value) =>{
  const surveyTitleRegex = /^[\p{L}0-9? ]{1,55}$/u
  setSurveyTitleErrorMessage()
  if(surveyTitleRegex.test(value) ){
    setSurveyTitle(value)
    setSubmitError((prevArray)=>{
      const newArray = prevArray.map((subArray, i) =>
      i === 3 ? [subArray[0] ='surveyTitle', false] : subArray
    );
    return newArray
    })
  }else{
    setSurveyTitleErrorMessage(<AlertDismissible message={'El titulo ingresado es invalido'} state={true}/>)
    setSubmitError((prevArray)=>{
      const newArray = prevArray.map((subArray, i) =>
      i === 3 ? [subArray[0] ='surveyTitle', true] : subArray
    );
    return newArray
    })
  }
}

const validateQuestionType = (data) =>{
  if (data.some((i)=> i.type == 'default')) {
    setSubmitError((prevArray)=>{
      const newArray = prevArray.map((subArray, i) =>
      i === 4 ? [subArray[0] ='noTypeAssignedToQuestion', true] : subArray
    );
    return newArray
    })
    setQuestionWithNoTypeErrorMessage(<AlertDismissible message={'Hay preguntas a las cuales no se le han asignado tipo de respuesta'} state={true}/>)
  }else{
    setSubmitError((prevArray)=>{
      const newArray = prevArray.map((subArray, i) =>
      i === 4 ? [subArray[0] ='noTypeAssignedToQuestion', false] : subArray
    );
    return newArray
    })
    setQuestionWithNoTypeErrorMessage()
  } 
}


const validateQuestionOptions = (data) =>{
  if(data.some((i)=> (i.type == 'singleOption' || i.type == 'multipleOptions') && i.possibleAnswers.length == 0)){
    setSubmitError((prevArray)=>{
      const newArray = prevArray.map((subArray, i) =>
      i === 5 ? [subArray[0] ='noOptionsAssigned', true] : subArray
    );
    return newArray
    })
    setMultipleOrSingleOptionQuestionsErrorMessage(<AlertDismissible message={'Hay preguntas de opción única/opción multiple a las cuales no se les han asignado opciones'} state={true}/>)
  } else{
    setSubmitError((prevArray)=>{
      const newArray = prevArray.map((subArray, i) =>
      i === 5 ? [subArray[0] ='noOptionsAssigned', false] : subArray
    );
    return newArray
    })
    setMultipleOrSingleOptionQuestionsErrorMessage()
  }
}

const validateEmptyQuestion = () =>{
  if(data.some((i)=> i.question.length == 0)){
    setSubmitError((prevArray)=>{
      const newArray = prevArray.map((subArray, i) =>
      i === 6 ? [subArray[0] ='emptyQuestion', true] : subArray
    );
    return newArray
    })
    setEmptyQuestionErrorMessage(<AlertDismissible message={'Hay preguntas vacias'} state={true}/>)
  }else{
    setSubmitError((prevArray)=>{
      const newArray = prevArray.map((subArray, i) =>
      i === 6 ? [subArray[0] ='emptyQuestion', false] : subArray
    );
    return newArray
    })
    setEmptyQuestionErrorMessage()
  } 
}

const validateEmptySurveyTitle = (surveyTitle)=>{
  if(surveyTitle.length == 0 ){
    setSubmitError((prevArray)=>{
      const newArray = prevArray.map((subArray, i) =>
      i === 7 ? [subArray[0] ='emptySurveyTitle', true] : subArray
    );
    return newArray
    })
    setEmptySurveyTitleErrorMessage(<AlertDismissible message={'Ingrese un titulo a la encuesta'} state={true}/>)
  }else{
    setSubmitError((prevArray)=>{
      const newArray = prevArray.map((subArray, i) =>
      i === 7 ? [subArray[0] ='emptySurveyTitle', false] : subArray
    );
    return newArray
    })
    setEmptySurveyTitleErrorMessage()
  } 
}

const validateEmptyCategory = (category) =>{
  if(!category){
    setSubmitError((prevArray)=>{
      const newArray = prevArray.map((subArray, i) =>
      i === 8 ? [subArray[0] ='emptyCategory', true] : subArray
    );
    return newArray
    })
    setEmptyCategoryErrorMessage(<AlertDismissible message={'Elija una categoria'} state={true}/>)
  }else{
    setSubmitError((prevArray)=>{
      const newArray = prevArray.map((subArray, i) =>
      i === 8 ? [subArray[0] ='emptyCategory', false] : subArray
    );
    return newArray
    })
    setEmptyCategoryErrorMessage()
  }
}


const handleClose = () => {
  setShow(false)
  setDateBool(false)
  setDate()
  setData([])
  setSubmitErrorMessage()
  setSurveyTitle('')
  setQuestionsErrorMessage()
  setDuplicateQuestionsErrorMessage()
  setErrorMessage()
  setSurveyTitleErrorMessage()
  setQuestionWithNoTypeErrorMessage()
  setMultipleOrSingleOptionQuestionsErrorMessage()
  setEmptyQuestionErrorMessage()
  setEmptySurveyTitleErrorMessage()
  setCategory()
  setEmptyCategoryErrorMessage()
  setSurveyQuestions([<CreateQuestionSurvey key={0} id={0} setData={setData} data={data} showDeleteState={false}/>])
  setSubmitError([['invalidQuestions', true],['duplicateQuestions',true],
  ['invalidDate', true],['surveyTitle', true],['noTypeAssignedToQuestion', true],['noOptionsAssigned',true],
  ['emptyQuestion',true],['emptySurveyTitle',true],['emptyCategory',true]])
};



  const componentQuestionsHandler=()=>{
    setErrorMessage()
    setSurveyQuestions((prevArray) => {
  if (prevArray.length >= 7) {
    setErrorMessage(<AlertDismissible message={'Has llegado a la cantidad maxima de preguntas para esta encuesta'} state={true}/>)
    return [...prevArray]
  }
  return [...prevArray,<CreateQuestionSurvey key={keyCounter} id={keyCounter} setData={setData} data={data} setSurveyQuestions={setSurveyQuestions} showDeleteState={true}/>,]
},
setKeyCounter(keyCounter + 1)
)}  



const handleSubmit = () =>{ 
  const flatSubmitError = submitError.flat(2)
    const filterBool = flatSubmitError.filter((i)=> i == true)

  if (filterBool.length == 0) {
    console.log('=========================================');
   console.log('No hay errores'); 
   console.log('=========================================');

   const postObject = {
    'name': surveyTitle ,
    'categories': category,
    'endDate': date,
    'questions': data ,
   }
   
   console.log(postObject);
   console.table(data);
}

}
  
  return (
    <>
      <div className="w-100 d-flex justify-content-center mt-5">
        <Button variant="primary" onClick={()=> setShow(true)}>
          Agregar nueva encuesta
        </Button>
      </div>

      <Modal
        size="lg"
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Agregar nueva encuesta</Modal.Title>
        </Modal.Header>
        <Modal.Body> 
          <Container>
          <Form.Select
           className="w-50 mb-2"
              defaultValue={"default"}
             onChange={(e)=> setCategory(e.target.value)}
            >
              <option disabled hidden value="default">
                Elige una categoria
              </option>
              <option value="Encuesta de satisfacción del cliente">Encuesta de satisfacción del cliente</option>
              <option value="Encuesta demografica">Encuesta demografica</option>
              <option value="Encuesta academica">Encuesta academica</option>
              <option value="Encuesta medica">Encuesta medica</option>
              <option value="Gastronomia">Gastronomia</option>
              <option value="Deporte">Deporte</option>
              <option value="Economía">Economía</option>
              <option value="Política">Política</option>
            </Form.Select>
          <Stack className="container-fluid p-0 pb-2 mb-2 border-bottom " direction="horizontal" >
          <Form.Check 
          onChange={()=> setDateBool(!dateBool)}
    type="checkbox"
    key={'checkBoxFecha'}
    name="checboxSelectors"
    label={"Ingresar fecha de finalizacion de encuesta"}
  />
  
       {dateBool ? <Space  direction="horizontal" className="ms-auto" >
    <DatePicker style={{minWidth:"8vw"}} className="me-4" onChange={(onChange)}  placeholder={'Ingrese una fecha'}/>
    <TooltipQuestionmark  message={'Debes ingresar una fecha posterior al día de hoy'} item={<i className="bi bi-question-circle"></i>}/>
       </Space>  :  <div> </div> }
            </Stack>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Ingrese el titulo de su encuesta</Form.Label>
              <Form.Control type="text" placeholder="" onChange={(e)=> validateSurveyTitle(e.target.value)} />
              <Form.Text muted>
        El titulo debe tener un maximo de 55 caracteres y no puede contener caracteres especiales. 
             </Form.Text>
             {surveyTitleErrorMessage}
            </Form.Group>
          </Form>
         {SurveyQuestions}
         {errorMessage}
          </Container>
        </Modal.Body>
        <Modal.Footer>
       
          <div className="container-fluid p-0 mb-2 d-flex flex-wrap d">
          {questionsErrorMessage}
          {duplicateQuestionsErrorMessage}
          {submitErrorMessage}    
          {questionWithNoTypeErrorMessage}
          {multipleOrSingleOptionQuestionsErrorMessage}
          {emptyQuestionErrorMessage}
          {emptySurveyTitleErrorMessage}
          {emptyCategoryErrorMessage}
          </div>
   
      
        <Stack className="container-fluid" direction="horizontal" gap={3}>
         <Button variant="outline-success" onClick={componentQuestionsHandler}>Añadir pregunta</Button>
         <h5 className="my-auto me-auto">{SurveyQuestions.length}/7</h5>
          <Button className="ms-auto" variant="secondary" onClick={handleClose}>
            Cerrar
          </Button>
          <Button variant="primary" onClick={handleSubmit}>
            Guardar
          </Button>
      </Stack>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default CreateNewSurvey;

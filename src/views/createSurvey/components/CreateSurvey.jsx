import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Container } from "react-bootstrap";
import CreateQuestionSurvey from "./CreateQuestionSurvey";
import Stack from 'react-bootstrap/Stack';
import { DatePicker, Space } from 'antd';
import AlertDismissible from "../../../layouts/alert";
import todayDate from "../../../helpers/todayDate";
import compareDates from "../../../helpers/compareDates";
import TooltipQuestionmark from "../../../layouts/tooltip";
import Swal from 'sweetalert2'
import SpinnerLoader from "../../../components/spinner/spinner";
import Wave from "react-wavify";
import { Image } from "react-bootstrap";
import axios from "axios";

function CreateNewSurveyForm({URL, token}) {
  const [category,setCategory] = useState()
  const [surveyTitle, setSurveyTitle] = useState('')
  const [surveyDescription, setSurveyDescription] = useState('')
  const [surveyDescriptionCounter, setSurveyDescriptionCounter] = useState(0)
  const [surveyTitleErrorMessage, setSurveyTitleErrorMessage] = useState()
  const [data,setData] = useState([])
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
const [surveyDescriptionErrorMessage, setSurveyDescriptionErrorMessage] = useState()
const [emptySurveyDescriptionErrorMessage,setEmptySurveyDescriptionErrorMessage] = useState()
const [isLoading, setLoading] = useState(false);
const [submitError, setSubmitError] = useState([['invalidQuestions', true],['duplicateQuestions',true],
['invalidDate', true],['surveyTitle', true],['noTypeAssignedToQuestion', true],['noOptionsAssigned',true],
['emptyQuestion',true],['emptySurveyTitle',true],['emptyCategory',true],['surveyDescription',true],['emptySurveyDescription',true]])


useEffect(()=>{
  validateQuestion(data)
  validateDuplicateQuestions(data)
  validateDate(dateBool,date)
  validateQuestionType(data)
  validateQuestionOptions(data)
  validateEmptyQuestion(data)
  validateEmptySurveyTitle(surveyTitle)
  validateEmptyCategory(category)
  validateEmptySurveyDescription(surveyDescription)
},[data,date,dateBool,surveyTitle,category,surveyDescription])

const onChange = (date, dateString) => {
  setDate(dateString)
};

const validateQuestion = (data) =>{
  const questionRegex = /^[a-zA-Z0-9áéíóúÁÉÍÓÚñÑüÜ\(\)\.,;:¿¡?!\s]{0,45}$/
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
  const surveyTitleRegex = /^[a-zA-Z0-9áéíóúÁÉÍÓÚñÑüÜ\(\)\.,;:¿¡?!\s]{0,55}$/
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

const validateEmptyQuestion = (data) =>{
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

const validateSurveyDescription = (value)=>{
  const surveyDescriptionRegex = /^[a-zA-Z0-9áéíóúÁÉÍÓÚñÑüÜ\(\)\.,;:¿¡?!\s]{0,220}$/
  setSurveyDescriptionErrorMessage()
  setSurveyDescriptionCounter(value.length)
  if (surveyDescriptionRegex.test(value)) {
    setSurveyDescription(value)
    setSubmitError((prevArray)=>{
      const newArray = prevArray.map((subArray, i) =>
      i === 9 ? [subArray[0] ='surveyDescription', false] : subArray
    );
    return newArray
    })
  }else{
    setSurveyDescriptionErrorMessage(<AlertDismissible message={'La descripcion ingresada es invalida'} state={true}/>)
    setSubmitError((prevArray)=>{
      const newArray = prevArray.map((subArray, i) =>
      i === 9 ? [subArray[0] ='surveyDescription', true] : subArray
    );
    return newArray
    })
  }
 }

 const validateEmptySurveyDescription = (surveyDescription) =>{
  setEmptySurveyDescriptionErrorMessage()
  if(surveyDescription.length == 0 ){
    setEmptySurveyDescriptionErrorMessage(<AlertDismissible message={'Ingrese una descripcion a la encuesta'} state={true}/>)
    setSubmitError((prevArray)=>{
      const newArray = prevArray.map((subArray, i) =>
      i === 10 ? [subArray[0] ='emptySurveyDescription', true] : subArray
    );
    return newArray
    })
 }else{
  setSubmitError((prevArray)=>{
    const newArray = prevArray.map((subArray, i) =>
    i === 10 ? [subArray[0] ='emptySurveyDescription', false] : subArray
  );
  return newArray
  })
 }
}

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

const handleSubmit  = () =>{ 
  const flatSubmitError = submitError.flat(2)
  const filterBool = flatSubmitError.filter((i)=> i == true)
  
  if (filterBool.length == 0) {
   const postObject = {
    'name': surveyTitle.charAt(0).toUpperCase() + surveyTitle.slice(1) ,
    'description': surveyDescription.charAt(0).toUpperCase() + surveyDescription.slice(1) ,
    'categories': category,
    'endDate': date,
    'questions': data,
   }

   Swal.fire({
    title: 'Estas seguro de guardar esta encuesta?',
    text: "No podras modificar la encuesta una vez guardada",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    cancelButtonText: 'Cancelar',
    confirmButtonText: 'Guardar',
    reverseButtons: true
  }).then(async (result) => {
    if (result.isConfirmed){
      setLoading(true)

      try{
          const res = await axios.post(`${URL}/survey/question`,postObject,{
            headers:{
              "Content-Type": "application/json",
              'auth-token': token.token
            }
          })
          if (res.status == 200) {
            Swal.fire(
              '',
               'Tu encuesta ha sido guardada existosamente!',
               'success'
             )
             setTimeout(()=>{
              window.location.href='/mysurveys'
            }, 1000 )
          }
      }catch(error){
        Swal.fire(
          '',
          'Lo sentimos, ha ocurrido un error. Intente de nuevo mas tarde.',
          'error'
        )
        setLoading(false)
      }
    }
  })
 }
}
  
  return (
    <>  
    <div className='bannerContainer'>
<Image
className="mb-2 mt-2"
style={{maxHeight:'15vh'}}
fluid={true}
src="/src/assets/img/Create survey/crea tu propia encuesta negro.png"
/>
</div>
<Wave  fill='#7531f9'
style={{transform:'rotateX(180deg)'}}
paused={false} options={{
height: 15,
amplitude: 50,
speed: 0.15,
points: 5,}} />;   
          <Container className="mt-5 mb-3 p-4 glass-bg rounded-4 text-light">
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
              <Form.Control type="text" placeholder=""  required maxLength='55' onChange={(e)=> validateSurveyTitle(e.target.value)} />
              <Form.Text muted>         
        El titulo debe tener un maximo de 55 caracteres y no puede contener caracteres especiales. 
             </Form.Text>
             {surveyTitleErrorMessage}
            </Form.Group>
            <Form.Group className="mb-3">
            <Form.Label>Ingrese una descripción de su encuesta</Form.Label>
             <Form.Control as="textarea" required maxLength='220' rows={2} onChange={(e)=> validateSurveyDescription(e.target.value)}/>
             <div className="d-flex">
             <Form.Text muted>
       La descripción debe tener un maximo de 220 caracteres y no puede contener caracteres especiales. 
             </Form.Text>
             <Form.Text className="ms-auto ms-3" muted>
                  {surveyDescriptionCounter}/220
             </Form.Text>
             </div>
             {surveyDescriptionErrorMessage}
             </Form.Group>
          </Form>
         {SurveyQuestions}
         {errorMessage}
          <div className="container-fluid p-0 mb-2 d-flex flex-wrap d">
          {emptySurveyTitleErrorMessage}
          {emptySurveyDescriptionErrorMessage}
          {questionsErrorMessage}
          {duplicateQuestionsErrorMessage}
          {submitErrorMessage}    
          {questionWithNoTypeErrorMessage}
          {multipleOrSingleOptionQuestionsErrorMessage}
          {emptyQuestionErrorMessage}
          {emptyCategoryErrorMessage}
          </div>

        <Stack className="container-fluid" direction="horizontal" gap={3}>
         <Button className="add-survey-button" variant="outline-success" onClick={componentQuestionsHandler}>Añadir pregunta</Button>
         <h5 className="my-auto me-auto">{SurveyQuestions.length}/7</h5>
          <Button variant="primary" onClick={handleSubmit}>
            {isLoading? <SpinnerLoader /> : 'Guardar'}
          </Button>
      </Stack>
          </Container>
          </>

)
}


export default CreateNewSurveyForm;

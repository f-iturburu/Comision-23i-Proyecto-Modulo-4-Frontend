import { Form, Input, Button, Steps, Checkbox } from "antd";
import { useEffect, useState } from "react";
import QuestionComponent from "./questionComponentHandler";
import { Row, Col } from "react-bootstrap";
import { useParams } from 'react-router-dom';
import Swal from 'sweetalert2'
import axios from "axios";
import AlertDismissible from "../../../layouts/alert";
import css from './survey.css'

const { Step } = Steps;

const MultiStepForm = ({ questions, surveyTitle,surveyDescription,URL,token,formDisabled,formDisabledExpiredDate }) => {
  const {id} = useParams()
  const [data, setData] = useState([]);
  const [buttonDisabled, setButtonDisabled] = useState(true);
  const [submitButtonDisabled,setSubmitButtonDisabled] = useState(false)
  const [submitLoading, setSubmitLoading] = useState(false);
  const [anonymousResponse, setAnonymousResponse] = useState(false);
  const questionsForm = questions;
  const [currentStep, setCurrentStep] = useState(0);
  const [form] = Form.useForm();

  useEffect(() => {
    if (currentStep == data.length) {
      setButtonDisabled(true);
    } else {
      setButtonDisabled(false);
    }

    if (formDisabled) {
      if (currentStep == questions?.length -1){
        return setSubmitButtonDisabled(true);
      }
      setButtonDisabled(false);
    }
  }, [currentStep]);

  const anonymousResponseHandler = () => {
    setAnonymousResponse(!anonymousResponse);
  };
  const next = () => {
    setCurrentStep(currentStep + 1);
  };

  const prev = () => {
    setCurrentStep(currentStep - 1);
  };

  const onFinish = () => {
    const submitObject = {
      isAnonymous: anonymousResponse,
      userAnswers: data,
    };
    setSubmitLoading(true);

    const messageTitle = questions?.length == 1 ? 'Estas seguro que deseas enviar tu respuesta?' : 'Estas seguro que deseas enviar tus respuestas?'
    const messageText =  questions?.length == 1 ? "No podras modificar la respuesta una vez enviada": "No podras modificar las respuestas una vez enviadas"
    
    Swal.fire({
      title: messageTitle ,
      text: messageText,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      cancelButtonText: 'Cancelar',
      confirmButtonText: 'Guardar',
      reverseButtons: true
    }).then(async (result)=>{
      if (result.isConfirmed) {
        setSubmitLoading(true);

         try{
            const res = await axios.post(`${URL}/allAnswers/${id}`,submitObject,{
              headers:{
                "Content-Type": "application/json",
                "auth-token":token.token
              }
            })

            if (res.status == 200) {
              Swal.fire(
                '',
                 'Tu respuesta ha sido enviada existosamente!',
                 'success'
               )
               setSubmitButtonDisabled(true)
               setButtonDisabled(false)
               setSubmitLoading(false);
            }
         }catch(error){
          Swal.fire(
            '',
            'Lo sentimos, ha ocurrido un error. Intente de nuevo mas tarde.',
            'error'
          )
          setSubmitLoading(false);
         }
      }
      setSubmitLoading(false);
    })
  };


  return (
    <div className="glass-bg p-4">
    <Form form={form} disabled={formDisabled} style={{minHeight:"30vh"}}>
      <div className="row">
        <div className="col-12 col-md-12">
          <Steps current={currentStep} >
            {questionsForm?.map((item) => (
              <Step key={item.question} />
            ))}
          </Steps>
        </div>

        <div className="col-12 col-md-12 ps-4 ps-md-0">
          <QuestionComponent
            question={questionsForm ? questionsForm[currentStep] : null}
            data={data}
            setData={setData}
            surveyTitle={surveyTitle}
            surveyDescription={surveyDescription}
            setButtonDisabled={setButtonDisabled}
          />
        </div>
      </div>

      <div className="d-md-flex border-top pt-3">
        <div>
          <Checkbox className="text-light checkbox-className" onChange={anonymousResponseHandler}>
            Responder esta encuesta de forma anonima
          </Checkbox>
        </div>

        <div className="steps-action ms-auto mt-3 mt-md-0">
          {currentStep > 0 && (
            <Button
              style={{ margin: "0 8px" }}
              disabled={buttonDisabled}
              onClick={() => prev()}
            >
              Anterior
            </Button>
          )}

          {currentStep < questionsForm?.length - 1 && (
            <Button
              type="primary"
              disabled={buttonDisabled}
              onClick={() => next()}
            >
              Siguiente
            </Button>
          )}

          {currentStep === questionsForm?.length - 1 && (
            <Button
              type="primary"
              disabled={buttonDisabled?  buttonDisabled : submitButtonDisabled}
              loading={submitLoading}
              onClick={() => onFinish()}
            >
              Finalizar
            </Button>
          )}
        </div>
      </div>
        <div className="mt-2">
          {formDisabled? <AlertDismissible message={'Ya has respondido a esta encuesta'} state={true}/> : null}
          {formDisabledExpiredDate? <AlertDismissible message={'Esta encuesta ha finalizado'} state={true}/> : null}
        </div>
    </Form>
    </div>
  );
};

export default MultiStepForm;

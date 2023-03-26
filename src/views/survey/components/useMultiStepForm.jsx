import { Form, Input, Button, Steps, Checkbox } from "antd";
import { useEffect, useState } from "react";
import QuestionComponent from "./questionComponentHandler";
import { Row, Col } from "react-bootstrap";
import { useParams } from 'react-router-dom';
import Swal from 'sweetalert2'
const { Step } = Steps;

const MultiStepForm = ({ questions, surveyTitle,surveyDescription }) => {
  const {id} = useParams()
  const [data, setData] = useState([]);
  const [buttonDisabled, setButtonDisabled] = useState(true);
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
    console.log(submitObject);

    Swal.fire({
      title: 'Estas seguro que deseas enviar esta respuesta?',
      text: "No podras modificar la respuesta una vez enviada",
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
        await fetch(`https://comision-23i-proyecto-modulo-4-backend.onrender.com/allAnswers/${id}`,{
          method:'POST' ,
          headers: {
            "Content-Type": "application/json",
            'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NDEzZjZiNmNjZDAyMWJlNmM3YWNjZjAiLCJ1c2VyUm9sZSI6MCwidXNlckVtYWlsIjoiYWRtaW5AYWRtaW4uY29tIiwiaWF0IjoxNjc5MTk5MTI1fQ.QhHQXwFRW92K1tKhtIygagsBACOEbb_MEEPNxRLO0mY'
          },
          body: JSON.stringify(submitObject)
          
        }).then(res => res.json()).then(body =>{
          console.log(body);
          Swal.fire(
            '',
             'Tu respuesta ha sido enviada existosamente!',
             'success'
           )
           setSubmitLoading(false);
        }).catch(error =>{
          console.log(error);
          Swal.fire(
            '',
            'Lo sentimos, ha ocurrido un error. Intente de nuevo mas tarde.',
            'error'
          )
          setSubmitLoading(false);
        })
      }
      setSubmitLoading(false);
    })
  };

  

  return (
    <Form form={form}>
      <div className="row">
        <div className="col-1 col-md-12">
          <Steps current={currentStep}>
            {questionsForm?.map((item) => (
              <Step key={item.question} />
            ))}
          </Steps>
        </div>

        <div className="col-11 col-md-12 ps-4 ps-md-0">
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

      <div className="d-flex">
        <div>
          <Checkbox onChange={anonymousResponseHandler}>
            Responder esta encuesta de forma anonima
          </Checkbox>
        </div>

        <div className="steps-action ms-auto">
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
              disabled={buttonDisabled}
              loading={submitLoading}
              onClick={() => onFinish()}
            >
              Finalizar
            </Button>
          )}
        </div>
      </div>
    </Form>
  );
};

export default MultiStepForm;

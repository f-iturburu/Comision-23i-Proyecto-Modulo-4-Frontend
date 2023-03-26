import React, { useEffect, useState } from 'react';
import { Form, Input, Button, InputNumber,Radio, Checkbox } from 'antd';



const QuestionComponent = ({question, setData,surveyTitle,setButtonDisabled,surveyDescription}) => {
  const [form] = Form.useForm();

  const [questionObject, setQuestionObject] =useState({
    'idQuestion': question?._id,
    'answers': []
  })

  useEffect(()=>{
    setData(prevArray =>{
      const existingObjectIndex = prevArray.findIndex(obj => obj.idQuestion === questionObject.idQuestion);
      if (existingObjectIndex === -1){
        return [...prevArray, questionObject];
      } else {
        const updatedArray = [...prevArray];
        updatedArray[existingObjectIndex] = { ...prevArray[existingObjectIndex], ...questionObject };
        return updatedArray;
      }
    });
  },[questionObject])
  
  const TextComponent = ()=>{
    const [isAnswerValid, setIsAnswerValid] = useState(false);

    const handleData = (values) => {
      const regex = /^[a-zA-Z\s\p{P}]{2,30}$/
      const isValid = regex.test(values);
      if (isValid) {
        const updatedObject = { ...questionObject ,
          'idQuestion' : question._id , 
          'answers': [values], 
          }
          setButtonDisabled(false)
          setIsAnswerValid(!isValid);
          setQuestionObject(updatedObject)
  
      }else{
        setIsAnswerValid(!isValid);
        setButtonDisabled(true)
      }
    };

    return (
      <Form form={form} >
      <div className='w-100 text-center pt-3'>
      <h3>{surveyTitle}</h3>
      <h5>{surveyDescription}</h5>
      </div>
    <h5>{question.question}</h5>
    <Form.Item 
     style={{width:'50%'}}
      name={'text'+ question.question}
      rules={[
        {
          required: true,
          message: 'Ingrese una respuesta',
        },
      ]}
      validateStatus={isAnswerValid ? 'error' : ''}
      help={isAnswerValid && 'La respuesta debe ser de entre 2 y 30 caracteres, no se admiten caracteres especiales.'}
      hasFeedback
    >
      <Input placeholder="Ingrese su respuesta"  onChange={(e)=> handleData(e.target.value)}/>
      </Form.Item>
      </Form>
    )
    }

  const NumberComponent = () =>{
    const [isAnswerValid, setIsAnswerValid] = useState(false);

    const handleData = (values) => {
     const regex = /^[0-9]{1,5}$/
     const isValid = regex.test(values);
     if (isValid) {
       const updatedObject = { ...questionObject ,
         'idQuestion' : question._id , 
         'answers': [values], 
         }
         setButtonDisabled(false)
         setIsAnswerValid(!isValid);
         setQuestionObject(updatedObject)
     }else{
      setIsAnswerValid(!isValid);
      setButtonDisabled(true)
     }
    };

      return (
        <Form form={form} initialValues={0}>
        <div className='w-100 text-center pt-3'>
              <h3>{surveyTitle}</h3>
              <h5>{surveyDescription}</h5>
              </div>
        <h5>{question.question}</h5>
            <Form.Item

              name={"Numbers"+ question.question}
             rules={[
                {
                  required: true,
                  message: 'Ingrese una respuesta',
                  },
              ]}
      validateStatus={isAnswerValid ? 'error' : ''}
      help={isAnswerValid && 'Solo se admiten números de entre 1 y 5 digitos'}
      hasFeedback
      
            >
            <Input style={{width:"30%"}} placeholder="Ingrese un valor númerico" min={1} onChange={(e)=> handleData(e.target.value)}/>
              </Form.Item>
              </Form>
      )
    }

  const SingleOptionComponent = () =>{ 
    const [isAnswerValid, setIsAnswerValid] = useState(false);

    const handleData = (values) => {
      const updatedObject = { ...questionObject ,
        'idQuestion' : question._id , 
        'answers': [values], 
        }
        setQuestionObject(updatedObject)
        setButtonDisabled(false)
    };

    const radioButtons = question.possibleAnswers?.map((i)=>  <Radio style={{marginLeft:'0'}} key={i} value={i}>{i}</Radio>)
    return (
       <Form form={form} >
         <div className='w-100 text-center pt-3'>
           <h3>{surveyTitle}</h3>
           <h5>{surveyDescription}</h5>
         </div>
         <h5>{question.question}</h5>
    <Form.Item  
     style={{width:'50%'}}
      name={"Radio"+ question.question}
    >  
    <Radio.Group style={{display:'flex', flexDirection: 'column'}} name={question._id} onChange={(e)=> handleData(e.target.value)} >
      {radioButtons}
     </Radio.Group>
      </Form.Item>
      </Form>)
  }

  const MultipleOptionsComponent = () =>{
    const [isAnswerValid, setIsAnswerValid] = useState(false);

    const handleData = (values) => {
      console.log(values);
      if (values.length > 0) {
        const updatedObject = { ...questionObject ,
          'idQuestion' : question._id , 
          'answers': values, 
          }
          setQuestionObject(updatedObject)
          setButtonDisabled(false)
      }else{
        setButtonDisabled(true)
      }
    };
    
    const checkboxButtons = question.possibleAnswers?.map((i)=> <Checkbox style={{marginLeft:'0'}} key={i} value={i}>{i}</Checkbox>)
    const CheckboxGroup = Checkbox.Group;
    return(
    <Form  form={form} >
    <div className='w-100 text-center pt-3'>
      <h3>{surveyTitle}</h3>
      <h5>{surveyDescription}</h5>
      </div>
      <h5>{question.question}</h5>
    <Form.Item
     style={{width:'50%'}}
      name={"Checkbox"+ question.question}
    >  
    <CheckboxGroup style={{display:'flex', flexDirection: 'column'}} name={question._id} onChange={(e)=> handleData(e)} >
      {checkboxButtons}
     </CheckboxGroup>
      </Form.Item>
      </Form>)
  }
  
  switch (question? question.type : null) {
    case "text":
      return  TextComponent()

    case "numbers":
      return NumberComponent()

    case "singleOption":
      return SingleOptionComponent()

    case "multipleOptions":
        return MultipleOptionsComponent()

    default:
      break;  
  }
};

export default QuestionComponent


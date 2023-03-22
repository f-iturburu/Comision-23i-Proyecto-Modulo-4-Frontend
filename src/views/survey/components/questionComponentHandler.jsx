import React, { useEffect, useState } from 'react';
import { Form, Input, Button, InputNumber,Radio, Checkbox } from 'antd';

const QuestionComponent = ({question, data, setData}) => {
  const [form] = Form.useForm();
  const [questionObject, setQuestionObject] =useState({
    'idQuestion': question?._id,
    'answers': []
  })

  const handleData = (values) => {
    const updatedObject = { ...questionObject ,
      'idQuestion' : question._id , 
      'answers': values, 
      }
      setQuestionObject(updatedObject)
  };

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
  
  
  switch (question? question.type : null) {
    case "text":
      return <>
      <h5>{question.question}</h5>
      <Form form={form} >
      <Form.Item
       style={{width:'50%'}}
        name="Respuesta"
        rules={[
          {
            required: true ,
          },
        ]}
        hasFeedback

      >
        <Input placeholder="Ingrese su respuesta"  onChange={(e)=> handleData(e.target.value)}/>
        </Form.Item>
        </Form>
   </>
   
    case "numbers":
      return <>
      <h5>{question.question}</h5>
  <Form form={form} >
      <Form.Item
       style={{width:'50%'}}
        name="Valor numerico"
        rules={[
          {
            required: true ,
          },
        ]}
        hasFeedback

      >
      <InputNumber min={1} max={10000} defaultValue={0} onChange={(e)=> handleData(e.target.value)}/>
        </Form.Item>
        </Form>
      </> 
      

    case "singleOption":
      const radioButtons = question.possibleAnswers?.map((i)=>  <Radio key={i} value={i}>{i}</Radio>)
 
      return <>
      <h5>{question.question}</h5>
      <Form form={form} >
      <Form.Item
       style={{width:'50%'}}
        name="Valor numerico"
        rules={[
          {
            required: true ,
          },
        ]}
        hasFeedback

      >  
      <Radio.Group name={question._id}>
        {radioButtons}
       </Radio.Group>
        </Form.Item>
        </Form>
      </>

    case "multipleOptions":
      const checkboxButtons = question.possibleAnswers?.map((i)=>  <Checkbox  key={i} value={i}>{i}</Checkbox>)
 
      return <>
      <h5>{question.question}</h5>
      <Form form={form} >
      <Form.Item
       style={{width:'50%'}}
        name="Valor numerico"
        rules={[
          {
            required: true ,
          },
        ]}
        hasFeedback

      >  
      <Checkbox.Group name={question._id}>
        {radioButtons}
       </Checkbox.Group>
        </Form.Item>
        </Form>
      </>

    default:
      break;  
  }
};

export default QuestionComponent
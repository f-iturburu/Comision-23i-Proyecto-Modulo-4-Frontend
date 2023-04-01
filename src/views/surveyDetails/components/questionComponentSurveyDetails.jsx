import { useEffect } from "react";
import { Form, Input, Button, InputNumber,Radio, Checkbox, Table, Switch } from 'antd';
import { Pie } from "@ant-design/plots";
import { Column } from '@ant-design/plots';

const QuestionComponentSurveyDetails = ({ question,questionNumber }) => {

  const [form] = Form.useForm();
 
  const TextComponent =() =>{

    const columns = [
      {
        title: 'Usuario',
        key: 'email',
        dataIndex: 'user',
        render(record){
         if (record == 'Anonymous') {
          return <p>Usuario anonimo</p>
         }else{
          return <p>{record.email}</p>
         }
        }
      },
      {
        title: 'Fecha de respuesta',
        key: 'createdAt',
        sorter: (a, b) => a?.answerDate.localeCompare(b?.answerDate),
        render: (record) =>{
                return record.answerDate.slice(0,10)    
        }
      },
      {
        title: 'Respuesta',
        key: 'userAnswers',
        dataIndex: 'userAnswer',
        render(record){
          const answers = record.map((i)=> i.answers)
          return  answers.map((i)=> <p>{i}</p>)      
        }
      },
    ];

    return <>
    <p className="mt-3">{questionNumber}- {question.question}</p>
    <Form disabled={true}>
    <Form.Item 
    style={{width:'50%'}}
   >
     <Input placeholder="Respuesta del usuario"/>
     </Form.Item>
    </Form>   
    <div className='containerTable'>
    <Table columns={columns}  dataSource={question.userAnswers} pagination={{pageSize: 5}}>
    </Table>    
    </div>
    </>
  }

  const NumbersComponent =()=>{
    const data = []

    const userAnswersArray = []
    let destructuring = question.userAnswers.map((i)=> i.userAnswer)
  
    for (let i = 0; i < destructuring.length; i++) {
       destructuring[i].map((i)=>{
        return userAnswersArray.push(i.answers)
      });
    }

  const flatAnswers = userAnswersArray.flat(1)
  const uniqueAnswers = [...new Set(flatAnswers)]
  flatAnswers.map((i)=>{data.push({value: i , matchingAnswers: 0})})

   for (let i = 0; i < data.length; i++) {
       for (let j = 0; j < userAnswersArray.length; j++) {
        if (data[i].value ==  userAnswersArray[j]) {
          data[i].matchingAnswers ++
        }   
       }
   }
    
    const config = {
      data,
      xField: 'value',
      yField: 'matchingAnswers',
      label: {
        position: 'middle',
        style: {
          fill: '#FFFFFF',
          opacity: 0.6,
        },
      },
      xAxis: {
        label: {
          autoHide: true,
          autoRotate: false,
        },
      },
      meta: {
        value: {
          alias: 'Valor',
        },
        matchingAnswers: {
          alias: 'Cantidad de respuestas',
        },
      },
    };

    const columns = [
      {
        title: 'Usuario',
        key: 'user',
        dataIndex: 'user',
        render(record){
          if (record == 'Anonymous') {
            return <p>Usuario anonimo</p>
           }else{
            return <p>{record.email}</p>
           }    
        }
      },
      {
        title: 'Fecha de respuesta',
        key: 'createdAt',
        sorter: (a, b) => a?.answerDate.localeCompare(b?.answerDate),
        render: (record) =>{
                return record.answerDate.slice(0,10)    
        }
      },
      {
        title: 'Respuesta',
        key: 'userAnswer',
        dataIndex: 'userAnswer',
        sorter: (a, b) => a.userAnswer.map((i)=> i.answers[0]) - b.userAnswer.map((i)=> i.answers[0]) ,
        render(record){
          const answers = record.map((i)=> i.answers)
          return  answers.map((i)=> <p>{i}</p>)      
        }
      },
    ];

    return <>
    <p className="mt-3">{questionNumber}- {question.question}</p>
    <Form disabled={true}>
    <Form.Item>
<Input style={{width:"45%"}} placeholder="Valor númerico"/>
</Form.Item>
    </Form>   
    <div className='containerTable'>
    <Table columns={columns}  dataSource={question.userAnswers} pagination={{pageSize: 5}}>
    </Table>

    <div className="mt-5">
     <Column {...config} />
    </div>
    </div>
    </>
  }

  const SingleOptionComponent = () => {
    const data = []
    question.possibleAnswers.map((i)=> data.push({type: i, value: 0}))
    const userAnswersArray = []
    let destructuring = question.userAnswers.map((i)=> i.userAnswer)

    const radioButtons = data.map((i)=> <Radio key={i.type} value={i.type}>{i.type}</Radio>)
    for (let i = 0; i < destructuring.length; i++) {
       destructuring[i].map((i)=>{
        return userAnswersArray.push(i.answers.toString())
      });
    }

   for (let i = 0; i < data.length; i++) {
       for (let j = 0; j < userAnswersArray.length; j++) {
        if (data[i].type ==  userAnswersArray[j]) {
          data[i].value ++
        }   
       }
   }

    const config = {
      appendPadding: 10,
      data,
      angleField: 'value',
      colorField: 'type',
      radius: 0.9,
      label: {
        type: 'inner',
        offset: '-30%',
        content: ({ percent }) => `${(percent * 100).toFixed(0)}%`,
        style: {
          fontSize: 14,
          textAlign: 'center',
        },
      },
      interactions: [
        {
          type: 'element-active',
        },
      ],
      legend: {
        position: 'bottom',
      },
    };

    
    return <>
     <p className="mt-3">{questionNumber }- {question.question}</p>
     <p className='text-muted fst-italic'>Pregunta de opción única.</p>
      <Form disabled={true}>
        <Radio.Group style={{display:'flex', flexDirection: 'column'}}>
        {radioButtons}

        </Radio.Group>
      </Form>
    <Pie {...config} />
    </>
    
  };

  const MultipleOptionsComponent = () =>{
    const data = []
    question.possibleAnswers.map((i)=> data.push({type: i, value: 0}))
  
    let destructuring = question.userAnswers.map((i)=> i.userAnswer)
    destructuring = destructuring.map((i)=> i[0].answers)

    const userAnswersArray = destructuring.flat(1)
    const CheckboxButtons = data.map((i)=> <Checkbox className="ms-0" key={i.type} value={i.type}>{i.type}</Checkbox>)

   for (let i = 0; i < data.length; i++) {
       for (let j = 0; j < userAnswersArray.length; j++) {
        if (data[i].type ==  userAnswersArray[j]) {
          data[i].value ++
        }   
       }
   }

    const config = {
      appendPadding: 0,
      data,
      angleField: 'value',
      colorField: 'type',
      autoFit: 'true', 
      radius: 0.9,
      label: {
        type: 'inner',
        offset: '-30%',
        content: ({ percent }) => `${(percent * 100).toFixed(0)}%`,
        style: {
          fontSize: 14,
          textAlign: 'center',
        },
      },
      interactions: [
        {
          type: 'element-active',
        },
      ],
      legend: {
        position: 'bottom',
      },
    };
 
    return <>
     <p className="mt-3">{questionNumber }- {question.question}</p>
     <p className='text-muted fst-italic'>Pregunta de opción multiple.</p>
      <Form disabled={true}>
        <Checkbox.Group style={{display:'flex', flexDirection: 'column'}}>
        {CheckboxButtons}
        </Checkbox.Group>
      </Form>
    <Pie {...config} />
    </>
    
  }

  switch (question.type) {
    case "text":
      return <div className="border-bottom">
        <TextComponent />
      </div> 

    case "numbers":
      return <div className="border-bottom">
        <NumbersComponent />
      </div>

    case "singleOption":
      return <div className="border-bottom">
        <SingleOptionComponent /> 
        </div>

    case "multipleOptions":
      return <div className="border-bottom">
        <MultipleOptionsComponent />
      </div>

    default:
      break;
  }
};

export default QuestionComponentSurveyDetails

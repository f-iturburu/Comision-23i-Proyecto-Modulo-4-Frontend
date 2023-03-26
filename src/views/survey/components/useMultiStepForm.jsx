import { Form, Input, Button, Steps } from 'antd';
import { useState } from 'react';
import QuestionComponent from './questionComponentHandler';

const { Step } = Steps;

const MultiStepForm = ({questions}) => {
  const [data, setData] = useState([])
  console.log('data',data);
  const questionsForm = questions
  const [currentStep, setCurrentStep] = useState(0);
  const [form] = Form.useForm();

  const next = () => {
    setCurrentStep(currentStep + 1);
  };

  const prev = () => {
    setCurrentStep(currentStep - 1);
  };

  const onFinish = (values) => {
    console.log('Success:', values);
  };

  return (
    <Form form={form} onFinish={onFinish}>
      <Steps current={currentStep}>
        {questionsForm?.map((item) => (
          <Step key={item.question}/>
        ))}
      </Steps>
      <div className="steps-content">
        <QuestionComponent question={questionsForm? questionsForm[currentStep] : null} data={data} setData={setData}/>
        </div>
      <div className="steps-action">
        {currentStep > 0 && (
          <Button style={{ margin: '0 8px' }} onClick={() => prev()}>
            Previous
          </Button>
        )}
        {currentStep < questionsForm?.length - 1 && (
          <Button type="primary" onClick={() => next()}>
            Next
          </Button>
        )}
        {currentStep === questionsForm?.length - 1 && (
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        )}
      </div>
    </Form>
  );
};




export default MultiStepForm;


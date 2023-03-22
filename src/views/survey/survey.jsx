import { useEffect, useState } from "react"
import { useParams } from 'react-router-dom';
import QuestionComponent from "./components/questionComponentHandler";
import { Button } from 'antd';
import MultiStepForm from "./components/useMultiStepForm";

const Survey = () =>{
    const [data, setData] = useState()

    const {id} = useParams()
    useEffect(()=>{
        fetchApi()
    },[])


  const fetchApi = async ()=>{
    await fetch(`https://comision-23i-proyecto-modulo-4-backend.onrender.com/survey/${id}/answers/me`,{
        method:'GET' ,
        headers: {
          "Content-Type": "application/json",
          'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NDEzZjZiNmNjZDAyMWJlNmM3YWNjZjAiLCJ1c2VyUm9sZSI6MCwidXNlckVtYWlsIjoiYWRtaW5AYWRtaW4uY29tIiwiaWF0IjoxNjc5NDM1MTEyfQ.bJuK16EyPFbJkfliX48-357nkk5RdrECjjkANUexUDo'
        }
    })
    .then(res => res.json())
    .then(body => {
      setData(body) 
    })
  }

    return <>
    <h1>{data?.name}</h1>
    <div className="container">
    <MultiStepForm questions={data?.surveyQuestions}/>    
    </div>
    </>
}

export default Survey
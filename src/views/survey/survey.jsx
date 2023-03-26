import { useEffect, useState } from "react"
import { useParams } from 'react-router-dom';
import MultiStepForm from "./components/useMultiStepForm";
import Loader from "../../components/loader/loader";

const Survey = () =>{
    const [data, setData] = useState()
    const [loading, setLoading] = useState()
    const {id} = useParams()

    useEffect(()=>{
      setLoading(true)
        fetchApi().then(()=>{
          setLoading(false)
        })
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
    <div className="container mt-5">
   {loading? <Loader /> : <MultiStepForm questions={data?.surveyQuestions} surveyTitle={data?.name} surveyDescription={data?.description}/> }
    </div>
    </>
}

export default Survey
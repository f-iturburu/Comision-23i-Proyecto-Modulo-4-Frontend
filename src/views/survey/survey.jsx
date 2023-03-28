import { useEffect, useState } from "react"
import { useParams } from 'react-router-dom';
import MultiStepForm from "./components/useMultiStepForm";
import Loader from "../../components/loader/loader";
import axios from "axios";

const Survey = ({URL,token}) =>{
    const [data, setData] = useState()
    const [loading, setLoading] = useState()
    const [error,setError] = useState(false)
    const [formDisabled,setFormDisabled] = useState(false)
    const {id} = useParams()

    useEffect(()=>{
      setLoading(true)
        fetchApi().then(()=>{
          setLoading(false)
        })
    },[])


  const fetchApi = async ()=>{
    setError(false)
    setFormDisabled(false)
    try{
          const res = await axios.get(`${URL}/survey/${id}/answers/me`,{
          headers:{
            "Content-Type": "application/json",
            'auth-token': token.token
          },
        })
          if (res.status == 200) {
            const data = res.data; 
            setData(data) 
            if (data.surveyQuestions[0].userAnswers.length > 0) {
              setFormDisabled(true)
            }
          
          }
    }catch(error){
      setError(true)
    }
  }

  const RenderHandler =() =>{
      if(error){
      return <h1>Error</h1>
    } else if (loading){
        return <Loader />
    }
   return <MultiStepForm questions={data?.surveyQuestions} surveyTitle={data?.name} surveyDescription={data?.description} URL={URL} token={token} formDisabled={formDisabled}/>
  }

    return <>
    <div className="container mt-5">
      <RenderHandler />
    </div>
    </>
}

export default Survey
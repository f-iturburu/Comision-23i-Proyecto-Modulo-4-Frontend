import { useEffect, useState } from "react"
import { useParams } from 'react-router-dom';
import MultiStepForm from "./components/useMultiStepForm";
import Loader from "../../components/loader/loader";
import axios from "axios";
import todayDate from "../../helpers/todayDate";
import compareDates from "../../helpers/compareDates";
import { Image } from "react-bootstrap";
import Wave from "react-wavify";
import css from './components/survey.css'

const Survey = ({URL,token}) =>{
    const [data, setData] = useState()
    const [loading, setLoading] = useState()
    const [error,setError] = useState(false)
    const [formDisabled,setFormDisabled] = useState(false)
    const [formDisabledExpiredDate,setFormDisabledExpiredDate] = useState()
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
    setFormDisabledExpiredDate(false)
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

            if(compareDates(data.endDate?.slice(0,10),todayDate())){
              setFormDisabledExpiredDate(true)
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
   return <MultiStepForm questions={data?.surveyQuestions} surveyTitle={data?.name} surveyDescription={data?.description} URL={URL} token={token} formDisabled={formDisabled} formDisabledExpiredDate={formDisabledExpiredDate}/>
  }

    return <>
          <div className='bannerContainer'>
<Image
className="mb-2 mt-2"
style={{maxHeight:'12vh'}}
fluid={true}
src="/assets/img/survey/responder encuesta negro.png"
/>
</div>
<Wave  fill='#7531f9'
style={{transform:'rotateX(180deg)'}}
paused={false} options={{
height: 15,
amplitude: 50,
speed: 0.15,
points: 5,}} />;
    <div className="container mt-5 survey-form" style={{minHeight:'32vh'}}>
      <RenderHandler />
    </div>
    </>
}

export default Survey
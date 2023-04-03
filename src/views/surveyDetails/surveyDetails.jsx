import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import QuestionComponentSurveyDetails from "./components/questionComponentSurveyDetails";
import Loader from '../../components/loader/loader'
import { Container } from "react-bootstrap";
import SurveyActivity from "./components/SurveyActivityChart";
import {Image} from "react-bootstrap";
import Wave from "react-wavify";


function SurveyDetails({ URL, token }) {
  const [data, setData] = useState();
  const [error, setError] = useState(false)
  const [components,setComponents] = useState()
  const [loader, setLoader] = useState()
  const { id } = useParams();

  useEffect(() => {
    setLoader(true)
    fetchApi().then(()=>{
      setLoader(false)
    })
  }, []);

  useEffect(()=>{
    setComponents(data?.surveyQuestions.map((i)=> <QuestionComponentSurveyDetails key={i._id} questionNumber={data.surveyQuestions.indexOf(i)+1} question={i} />))
  },[data])

  const fetchApi = async () => {
    try {
      const res = await axios.get(`${URL}/survey/${id}`, {
        headers: {
          "Content-Type": "application/json",
          "auth-token": token.token,
        },   
      });

      if (res.status == 200) {
            let data = res.data
            setData(data)
      }
    } catch (error) {
      setError(true)
    }
  };

  const RenderHandler = () =>{
    if (loader) {
      return <Loader/>
    } else if(error){
      return <div className="text-center">
      <Image fluid={true} src="/src/assets/img/Error message/error1.png" />
    </div>
    }else if(data?.surveyQuestions[0].userAnswers.length == 0){
   return <div className="text-center">
     <Image fluid={true} src="/src/assets/img/survey with no answers/Vaya, parece que no has creado una encuesta todavía.png" />
   </div>
   
    }else{
      return <div className="glass-bg p-5">
        <div className="d-md-flex w-100 border-bottom mt-3">
        <h4 className="me-auto w-75 text-light fw-bold">{data?.name}</h4>
          <p className="text-light"><i className="mx-1 bi bi-clock"></i> Fecha de subida  <span className="text-muted fw-bold">{data?.createDate.slice(0,10)} </span></p>
        </div>
        {components}
        <SurveyActivity questions={data}/>
      </div>
    }
  }
  return <>
          <div className='bannerContainer'>
<Image
className="mb-2 mt-2"
style={{maxHeight:'12vh'}}
fluid={true}
src="/src/assets/img/Survey details/Información detallada negro.png"
/>
</div>
<Wave  fill='#7531f9'
style={{transform:'rotateX(180deg)'}}
paused={false} options={{
height: 15,
amplitude: 50,
speed: 0.15,
points: 5,}} />;
  <Container className="survey-details-components" style={{minHeight:'40vh'}}>
     <RenderHandler/>
</Container>
  </>
}

export default SurveyDetails;

import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import QuestionComponentSurveyDetails from "./components/questionComponentSurveyDetails";
import Loader from '../components/loader/loader'
import { Container } from "react-bootstrap";
import SurveyActivity from "./components/SurveyActivityChart";

function SurveyDetails({ URL, token }) {
  const [data, setData] = useState();
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
        console.log(error);
    }
  };

  const RenderHandler = () =>{
    if (loader) {
      return <Loader/>
    } else{
      return <div>
        <div className="d-md-flex w-100 border-bottom mt-3">
        <h4 className="me-auto w-75">{data?.name}</h4>
          <p><i className="mx-1 bi bi-clock"></i> Fecha de subida  <span className="text-muted">{data?.createDate.slice(0,10)} </span></p>
        </div>
        {components}
        <SurveyActivity questions={data}/>
      </div>
    }
  }
  return <>
  <Container >
     <RenderHandler/>
     
</Container>
  </>
}

export default SurveyDetails;

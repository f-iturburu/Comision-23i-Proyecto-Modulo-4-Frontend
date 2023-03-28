import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import QuestionComponentSurveyDetails from "./components/questionComponentSurveyDetails";
import Loader from '../components/loader/loader'
import { Container } from "react-bootstrap";


function SurveyDetails({ URL, token }) {
  const [data, setData] = useState();
  console.log(data);
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
    setComponents(data?.surveyQuestions.map((i)=> <QuestionComponentSurveyDetails key={i._id} question={i} />))
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
        <div className="d-flex w-100">
        <h4 className="me-auto">{data?.name}</h4>
          <h5><i className="mx-1 bi bi-clock"></i> Fecha de subida  <span className="text-muted">{data?.createDate.slice(0,10)} </span></h5>
        </div>
        {components}
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

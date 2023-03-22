import React, { useEffect, useState } from 'react';
import Row from 'react-bootstrap/Row';
import SurveyCard from './components/surveyCard';
import { Pagination } from 'antd';

const Home = () => {
const [surveys,setSurveys] = useState()
const [surveysComponents,setSurveysComponents] = useState([])
const [currentPage, setCurrentPage] = useState(1);
    
useEffect(()=>{
    fetchApi()
    },[])


    const fetchApi = async () =>{
        try {
            const response = await fetch('https://comision-23i-proyecto-modulo-4-backend.onrender.com/surveys/active', {
              method: 'POST',
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                name: "",
                categories: []
              })
            });
      
            const data = await response.json();
            setSurveys(data);
            setSurveysComponents(data.map((i) => (
              <SurveyCard
              surveyTitle={i.name}
              surveyCategory={i.categories[0]}
              id={i._id}
              surveyEndDate={i?.endDate}
              />
            )).reverse());
          } catch (error) {
            console.error(error);
          }
        };
      

        const pageSize = 4;
        const startIndex = (currentPage - 1) * pageSize;
        const endIndex = startIndex + pageSize;
        const currentPageSurveys = surveysComponents.slice(startIndex, endIndex);
    return (
        <div className='container mt-5 '>        
        <div className=' d-flex flex-column'>
            {currentPageSurveys}
        </div>
<div className='d-flex justify-content-end me-5'>
        <Pagination
        current={currentPage}
        pageSize={pageSize}
        total={surveysComponents.length}
        onChange={(page) => setCurrentPage(page)}
        className="ms-auto"
      />
  
</div>
        </div>
    );
};

export default Home;
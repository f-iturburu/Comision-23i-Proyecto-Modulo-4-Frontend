import { useState } from "react";
import SurveysTable from "./components/MySurveysTable";
import { Button } from "antd";
import { Link } from "react-router-dom";

function MySurveys({URL,token}) {
   return (
      <div className="container mt-4">
         <div className="d-flex">
         <Link className="text-decoration-none text-dark ms-auto mb-2" to={'/survey/newsurvey'}> <Button className="" variant="primary" >  Añadir nueva encuesta
        </Button></Link>
         </div>
         <SurveysTable URL={URL} token={token}/>
      </div>
   )
}

export default MySurveys
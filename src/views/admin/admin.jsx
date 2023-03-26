import { useState } from "react";
import SurveysTable from "./components/MySurveysTable";
import { Button } from "antd";
import { Link } from "react-router-dom";

function AdminView() {
   const [fetchApi, setFetchApi] = useState(true)

   return (
      <div className="container mt-4">
         <div className="d-flex">
         <Link className="text-decoration-none text-dark ms-auto mb-2" to={'/survey/newsurvey'}> <Button className="" variant="primary" >  Añadir nueva encuesta
        </Button></Link>
         </div>
         <SurveysTable fetchApi={fetchApi} setFetchApi={setFetchApi} />
      </div>
   )
}

export default AdminView
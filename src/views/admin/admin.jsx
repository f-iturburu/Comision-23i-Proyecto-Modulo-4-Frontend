import { useState } from "react";
import CreateNewSurvey from "./components/CreateSurveyModal";
import SurveysTable from "./components/MySurveysTable";
import css from "./admin.css"

function AdminView() {
   const [fetchApi, setFetchApi] = useState(true)

   return (
      <div className="container">
         <CreateNewSurvey setFetchApi={setFetchApi} />
         <SurveysTable fetchApi={fetchApi} setFetchApi={setFetchApi} />
      </div>
   )
}

export default AdminView
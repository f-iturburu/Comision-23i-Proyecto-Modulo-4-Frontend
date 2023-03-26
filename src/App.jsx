import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navigation from "./layouts/Navigation";
import About from "./views/about/About";
import Contact from "./views/contact/Contact";
import Home from "./views/home/Home";
import Login from "./views/login/login";
import Register from "./views/register/register";
import Survey from "./views/survey/survey";
import AdminView from "./views/admin/admin";
import CreateNewSurveyForm from "./views/createSurvey/components/CreateSurvey";
const App = () => {
  return (
    <BrowserRouter>
      <Navigation/>
      <main>
       <Routes>
         <Route exact path="" element= {<Home/>}/>
         <Route exact path="/about" element= {<About/>}/>
         <Route exact path="/surveys" element= {<AdminView/>}/>
         <Route exact path="/survey/newsurvey" element= {<CreateNewSurveyForm/>}/>
         <Route exact path="/contact" element= {<Contact/>}/>
         <Route exact path="/login" element= {<Login/>}/>
         <Route exact path="/register" element= {<Register/>}/>
         <Route exact path="/survey/:id" element= {<Survey/>}/>
       </Routes>
     </main>
    </BrowserRouter>


  )
};

export default App
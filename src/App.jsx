import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navigation from "./layouts/Navigation";
import About from "./views/about/About";
import CreateQuestionSurvey from "./views/admin/components/CreateSurveyModal";
import Contact from "./views/contact/Contact";
import Home from "./views/home/Home";
import Login from "./views/login/login";
import Register from "./views/register/register";
import AdminView from "./views/admin/admin";


const App = () => {
  return (
    <BrowserRouter>
      <Navigation/>
      <main>
       <Routes>
         <Route exact path="" element= {<Home/>}/>
         <Route exact path="/about" element= {<About/>}/>
         <Route exact path="/surveys" element= {<AdminView/>}/>
         <Route exact path="/contact" element= {<Contact/>}/>
         <Route exact path="/login" element= {<Login/>}/>
         <Route exact path="/register" element= {<Register/>}/>

       </Routes>
     </main>
    </BrowserRouter>


  )
};

export default App
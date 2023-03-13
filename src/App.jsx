import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navegation from "./layouts/Navigation";
import About from "./views/about/About";
import Contact from "./views/contact/Contact";
import Home from "./views/home/Home";
import Login from "./views/login/login";
import Register from "./views/register/register";
import Surveys from "./views/surveys/Surveys";


const App = () => {
  return (
    <BrowserRouter>
      <Navegation/>
      <main>
       <Routes>
         <Route exact path="/" element= {<Home/>}/>
         <Route exact path="/about" element= {<About/>}/>
         <Route exact path="/survays" element= {<Surveys/>}/>
         <Route exact path="/contact" element= {<Contact/>}/>
         <Route exact path="/login" element= {<Login/>}/>
         <Route exact path="/register" element= {<Register/>}/>

       </Routes>
     </main>
    </BrowserRouter>
  )
};

export default App
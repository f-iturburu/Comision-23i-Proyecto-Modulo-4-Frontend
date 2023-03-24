import React from "react";
import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navigation from "./layouts/Navigation";
import ProtectedRoute from "./routes/ProtectedRoutes";
import About from "./views/about/About";
import Contact from "./views/contact/Contact";
import Error404 from "./views/error404/Error404";
import Home from "./views/home/Home";
import Login from "./views/login/login";
import Register from "./views/register/register";
import Survey from "./views/survey/survey";
import AdminView from "./views/admin/admin";


const App = () => {
 /*  const [loggedUser, setLoggedUser] = useState({}); */ // como deberia ser con el usuario logueado

 //simulación de login de usuario
 const [user, setUser] = useState(null);

  const login2 = () =>
    setUser({
      id: 1,
      name: "Lucas",
      roles: ["admin"], // si esta vacio o nulo es usuario común sino cargar admin
    });
  const logout = () => setUser(null);

 

  return (
    <BrowserRouter>
      <Navigation /* loggedUser={loggedUser} setLoggedUser={setLoggedUser} */ />
      <main>
       <Routes>
         <Route exact path="" element= {<Home/>}/>
         <Route exact path="/about" element= {<About/>}/>

         <Route element={<ProtectedRoute isAllowed={!!user} />}>
        </Route>
           <Route exact path="/surveys" element= {<AdminView/>}/>
         <Route exact path="/survey/:id" element= {<Survey/>}/>
           
         {/* <Route
          path="/admin"
          element={
            <ProtectedRoute
              redirectTo="/login"
              isAllowed={!!user && user.roles.includes("admin")}
            >
              <AdminView/>
            </ProtectedRoute>
          }
        /> */}
         {/* <Route exact path="/admin" element={<Admin />} /> */}
         <Route exact path="/login" element= {<Login /* setLoggedUser={setLoggedUser} *//>}/>
         <Route exact path="/register" element= {<Register /* setLoggedUser={setLoggedUser} *//>}/>
         <Route exact path="*" element={<Error404 />} />

       </Routes>
     </main>
    </BrowserRouter>


  )
};

export default App
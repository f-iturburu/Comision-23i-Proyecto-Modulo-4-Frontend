import React from "react";
import { useState } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
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

import CreateNewSurveyForm from "./views/createSurvey/components/CreateSurvey";

import Surveys from "./views/surveys/surveys";
import Footer from "./layouts/Footer";

const App = () => {
  const [loggedUser, setLoggedUser] = useState({}); // como deberia ser con el usuario logueado

  // const URL = process.env.REACT_APP_API_ROLLINGSURVEYS;

  //simulación de login de usuario desconectado para conectar la api
  /* const [user, setUser] = useState(null);

  const login2 = () =>
    setUser({
      id: 1,
      name: "Lucas",
      roles: ["admin"], // si esta vacio o nulo es usuario común sino cargar admin
    });
  const logout = () => setUser(null); */

  return (
    <BrowserRouter>
      <Navigation
        loggedUser={loggedUser}
        setLoggedUser={setLoggedUser}
      />

      {
        //desconectado para conectar api
        /*  {user ? (
        <button onClick={logout}>Logout</button>
      ) : (
        <button onClick={login2}>Login</button>
      )} */
      }

      <main>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/about" element={<About />} />
          <Route
            path="/surveys"
            element={
              <ProtectedRoute
                redirectTo="/login"
                token={
                  !!loggedUser && loggedUser?.role?.includes("97ef6616832542a88d5a4aecf9528234")
                }>
                <Surveys/>
              </ProtectedRoute>
            }
          />
          {/*  <Route element={<ProtectedRoute token={!!loggedUser} />}>
           <Route exact path="/surveys" element= {<Surveys/>}/>
        </Route> */}


          <Route
            exact
            path="/contact"
            element={<Contact />}
          />
          <Route
            path="/admin"
            element={
              <ProtectedRoute
                redirectTo="/login"
                token={
                  !!loggedUser && loggedUser?.role?.includes("97ef6616832542a88d5a4aecf9528234")
                }>
                <AdminView />
              </ProtectedRoute>
            }
          />
          <Route
            exact
            path="/login"
            element={
              <Login setLoggedUser={setLoggedUser} />
            }
          />
          <Route
            exact
            path="/register"
            element={
              <Register setLoggedUser={setLoggedUser} />
            }
          />
          <Route exact path="*" element={<Error404 />} />
        </Routes>
      </main>
      <Footer/>

    </BrowserRouter>
  );
};

export default App;

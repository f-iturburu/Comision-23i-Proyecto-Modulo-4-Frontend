import React from "react";
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
import Login from "./views/login/Login";
import Register from "./views/register/register";
import Survey from "./views/survey/survey";
import AdminView from "./views/admin/admin";
import CreateNewSurveyForm from "./views/createSurvey/components/CreateSurvey";
import Footer from "./layouts/Footer";

const ADMIN_LOGIN_KEY = import.meta.env.VITE_ADMIN_LOGIN_KEY;
const USER_LOGIN_KEY = import.meta.env.VITE_USER_LOGIN_KEY;
const URL = import.meta.env.VITE_BASE_API_URL;

const App = () => {
 const token = JSON.parse(localStorage.getItem("user-token")) || []

  return (
    <BrowserRouter>
      <Navigation
        adminLoginKey={ADMIN_LOGIN_KEY}
        userLoginKey={USER_LOGIN_KEY}
      />

      <main>
        <Routes>
          <Route exact path="/" element={<Home URL={URL}/>} />
          <Route exact path="/about" element={<About />} />
          <Route
            path="/survey/:id"
            element={
              <ProtectedRoute>
                <Survey URL={URL} token={token}/>
              </ProtectedRoute>
            }
          />
            <Route
            path="/survey/newsurvey"
            element={
              <ProtectedRoute>
                <CreateNewSurveyForm/>
              </ProtectedRoute>
            }
          />

          <Route
            exact
            path="/contact"
            element={<Contact />}
          />
          <Route
            path="/admin"
            element={
              <ProtectedRoute>
                <AdminView />
              </ProtectedRoute>
            }
          />
          <Route
            exact
            path="/login"
            element={
              <Login URL={URL} />
            }
          />
          <Route
            exact
            path="/register"
            element={
              <Register />
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

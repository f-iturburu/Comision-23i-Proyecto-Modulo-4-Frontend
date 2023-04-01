import React from "react";
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import Navigation from "./layouts/Navigation";
import ProtectedRoute from "./routes/ProtectedRoutes";
import ProtectedAdminRoute from "./routes/ProtectedAdminRoutes";
import About from "./views/about/About";
import Contact from "./views/contact/Contact";
import Error404 from "./views/error404/Error404";
import Home from "./views/home/Home";
import Login from "./views/login/Login";
import SignUp from "./views/signUp/signUp";
import Survey from "./views/survey/survey";
import MySurveys from "./views/mySurveys/mySurveys";
import AdminView from "./views/admin/admin";
import SurveyDetails from "./views/surveyDetails/surveyDetails";
import CreateNewSurveyForm from "./views/createSurvey/components/CreateSurvey";
import Footer from "./layouts/Footer";
import UserDashboard from "./views/userDashboard/userDashboard";



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
                <CreateNewSurveyForm URL={URL} token={token}/>
              </ProtectedRoute>
            }
          />

          <Route
            exact
            path="/contact"
            element={<Contact />}
          />
          <Route
            path="/mysurveys"
            element={
              <ProtectedRoute>
                <MySurveys URL={URL} token={token}/>
              </ProtectedRoute>
            }
          />
            <Route
            path="/survey/details/:id"
            element={
              <ProtectedRoute>
                <SurveyDetails URL={URL} token={token}/>
              </ProtectedRoute>
            }
          />
            <Route
            path="/userdashboard"
            element={
              <ProtectedRoute>
                <UserDashboard URL={URL} token={token}/>
              </ProtectedRoute>
            }
          />
            <Route
            path="/admin"
            element={
              <ProtectedAdminRoute>
                <AdminView URL={URL} token={token}/>
              </ProtectedAdminRoute>
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
            path="/signup"
            element={
              <SignUp URL={URL}/>
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

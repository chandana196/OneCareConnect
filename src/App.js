import './App.css';
import { useState, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import Signin from './Componants/SignIn';
import Signup from './Componants/Signup';
import ForgotPassword from './Componants/ForgotPassword';
import ProfilePage from './Componants/ProfilePage';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import HomePage from './Componants/Home';
import PatientSignup from './Componants/PatientSignup';
import PatientProfile from './Componants/PatientProfile';
import PrivateRoute from './Componants/PrivateRoute';

function App() {
  const [isSignedIn, setIsSignedIn] = useState(null);

  useEffect(() => {
    const encryptedUserId = sessionStorage.getItem('userId');
    if (encryptedUserId) {
      setIsSignedIn(true);
    } else {
      setIsSignedIn(false);
    }
  }, []);

  // Avoid rendering routes until isSignedIn is determined
  if (isSignedIn === null) {
    return null; // Or a loading spinner
  }

  return (
    <div style={{ display: 'flex', justifyContent: 'center' }}>
      <ToastContainer />
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/Signin' element={<Signin />} />
        <Route path='/Signup' element={<Signup />} />
        <Route path='/ForgotPassword' element={<ForgotPassword />} />

        {/* Protect these routes */}
        <Route path='/Profile' element={
          <PrivateRoute isSignedIn={isSignedIn}>
            <ProfilePage />
          </PrivateRoute>
        } />
        <Route path='/PatientSignup' element={
          <PrivateRoute isSignedIn={isSignedIn}>
            <PatientSignup />
          </PrivateRoute>
        } />
        <Route path='/PatientProfile/:patientId' element={
          <PrivateRoute isSignedIn={isSignedIn}>
            <PatientProfile />
          </PrivateRoute>
        } />
      </Routes>
    </div>
  );
}

export default App;

import './App.css';
import {Route, Routes} from "react-router-dom";
import Signin from './Componants/SignIn';
import Signup from './Componants/Signup';
import ForgotPassword from './Componants/ForgotPassword';
import ProfilePage from './Componants/ProfilePage';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import HomePage from './Componants/Home';
import PatientRegd from './Componants/PatientRegd';


function App() {
  return (
    <div style={{display: 'flex', justifyContent: 'center'}}>
      <ToastContainer />
      <Routes>
          <Route path='/' element={<HomePage />}/>
          <Route path='/Signin' element={<Signin />}/>
          <Route path='/Signup' element={<Signup />}/>
          <Route path='/ForgotPassword' element={<ForgotPassword />}/> 
          <Route path='/Profile' element={<ProfilePage />} />  
          <Route path='/PatientRegd' element={<PatientRegd />} />     
      </Routes>     
    </div>
  );
}

export default App;

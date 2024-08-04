import logo from './logo.svg';
import './App.css';
import {BrowserRouter , Router , Route , Routes} from "react-router-dom"
import Home from "./Pages/Home"
import Signup from './Pages/Signup';
import Newuser from './Pages/Newuser';
import Navbar from './components/Navbar';
import ForgotPassword from './Pages/ForgotPassword';
import ResetPssword from './Pages/ResetPssword';
import Verifymail from './Pages/Verifymail';
import Aboutus from './Pages/Aboutus';
import Dashboard from './Pages/Dashboard';


function App() {
  return (
    
    <div className="bg-richblack-900  min-h-screen">
      <BrowserRouter>
      <Navbar/>
     <Routes>
       
          <Route path="/" element={<Home/>}/>
         
          <Route path="/login" element={<Signup/>}/>
          <Route path="/signup" element={<Newuser/>}/>
          <Route path="/forgotPassword" element={<ForgotPassword/>}/>
          <Route path="/reset-password/:id" element={<ResetPssword/>}/>
          <Route path="/verify-mail" element={<Verifymail/>}/>
          <Route path="/about" element={<Aboutus/>}/>
          <Route path ="/dashboard"  element={<Dashboard/>}/>

        
     </Routes>
     </BrowserRouter>
    </div>
   
  );
}

export default App;

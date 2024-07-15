import logo from './logo.svg';
import './App.css';
import {BrowserRouter , Router , Route , Routes} from "react-router-dom"
import Home from "./Pages/Home"
import Signup from './Pages/Signup';
import Newuser from './Pages/Newuser';


function App() {
  return (
    
    <div className="bg-slate-900  min-h-screen">
      <BrowserRouter>
     <Routes>
       
          <Route path="/" element={<Home/>}/>
          <Route path="/login" element={<Signup/>}/>
          <Route path="/signup" element={<Newuser/>}/>

        
     </Routes>
     </BrowserRouter>
    </div>
   
  );
}

export default App;

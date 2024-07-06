import logo from './logo.svg';
import './App.css';
import {BrowserRouter , Router , Route , Routes} from "react-router-dom"
import Home from "./Pages/Home"


function App() {
  return (
    
    <div className="bg-slate-900 flex flex-col w-screen  items-center min-h-screen">
      <BrowserRouter>
     <Routes>
       
          <Route path="/" element={<Home/>}/>

        
     </Routes>
     </BrowserRouter>
    </div>
   
  );
}

export default App;

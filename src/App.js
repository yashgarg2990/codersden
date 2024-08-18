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
import PrivateRoute from './components/auth/PrivateRoute';
import MyProfile from './components/Dashboard/MyProfile';
import Settings from './components/Dashboard/settings/Settings';
import EnrolledCourses from './components/Dashboard/EnrolledCourses';
import { ACCOUNT_TYPE } from './utils/constants';
import { useSelector } from 'react-redux';
import AddCourse from './components/Dashboard/addcontent/AddCourse';
import MyCourses from './components/Dashboard/MyCourses';
import EditCourse from './components/Dashboard/editcrse/EditCourse';




function App() {
  const {user} = useSelector((state) => state.profile);

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
          <Route
           element={ <PrivateRoute>
            <Dashboard/>
         </PrivateRoute>}>
         
         <Route path ="/dashboard/my-profile"  element={<MyProfile/>}/>
         <Route path ="/dashboard/settings" element ={<Settings/>}/>
         {
        user?.AccountType === ACCOUNT_TYPE.STUDENT && (
          <>
          {/* <Route path="dashboard/cart" element={<Cart />} /> */}
          <Route path="dashboard/enrolled-courses" element={<EnrolledCourses />} />
          </>
        )
      }

      {
        user?.AccountType === ACCOUNT_TYPE.INSTRUCTOR && (
          <>
         
          <Route path="dashboard/add-course" element={<AddCourse />} />
          <Route path="dashboard/my-courses" element = {<MyCourses/>}/>
          <Route path="dashboard/edit-course/:courseId" element={<EditCourse/>} />
          
          </>
        )
      }
          </Route>
          
          

        
     </Routes>
     </BrowserRouter>
    </div>
   
  );
}

export default App;

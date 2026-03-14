import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'

import {BrowserRouter, Routes, Route} from 'react-router-dom';
import UserLayout from './copmonents/user/UserLayout';
import Home from './copmonents/user/pages/Home';
import Services from './copmonents/user/pages/Services';
import Appointment from './copmonents/user/pages/Appointment';
import Team from './copmonents/user/pages/Team';
import Contact from './copmonents/user/pages/Contact';

import AdminLayout from './copmonents/admin/AdminLayout';
import Dashboard from './copmonents/admin/pages/Dashboard';
import AdminServices from './copmonents/admin/pages/AdminServices';
import AdminTeam from './copmonents/admin/pages/Team';


import ForgotPassword from './copmonents/user/pages/ForgotPassword';
import GuestLayout from './copmonents/guest/GuestLayout';
import GuestTeam from './copmonents/guest/Team';
import GuestServices from './copmonents/guest/Services';
import GuestHome from './copmonents/guest/Home';
import GuestContact from './copmonents/guest/Contact';
import Register from './copmonents/guest/Register';
import Login from './copmonents/guest/Login';
import AdminUsers from './copmonents/admin/pages/Users';
import AdminAppointments from './copmonents/admin/pages/Appointments';

function App() {
  return (
    <div>
      <BrowserRouter>
      <Routes>
        <Route path='/' element= {< GuestLayout/>}>
          <Route path='/home' element={<GuestHome/>} />

          <Route index element={<GuestHome />} />
          <Route path ='/register' element = {<Register/>} />
          <Route path ='/login' element ={<Login/>} />
          <Route path ='/forgot-password' element ={<ForgotPassword/>} />
          <Route path ='/team' element ={<GuestTeam/>} />
          <Route path ='/services' element ={<GuestServices/>} />
          <Route path ='/contact' element ={<GuestContact/>} />
        </Route>

        <Route path='/user' element= {< UserLayout/>}>
          <Route path='/user/Home' element={<Home/>} />
          <Route index element={<Home />} />
          <Route path='/user/services' element={<Services />} />
          <Route path = '/userappointment' element= {<Appointment />} />
          <Route path = '/user/team' element= {<Team />} />
          <Route path ='/user/contact' element= {<Contact />} />
       
        </Route>

        {/* ----------Admin Layout--------------  */}
        <Route path='/admin' element={< AdminLayout/>}>
        <Route index element ={<Dashboard />} />
          <Route path ='/admin/appointments' element ={<AdminAppointments/>} />
          <Route path ='/admin/dashboard' element ={<Dashboard/>} />
          <Route path ='/admin/services' element ={<AdminServices/>} />
          <Route path ='/admin/team' element ={<AdminTeam/>} />
          <Route path='/admin/users' element={<AdminUsers />} />



        </Route>
      </Routes>
    </BrowserRouter>
    </div>
  );
}

export default App;

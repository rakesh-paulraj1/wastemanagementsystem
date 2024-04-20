// App.tsx
import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import { Login } from './commonpages/LoginUA.tsx'
import {AdminDashboard} from './adminpages/AdminDashboard.tsx';
import {Adduser} from './adminpages/Adduser.tsx';
import { Complaints } from './adminpages/AllComplaints.tsx';
import { AllAreas } from './adminpages/AllAreas.tsx';
import {Userdashboard} from './userpages/Userdashboard.tsx'
import { UserComplaint } from './userpages/UserComplaint.tsx';

const App: React.FC = () => {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/admindashboard" element={<AdminDashboard />} />
      <Route path="/adduser" element={<Adduser/>} />
      <Route path="allcomplaints" element={<Complaints/>}/>
      <Route path="allareas" element={<AllAreas/>}/>
      <Route path="/userdashboard" element={<Userdashboard/>}/>
      <Route path="/addcomplaint" element={<UserComplaint/>}/>
      
    </Routes>
  </BrowserRouter>
  );
}
export default App

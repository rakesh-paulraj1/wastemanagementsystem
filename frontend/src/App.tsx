// App.tsx
import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import { Login } from './pages/LoginUA'
import {AdminDashboard} from './pages/AdminDashboard';
import {Adduser1} from './pages/Adduser1.tsx';
import { Complaints } from './pages/AllComplaints.tsx';
import { AllAreas } from './pages/AllAreas.tsx';

const App: React.FC = () => {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/admindashboard" element={<AdminDashboard />} />
      <Route path="/adduser" element={<Adduser1 />} />
      <Route path="allcomplaints" element={<Complaints/>}/>
      <Route path="allareas" element={<AllAreas/>}/>
    </Routes>
  </BrowserRouter>
  );
}
export default App

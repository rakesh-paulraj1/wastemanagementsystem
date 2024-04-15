// App.tsx
import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import { Login } from './pages/LoginUA'

const App: React.FC = () => {
  return (
    <BrowserRouter>
    <Routes>
      
      <Route path="/" element={<Login />} />
    </Routes>
  </BrowserRouter>
  );
}
export default App

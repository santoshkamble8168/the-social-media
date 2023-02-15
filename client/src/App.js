
import { useState } from 'react';
import {BrowserRouter, Navigate, Routes, Route} from 'react-router-dom'

import Home from 'pages/Home';
import Login from 'pages/Login';
import Profile from 'pages/Profile';

function App() {
  const mode = useState()
  return (
    <div className="app">
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Login />} />
          <Route path='/home' element={<Home />} />
          <Route path='/profile/:userId' element={<Profile />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

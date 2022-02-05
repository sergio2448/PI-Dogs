import './App.css';
import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import LandingPage from './components/landingPage/LandingPage';
import Home from './components/home/Home';
import Detail from './components/detail/Detail';
import Form from './components/form/Form';

function App() {
  return (
    <BrowserRouter>
      <div className='App'>
        <Routes>
            <Route path="/" element={<LandingPage/>} />
            <Route path="/home" element={<Home />} />
            <Route path="/form" element={<Form />} />
            <Route path="/detail/:id" element={<Detail />} />
          </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;

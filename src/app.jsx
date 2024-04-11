import React from 'react';
//import './app.css';
import { BrowserRouter, NavLink, Route, Routes } from 'react-router-dom';
import { Login } from './login';
import { Main } from './main';

export default function App() {
  return (
    <BrowserRouter>
        <Routes>
        <Route path='/' element={<Login />} exact />
        <Route path='/login' element={<Login />} />
        <Route path='/main' element={<Main />} />
        <Route path='*' element={<NotFound />} />
        </Routes>
    </BrowserRouter>
  );
}

function NotFound() {
    return <main className='container-fluid bg-secondary text-center'>404: Return to sender. Address unknown.</main>;
  }
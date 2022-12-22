import './App.css';
import React, { useContext, useEffect, useState } from 'react';
import { Routes, Route, Navigate } from "react-router-dom";
import MainPage from "./pages/mainPage/mainPage"
import Header from './components/navbar';
import AuthPage from './pages/authPage/authPage';
import RegisterPage from './pages/registerPage/registerPage';
import { MyContext } from './context/my-context/my-context';

const App = () => {
  const { login, token,  isReady } = useContext(MyContext)
  
  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("userData"))
    if (data && data.token) {
      login(data.token, data.userId)
    }
  }, [])

  if(isReady !== null) {
    return <AuthPage/>
  }
  
  return (
    <div className="app">
      <Header />
      <MainPage/>
    </div>
  );
}

export default App;

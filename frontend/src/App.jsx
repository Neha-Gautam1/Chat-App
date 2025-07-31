import { useState } from 'react'
import './App.css';
import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import {Left} from "./home/left/Left";
import {Right} from "./home/right/Right";
import {Logout} from "./home/left1/Logout";
import Signup from "./components/Signup";
import { Login } from './components/Login';
import { useAuth } from './context/AuthProvider';
import Loading from "./components/Loading";
import toast, {Toaster} from "react-hot-toast";

function App() {
  const [authUser, setAuthUser] = useAuth();
  console.log("Auth User:", authUser);

  return (
    <>
    <Routes>
      <Route path="/" element={
        authUser?<div className='h-screen  flex '>
      <Logout/>
      <Left />
      <Right />
    </div>: <Navigate to="/login" />
        }/>
      <Route path="/login" element={authUser?<Navigate to="/" />:<Login/>}/>
      <Route path="/signup" element={authUser?<Navigate to="/" />:<Signup/>}/>
    </Routes>
<Toaster/>
    </>
  )
}

export default App

import React, { useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/home";
import Auth from "./pages/auth";
import { getCurrentUser } from "./services/api";
import { useDispatch, useSelector } from "react-redux";
import History from "./pages/History";
import Notes from "./pages/Notes";
import Pricing from "./pages/Pricing";

export const serverUrl = "http://localhost:8000"

function App() {
  const dispatch = useDispatch()
  useEffect(() => {
    getCurrentUser(dispatch)
  }, [dispatch])

  const {userData} = useSelector((state) => state.user)
  return(
    <>
    <Routes>
      <Route path="/" element={userData ? <Home/> : <Navigate to="/auth" replace/>} />
      <Route path="/auth" element={userData ? <Navigate to="/" replace/> : <Auth/>} />
      <Route path="/history" element={userData ? <History/> : <Auth/>} />
      <Route path="/notes" element={userData ? <Notes/> : <Auth/>} />
      <Route path="/pricing" element={userData ? <Pricing/> : <Auth/>} />
    </Routes>
    </>
  )
}

export default App
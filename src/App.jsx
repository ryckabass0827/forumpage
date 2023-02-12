import React from "react";
import Home from "./components/pages/Home";
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { AuthContextProvider } from "./context/AuthContext";

import Login from "./components/pages/Login"
import Register from "./components/pages/Register"


import "./App.css";

function App() {

  return (
    <AuthContextProvider>
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </BrowserRouter>
    </AuthContextProvider>

  );
}

export default App;

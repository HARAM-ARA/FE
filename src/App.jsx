import React from "react"
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/StudentHome.jsx";
import Store from "./pages/store.jsx";
import Selet from "./pages/Selet.jsx";


export default function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/store" element={<Store />} />
          <Route path="/selet" element={<Selet />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}



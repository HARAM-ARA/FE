import React from "react"
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/BeforeHome.jsx";
import Student from "./pages/StudentHome.jsx";
import Store from "./pages/store.jsx";
import Select from "./pages/Select.jsx";
import Teacher from "./pages/TeacherHome.jsx";
import Credits from "./pages/Credits.jsx";
import Enforce from "./pages/Enforce.jsx";
import TeamSpace from "./pages/TeamSpace.jsx";
import AdminStore from "./pages/AdminStore.jsx";


export default function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/std" element={<Student/>}/>
          <Route path="/store" element={<Store />} />
          <Route path="/select" element={<Select />} />
          <Route path="/tch" element={<Teacher/>} />
          <Route path="/credits" element={<Credits />}/>
          <Route path="/enforce" element={<Enforce />}/>
          <Route path="/teams" element={<TeamSpace />}/>
          <Route path="/adminstore" element={<AdminStore />}/>
        </Routes>
      </BrowserRouter>
    </>
  )
}



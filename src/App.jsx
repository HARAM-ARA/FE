import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CreditProvider } from "./context/CreditContext.jsx";
import AuthConfirm from "./components/AuthConfirm.jsx";
import Home from "./pages/BeforeHome.jsx";
import Student from "./pages/StudentHome.jsx";
import Store from "./pages/Store.jsx";
import Select from "./pages/Select.jsx";
import Teacher from "./pages/TeacherHome.jsx";
import Credits from "./pages/Credits.jsx";
import Enforce from "./pages/Enforce.jsx";
import TeamSpace from "./pages/TeamSpace.jsx";
import AdminStore from "./pages/AdminStore.jsx";
import AuthCallback from "./pages/AuthCallback.jsx";
import DinoGame from "./pages/Dino.jsx";
import RandomTeamGenerator from "./pages/RandomTeamGenerator.jsx";
import TimerHome from "./pages/TimerHome.jsx";
import TeacherTimer from "./pages/TeacherTimer.jsx";
import MyTeam from "./pages/MyTeam.jsx";
import StudentPurchases from "./pages/StudentPurchases.jsx";
import TeacherPurchases from "./pages/TeacherPurchases.jsx";
import Roulette from "./pages/Roulette.jsx";

export default function App() {
  return (
    <>
      <BrowserRouter>
        <CreditProvider>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/haram/auth" element={<AuthCallback />} />
            <Route path="/haram/auth/callback" element={<AuthCallback />} />
            <Route path="/timer" element={<TimerHome />} />
            <Route path="/tch/timer" element={<AuthConfirm requiredRole="teacher"><TeacherTimer /></AuthConfirm>} />
            
            <Route path="/std" element={<AuthConfirm allowedRoles={["student", "teamleader"]}><Student/></AuthConfirm>}/>
            <Route path="/std/team" element={<AuthConfirm allowedRoles={["student", "teamleader"]}><MyTeam /></AuthConfirm>} />
            <Route path="/std/purchases" element={<AuthConfirm allowedRoles={["student", "teamleader"]}><StudentPurchases /></AuthConfirm>} />
            <Route path="/store" element={<AuthConfirm allowedRoles={["student", "teamleader"]}><Store /></AuthConfirm>} />
            <Route path="/select" element={<AuthConfirm allowedRoles={["student", "teamleader"]}><Select /></AuthConfirm>} />
            <Route path="/roulette" element={<AuthConfirm allowedRoles={["student", "teamleader"]}><Roulette /></AuthConfirm>} />
            <Route path="/credits" element={<AuthConfirm requiredRole="teacher"><Credits /></AuthConfirm>}/>
            <Route path="/enforce" element={<AuthConfirm allowedRoles={["student", "teamleader"]}><Enforce /></AuthConfirm>}/>
            
            <Route path="/tch" element={<AuthConfirm requiredRole="teacher"><Teacher/></AuthConfirm>} />
            <Route path="/tch/purchases" element={<AuthConfirm requiredRole="teacher"><TeacherPurchases /></AuthConfirm>} />
            <Route path="/teams" element={<AuthConfirm requiredRole="teacher"><TeamSpace /></AuthConfirm>}/>
            <Route path="/teams/random" element={<AuthConfirm requiredRole="teacher"><RandomTeamGenerator /></AuthConfirm>}/>
            <Route path="/adminstore" element={<AuthConfirm requiredRole="teacher"><AdminStore /></AuthConfirm>}/>
            <Route path="/dino" element={<AuthConfirm allowedRoles={["student", "teamleader"]}><DinoGame /></AuthConfirm>}/>
          </Routes>
        </CreditProvider>
      </BrowserRouter>
    </>
  )
}

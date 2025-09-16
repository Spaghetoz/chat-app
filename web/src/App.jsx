import AppLayout from "./layouts/AppLayout";
import LandingLayout from "./layouts/LandingLayout";
import ChatPage from "./pages/ChatPage"
import HomePage from "./pages/HomePage"

import { BrowserRouter, Routes, Route } from "react-router";

export default function App() {
  
  return(
    <BrowserRouter>
      <Routes>
        <Route element={<AppLayout/>}>
          <Route path="/" element={<ChatPage/>} />
        </Route>

        <Route element={<LandingLayout/>}>
          <Route path="/home" element={<HomePage/>} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
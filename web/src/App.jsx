import AppLayout from "./layouts/AppLayout";
import LandingLayout from "./layouts/LandingLayout";

import ChatPage from "./pages/app/ChatPage"
import HomePage from "./pages/ui/HomePage"
import NotFoundPage from "./pages/ui/NotFoundPage"
import RegisterPage from "./pages/auth/RegisterPage";
import LoginPage from "./pages/auth/LoginPage";

import { BrowserRouter, Routes, Route } from "react-router";

import {ChatProvider} from "./features/chat/contexts/ChatContext"
import AuthLayout from "./layouts/AuthLayout";

export default function App() {
  
  return(
    <BrowserRouter>
      <Routes>
        <Route element={<AppLayout/>}>

          <Route path="/" element={
            <ChatProvider>
              <ChatPage/>
            </ChatProvider>
          }
          />

        </Route>

        <Route element={<LandingLayout/>}>
          <Route path="/home" element={<HomePage/>} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
        
        <Route element={<AuthLayout/>}>
          <Route path="/register" element={<RegisterPage/>}/>
          <Route path="/login" element={<LoginPage/>}/>
        </Route>
        
      </Routes>
    </BrowserRouter>
  )
}
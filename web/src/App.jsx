import { BrowserRouter, Routes, Route, Outlet } from "react-router";

import AppLayout from "./layouts/AppLayout";
import LandingLayout from "./layouts/LandingLayout";
import AuthLayout from "./layouts/AuthLayout";

import ChatPage from "./pages/app/ChatPage"
import HomePage from "./pages/ui/HomePage"
import NotFoundPage from "./pages/ui/NotFoundPage"
import RegisterPage from "./features/auth/pages/RegisterPage";
import LoginPage from "./features/auth/pages/LoginPage";
import LogoutPage from "./features/auth/pages/LogoutPage";

import PrivateRoute from "./features/auth/components/PrivateRoute";

import { AuthProvider } from "./features/auth/hooks/useAuth";
import { ChatProvider } from "./features/chat/contexts/ChatContext"

export default function App() {
  
  return(
    <AuthProvider>
      <BrowserRouter>
        <Routes>

          <Route element={<LandingLayout/>}>
            <Route path="/" element={<HomePage/>} />
            <Route path="*" element={<NotFoundPage />} />
          </Route>

          <Route element={<AppLayout/>}>
            <Route element={<PrivateRoute />}>
                <Route path="/app" element={
                  <ChatProvider><ChatPage/></ChatProvider>
                }/>
              </Route>
          </Route>
          
          <Route element={<AuthLayout/>}>
            <Route path="/register" element={<RegisterPage/>}/>
            <Route path="/login" element={<LoginPage/>}/>
            <Route path="/logout" element={<LogoutPage/>}></Route>
          </Route>
          
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}
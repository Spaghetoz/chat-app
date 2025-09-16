import AppLayout from "./layouts/AppLayout";
import LandingLayout from "./layouts/LandingLayout";
import ChatPage from "./pages/ChatPage"
import HomePage from "./pages/HomePage"

import NotFoundPage from "./pages/NotFoundPage"

import { BrowserRouter, Routes, Route } from "react-router";


import {ChatProvider} from "./features/chat/contexts/ChatContext"

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
        
      </Routes>
    </BrowserRouter>
  )
}
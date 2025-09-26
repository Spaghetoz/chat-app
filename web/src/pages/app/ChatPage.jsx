import { useContext, useEffect, useState } from "react";

import ChatWindow from "../../features/chat/components/ChatWindow/ChatWindow";
import { ChatContext } from "../../features/chat/contexts/ChatContext";
import ChatSidebar from "../../features/chat/components/ChatSidebar/ChatSidebar";

import Whiteboard from "@/features/whiteboard/Whiteboard";

export default function ChatPage() {

  const {chat, privateMessages} = useContext(ChatContext)
  
  const [showWhiteboard, setShowWhiteboard] = useState(false);

  return (
    <div className="h-screen flex bg-neutral-900 text-neutral-100">

      <div className="flex-1 flex">

        <ChatSidebar/>

        <div className="flex-1 flex flex-col">
          <ChatWindow 
            chatType=""
            toId=""
            messages={chat}
            onToggleWhiteboard={() => setShowWhiteboard(!showWhiteboard)} 
          />
        </div>

        {showWhiteboard && <Whiteboard/>}
      </div>
    </div>
  );
}

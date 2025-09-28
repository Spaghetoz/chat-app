import { useContext, useState } from "react";

import ChatWindow from "../../features/chat/components/ChatWindow/ChatWindow";
import { ChatContext } from "../../features/chat/contexts/ChatContext";
import ChatSidebar from "../../features/chat/components/ChatSidebar/ChatSidebar";

import WhiteboardWindow from "../../features/whiteboard/WhiteboardWindow";

export default function ChatPage() {

  const {chat, privateMessages} = useContext(ChatContext)
  
  const [showWhiteboard, setShowWhiteboard] = useState(false);

  return (
    <div className="h-screen flex bg-neutral-900 text-neutral-100">

      <div className="flex-1 flex">

        <ChatSidebar/>

        {showWhiteboard ?
          <WhiteboardWindow 
            onExit={() => setShowWhiteboard(false)}
          /> 
          : 
          <ChatWindow 
            chatType=""
            toId=""
            messages={chat}
            onToggleWhiteboard={() => setShowWhiteboard(!showWhiteboard)} 
          />
        }
      </div>
    </div>
  );
}

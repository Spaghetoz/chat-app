import { useContext } from "react";

import ChatWindow from "../../features/chat/components/ChatWindow/ChatWindow";
import { ChatContext } from "../../features/chat/contexts/ChatContext";
import ChatSidebar from "../../features/chat/components/ChatSidebar/ChatSidebar";
import RightSidebar from "../../features/chat/components/RightSidebar/RightSidebar"

export default function ChatPage() {

  const {chat, privateMessages} = useContext(ChatContext)

  return (
    <div className="h-screen flex bg-neutral-900 text-neutral-100">

      <div className="flex-1 flex">

        <ChatSidebar/>

        <div className="flex-1 flex flex-col">
          <ChatWindow 
            chatType=""
            toId=""
            messages={chat}/>
        </div>

        {/* TODO button to open/close from the chatwindow header */}
        <RightSidebar />
      </div>
    </div>
  );
}

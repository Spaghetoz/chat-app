import { useContext, useState } from "react";

import MemberList from "../../features/chat/components/MemberList";

import ChatWindow from "../../features/chat/components/ChatWindow/ChatWindow";
import { ChatContext } from "../../features/chat/contexts/ChatContext";
import ChatSidebar from "../../features/chat/components/ChatSidebar/ChatSidebar";

const initialMembers = [
  { id: "u1", name: "Alice", status: "online" },
  { id: "u2", name: "Bob", status: "idle" },
  { id: "u3", name: "Charlie", status: "offline" },
];

export default function ChatPage() {
  const [members] = useState(initialMembers);

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

        <MemberList members={members} />
      </div>
    </div>
  );
}

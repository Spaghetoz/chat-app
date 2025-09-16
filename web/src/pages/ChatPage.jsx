import { useContext, useState } from "react";

import RoomList from "../features/chat/components/RoomList";
import MemberList from "../features/chat/components/MemberList";

import ChatWindow from "../features/chat/ChatWindow";
import PrivateMessageList from "../features/chat/components/PrivateMessageList";
import { ChatContext } from "../features/chat/contexts/ChatContext";

const initialMembers = [
  { id: "u1", name: "Alice", status: "online" },
  { id: "u2", name: "Bob", status: "idle" },
  { id: "u3", name: "Charlie", status: "offline" },
];

export default function ChatPage() {
  //const [rooms] = useState(initialRooms);
  //const [activeRoom, setActiveRoom] = useState(rooms[0].id);
  const [members] = useState(initialMembers);

  //const room = rooms.find((c) => c.id === activeRoom) || rooms[0];

  const {chat, privateMessages} = useContext(ChatContext)

  const [activeDiscussionId, setActiveDiscussionId] = useState("")
  const [chatType, setChatType] = useState("global")

  const selectRoom = (roomId) => {
    setActiveDiscussionId(roomId)
    setChatType("room")
  }

  const selectPrivateDiscussion = (discussionId) => {
    setActiveDiscussionId(discussionId)
    setChatType("private")
  }
  
  const messagesToDisplay = (() => {
    if (chatType === "global") return chat;
    //if (chatType === "room") return roomsMessages[activeDiscussionId] || [];
    if (chatType === "private") return privateMessages[activeDiscussionId] || [];
    return [];
  })();

  return (
    <div className="h-screen flex bg-neutral-900 text-neutral-100">

      <div className="flex-1 flex">

        <div className="flex flex-col bg-neutral-950">
          <RoomList rooms={[]} activeRoom={activeDiscussionId} onSelect={selectRoom}/>
          <PrivateMessageList activeDiscussion={activeDiscussionId} onSelect={selectPrivateDiscussion}/>
        </div>

        <div className="flex-1 flex flex-col">
          <ChatWindow 
            chatType={chatType} 
            toId={activeDiscussionId} 
            messages={messagesToDisplay}/>
        </div>

        <MemberList members={members} />
      </div>
    </div>
  );
}

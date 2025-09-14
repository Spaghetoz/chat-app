import { useState } from "react";

import RoomList from "../../features/chat/components/RoomList";
import MemberList from "../../features/chat/components/MemberList";

import ChatWindow from "../../features/chat/ChatWindow";
import PrivateChatList from "../../features/chat/components/DirectMessageList";

const initialRooms = [
  { id: "ch-1", name: "Room 1", type: "text" },
  { id: "ch-2", name: "Room 2", type: "text" },
  { id: "ch-3", name: "Room 3", type: "text" },
];

const initialMembers = [
  { id: "u1", name: "Alice", status: "online" },
  { id: "u2", name: "Bob", status: "idle" },
  { id: "u3", name: "Charlie", status: "offline" },
];

const directMessages = [
  { id: "ch-3", name: "Room 3", type: "text" },
]


export default function HomePage() {
  const [rooms] = useState(initialRooms);
  const [activeRoom, setActiveRoom] = useState(rooms[0].id);
  const [members] = useState(initialMembers);

  const room = rooms.find((c) => c.id === activeRoom) || rooms[0];

  return (
    <div className="h-screen flex bg-neutral-900 text-neutral-100">

      <div className="flex-1 flex">

        <div className="flex flex-col bg-neutral-950">
          <RoomList rooms={rooms} activeRoom={activeRoom} onSelect={setActiveRoom}/>
          <PrivateChatList directMessages={directMessages}/>
        </div>

        <div className="flex-1 flex flex-col">
          <ChatWindow room={room}/>
        </div>

        <MemberList members={members} />
      </div>
    </div>
  );
}

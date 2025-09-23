import { useState, useEffect } from "react";
import UserCard from "./UserCard";
import SearchBar from "./SearchBar";
import ChatSection from "./ChatSection";

export default function ChatSidebar() {

  const [privateChats] = useState([
    { id: 1, name: "Alice" },
    { id: 2, name: "Bob" },
    { id: 3, name: "Charlie" },
    { id: 4, name: "Bob2" },
  ]);

  const [rooms] = useState([
    { id: 1, name: "Dev room" },
    { id: 2, name: "Personal room" },
  ]);

  useEffect(() => {
    //TODO notification when receive dm
  }, [])

  return (

    <div className="lg:w-80 md:w-68 h-screen bg-neutral-950 text-white flex flex-col">

      <div className="flex-1 flex flex-col overflow-hidden">

        <div className="flex-1 overflow-y-auto">
          <SearchBar />
          <ChatSection title="Private messages" items={privateChats} />
          <ChatSection title="Rooms" items={rooms} />
        </div>

      </div>

      <UserCard />
    </div>
  );
};
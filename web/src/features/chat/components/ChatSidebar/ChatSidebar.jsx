import { useState, useEffect } from "react";

import SearchBar from "./SearchBar";
import ChatSection from "./ChatSection";
import UserProfileCard from "./UserProfileCard";

import Avatar from "../../../../components/Avatar";
import Popover from "../../../../components/Popover";

import { Settings } from "lucide-react";

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

      <Popover trigger={   
        // User card used as a popover trigger    
        // TODO fix trigger working if we click outside box (p-2)
        <div className="p-2"> 
            <div className="p-4 h-16 rounded-xl bg-neutral-800 hover:bg-neutral-700 flex items-center cursor-pointer">
                <Avatar width={9}/>
                <div className="flex-1 ml-3">
                <p className="text-sm font-semibold">Username</p>
                <p className="text-xs text-gray-400">Online</p>
                </div>
                <Settings className="cursor-pointer text-neutral-400 hover:text-neutral-200 w-5" />
            </div>
        </div>}>

        <UserProfileCard/>

      </Popover>
    </div>
  );
};
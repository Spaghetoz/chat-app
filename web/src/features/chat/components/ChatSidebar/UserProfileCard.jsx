import { LogOut, Pencil } from "lucide-react";
import Avatar from "../../../../components/Avatar";

import { useNavigate } from "react-router";

export default function UserProfileCard() {

  const navigate = useNavigate();

  return (
    <div className="w-80 bg-neutral-800 text-white rounded-2xl shadow-lg overflow-hidden">
      <div
        className="h-26 w-full bg-cover bg-center bg-neutral-200"
      ></div>

      <div className="flex flex-col items-center p-3 -mt-16">
        <Avatar width="24"/>

          <h2 className="mt-2 font-bold text-base">
            Username <span className="text-neutral-400">#userId</span>
          </h2>
          <p className="text-green-400 text-sm font-bold">Online</p>
      </div>

      <div className="flex flex-col justify-center gap-2 bg-neutral-700 p-2 m-4 rounded-xl">

        {/* TODO avoid buttons style duplication */}
        <button className="flex items-center p-2 rounded-md text-neutral-400 hover:bg-neutral-600 cursor-pointer" >
          <Pencil size={18}/>
          <p className="pl-3 text-sm">Edit profile</p>
        </button>        

        <button className="flex items-center p-2 rounded-md text-neutral-400 hover:bg-neutral-600 cursor-pointer" >
          <div className={`w-3 h-3 rounded-full bg-green-400 text-white flex items-center justify-center`}/>
          <p className="pl-4.5 text-sm">Change status</p>
        </button>

        <div/>     
        
        <button 
          className="flex items-center p-2 rounded-md text-neutral-400 hover:bg-neutral-600 cursor-pointer"
          onClick={() => navigate("/logout")}
        >
          <LogOut size={18}/>
          <p className="pl-3 text-sm">Disconnect</p>
        </button>

      </div>
    </div>
  );
};
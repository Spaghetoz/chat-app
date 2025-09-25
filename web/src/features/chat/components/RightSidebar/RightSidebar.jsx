import { Users} from "lucide-react";
import { useState } from "react";
import Popover from "../../../../components/Popover";
import UserProfileCard from "../UserProfileCard";
import Avatar from "../../../../components/Avatar";

export default function MemberList() {
  
  const members = [
    { id: "u1", name: "Alice", status: "online" },
    { id: "u2", name: "Bob", status: "idle" },
    { id: "u3", name: "Charlie", status: "offline" },
    { id: "u1", name: "Alice", status: "online" },
    { id: "u2", name: "Bob", status: "idle" },
    { id: "u3", name: "Charlie", status: "offline" },
  ];

  const [open, setOpen] = useState(true);

  return (
    <div className="w-62 bg-neutral-900 border-l border-neutral-700 p-3 text-sm hidden lg:flex flex-col gap-3">
      <div className="font-semibold flex items-center gap-2">
        <Users size={16} /> <span>Members — {members.length}</span>
      </div>
      {/* TODO scrollbar */}
      <div className="flex-1 overflow-auto">
        {members.map((m) => (
          // TODO memo to avoid rendering on all member card
          // TODO reuse same component as in chatsidebar for user card
          <Popover 
            side="left"
            trigger={
              <div key={m.id} className="flex items-center gap-3 p-2 rounded-xl hover:bg-neutral-700 cursor-pointer">
                <Avatar/>
                <div className="flex-1">
                  <div className="text-sm font-medium">{m.name}</div>
                  <div className="text-xs text-neutral-400">{m.status}</div>
                </div>
              </div>}
            >
            <UserProfileCard/>
          </Popover>
        ))}
      </div>
    </div>
  );
}

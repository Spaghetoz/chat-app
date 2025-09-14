import { Users} from "lucide-react";
import { useState } from "react";

export default function MemberList({ members }) {

  const [open, setOpen] = useState(true);

  return (
    <div className="w-56 bg-neutral-950 p-3 text-sm hidden lg:flex flex-col gap-3">
      <div className="font-semibold flex items-center gap-2">
        <Users size={16} /> <span>Members — {members.length}</span>
      </div>
      <div className="flex-1 overflow-auto">
        {members.map((m) => (
          <div key={m.id} className="flex items-center gap-3 py-2">
            <div className="w-8 h-8 rounded-full bg-neutral-800 flex items-center justify-center">{m.name[0]}</div>
            <div className="flex-1">
              <div className="text-sm font-medium">{m.name}</div>
              <div className="text-xs text-neutral-400">{m.status}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

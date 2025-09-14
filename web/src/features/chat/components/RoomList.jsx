import { MessageSquare, Hash } from "lucide-react";

export default function RoomList({ rooms, activeRoom, onSelect }) {
  return (
    <div className="w-64 text-sm p-3 flex flex-col gap-2">
      <div className="px-2 py-1 font-semibold flex items-center gap-2">
        <Hash size={16} /> <span>Rooms</span>
      </div>
      <div className="flex-1 overflow-auto">
        {rooms.map((c) => (
          <button
            key={c.id}
            onClick={() => onSelect(c.id)}
            className={`w-full text-left px-3 py-2 rounded-md hover:bg-neutral-900 flex items-center gap-2 ${
              activeRoom === c.id ? "bg-neutral-900" : ""
            }`}
          >
            <MessageSquare size={14} /> <span className="truncate">{c.name}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

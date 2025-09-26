import { Hash, Presentation, Users } from "lucide-react";

// TODO refactor to easily add more buttons without adding too much toggle arguments
export default function ChatHeader({onToggleWhiteboard, onToggleRightbar}) {
    
    return(
        <div className="h-16 border-b border-neutral-800 flex items-center px-6 justify-between">
            <div className="flex items-center gap-3">
                <Hash size={18} />
                <div className="text-lg font-semibold">to userid</div>
            </div>

            <div className="flex items-center gap-3">
                <button
                    onClick={onToggleWhiteboard}
                    className="p-3 rounded-full hover:bg-neutral-800 active:bg-neutral-700 cursor-pointer"
                >
                <Presentation className="text-neutral-300" size={16} />
                </button>

                <button
                    onClick={onToggleRightbar}
                    className="p-3 rounded-full hover:bg-neutral-800 active:bg-neutral-700 cursor-pointer"
                >
                    <Users className="text-neutral-300" size={16}/>
                </button>
            </div>
        </div>
    )
}
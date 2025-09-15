import { useEffect, useContext } from "react";

import { Hash, Plus } from "lucide-react";
import { ChatContext } from "../contexts/ChatContext";
import { Button } from "../../../components/ui/button";

export default function PrivateMessageList({ activeDiscussion, onSelect }) {

    const {privateMessages} = useContext(ChatContext)

    useEffect(() => {
        
    }, []) 

    useEffect(() => {
        //TODO notification
    }, [privateMessages])
    
    // TODO refactor to avoid duplication with roomlist code
    return(
        <div className="w-64 text-sm p-3 flex flex-col gap-2">
            <div className="px-2 py-1 font-semibold flex items-center gap-2">
                <Hash size={16} /> 
                <span>Private messages</span>
            </div>
            <div className="flex-1 overflow-auto">

                {Object.entries(privateMessages).map(([userId, messages]) => (
                    <button
                        key={userId}
                        onClick={() => onSelect(userId)}
                        className={`w-full text-left px-3 py-2 rounded-md hover:bg-neutral-900 flex items-center gap-2 ${
                        activeDiscussion === userId ? "bg-neutral-900" : ""
                        }`}
                    >
                    </button>
                ))}
            </div>
        </div>
    )
}
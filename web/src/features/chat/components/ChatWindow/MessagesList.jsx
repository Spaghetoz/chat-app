import { useEffect, useRef } from "react";
import { useContext } from "react";
import { ChatContext } from "../../contexts/ChatContext";

import Message from "./Message";

export default function MessagesList({messages}) {

    const { chatSocket } = useContext(ChatContext)

    const endRef = useRef(null);

    useEffect(() => {
        if (messages.length > 0) {
        endRef.current?.scrollIntoView({ behavior: "smooth" });
        }
    }, [messages]);

    return(
        
        <div className="flex-1 overflow-auto p-6 min-h-0">
            <div className="flex flex-col gap-4">
                {messages.map((msg) => (
                    <Message
                        key={msg.id}
                        msg={msg}
                        chatSocket={chatSocket}
                    />
                ))}
                <div ref={endRef} />
            </div>
        </div>
    )
}
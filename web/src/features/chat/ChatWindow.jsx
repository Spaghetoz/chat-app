import { useState, useEffect, useRef, useContext } from "react";

import { Button } from "../../components/ui/button"
import { Hash, Presentation  } from "lucide-react";

import Message from "./components/Message";
import useTypingIndicator from "./hooks/useTypingIndicator";

import { ChatContext } from "./contexts/ChatContext";

import Whiteboard from "@/features/whiteboard/Whiteboard"; // TODO move outside
import ChatInput from "./components/ChatInput";

export default function ChatWindow({ chatType, toId, messages }) {

  const { chatSocket } = useContext(ChatContext)
  const { typingText, sendTyping, sendStopTyping } = useTypingIndicator();

  // TODO move whiteboard opening outside of ChatWindow (for example in Homepage)
  const [showWhiteboard, setShowWhiteboard] = useState(false); 
  const toggleWhiteboard = () => {
    setShowWhiteboard(!showWhiteboard)
  }

  const endRef = useRef(null);
  useEffect(() => {
    if (messages.length > 0) {
      endRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, toId]);


  const sendMessage = (messageText) => {
    if (messageText.trim() !== '') {
      chatSocket.emit('send_message', {messageText, chatType: chatType, toId:toId});
    }
  };

  const handleSendMessage = (messageText) => {
    sendMessage(messageText)
    sendStopTyping()
  }

  return (
    <div className="flex-1 flex flex-col min-h-0">

      <div className="h-16 border-b border-neutral-800 flex items-center px-6 justify-between">
        <div className="flex items-center gap-3">
          <Hash size={18} />
          <div className="text-lg font-semibold">{toId}</div>
        </div>
        <Button variant="ghost" onClick={toggleWhiteboard}><Presentation/></Button>
      </div>

      {/* Messages List */}
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
      
      {typingText && 
        <span className="text-neutral-200 italic p-3">
          <span className="animate-pulse">{typingText}</span>
        </span>
      }
      
      <ChatInput onSend={(text) => handleSendMessage(text)} onTyping={sendTyping}/>

      {showWhiteboard && <Whiteboard/>}
    </div>
  )

}
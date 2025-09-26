import { useState, useContext } from "react";

import useTypingIndicator from "../../hooks/useTypingIndicator";
import { ChatContext } from "../../contexts/ChatContext";

import ChatInput from "./ChatInput";
import RightSidebar from "../RightSidebar/RightSidebar"
import ChatHeader from "./ChatHeader";
import MessagesList from "./MessagesList";

export default function ChatWindow({ chatType, toId, messages, onToggleWhiteboard }) {

  const { chatSocket } = useContext(ChatContext)
  const { typingText, sendTyping, sendStopTyping } = useTypingIndicator();

  const [showRightBar, setShowRightBar] = useState(true);

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
        
      <ChatHeader 
        onToggleWhiteboard={onToggleWhiteboard} 
        onToggleRightbar={() => setShowRightBar(!showRightBar)}
      />

      <div className="flex-1 flex flex-row min-h-0">
        
        <div className="flex-1 flex flex-col min-h-0 max-h-full">
          
          <MessagesList messages={messages}/>

          {typingText && 
            <span className="text-neutral-200 italic p-3">
              <span className="animate-pulse">{typingText}</span>
            </span>
          }
          
          <ChatInput onSend={handleSendMessage} onTyping={sendTyping}/>
        </div>

        {showRightBar && <RightSidebar/>}
      </div>
    </div>
  )
}
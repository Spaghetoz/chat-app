import { useState, useEffect, useRef, useContext } from "react";

import { Button } from "../../components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { SendHorizonal, Hash, Users  } from "lucide-react";

import Message from "./components/Message";
import useTypingIndicator from "./hooks/useTypingIndicator";
import MyEmojiPicker from "./components/MyEmojiPicker";

import { ChatContext } from "./contexts/ChatContext";

export default function ChatWindow({ chatType, toId }) {

  const [messageText, setMessageText] = useState('');

  const {chatSocket, chat} = useContext(ChatContext)

  const { typingText, sendTyping, sendStopTyping } = useTypingIndicator(chatSocket);
  
  const [toUser, setToUser] = useState("") // TODO remove

  const endRef = useRef(null);
    useEffect(() => {
      endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chat, toId]);


  const sendMessage = () => {
    if (messageText.trim() !== '') {
      chatSocket.emit('send_message', {messageText: messageText, chatType: "global", toId:""});
      chatSocket.emit('send_message', {messageText: messageText, chatType: "private", toId:toUser});
      setMessageText('');
      setToUser("") //TOOD REMOVE
    }
  };

  const handleSendMessage = () => {
    sendMessage()
    sendStopTyping()
  }

  const handleEmojiSelection = (emoji) => {
    //TODO insert at cursor pos
    setMessageText(prev => prev + emoji)
  }

  return (
    <div className="flex-1 flex flex-col min-h-0">

      <div className="h-16 border-b border-neutral-800 flex items-center px-6 justify-between">
        <div className="flex items-center gap-3">
          <Hash size={18} />
          <div className="text-lg font-semibold">{toId}</div>
        </div>
        <Button variant="ghost"><Users/></Button>
      </div>

      {/* Messages List */}
      <div className="flex-1 overflow-auto p-6 min-h-0">
        <div className="flex flex-col gap-4">
          {chat.map((msg, i) => (
            <Message
              key={i}
              msg={msg}
              chatSocket={chatSocket}
            />
          ))}
          <div ref={endRef} />
        </div>
      </div>
      
      {typingText && <p>{typingText}</p>}

      <Textarea value={toUser} onChange={((e) => {setToUser(e.target.value)})} placeholder="Private message user id"/> {/**todo remove */}
      
      {/* Message typing box */}
      <div className="border-t border-neutral-800 px-6 py-4 bg-neutral-950 flex items-start gap-4">
        <div className="flex flex-1 flex-row gap-2">
          <Textarea
            value={messageText}
            onChange={(e) => {
              setMessageText(e.target.value)
              sendTyping()
            }}
            onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
            placeholder={`${chatType} message to #${toId}`}
            className="resize-none h-18"
          />
          <div className="flex items-center justify-between mt-2 gap-2">
            <div className="flex items-center gap-2">
              <MyEmojiPicker onEmojiClick={emoji => handleEmojiSelection(emoji)}/>
            </div>
            <div>
              <Button onClick={handleSendMessage}><SendHorizonal/></Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )

}
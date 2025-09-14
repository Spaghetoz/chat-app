import { useState, useEffect, useRef } from "react";
import { io } from "socket.io-client";

import { Button } from "../../components/ui/button"
import { Input } from "../../components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { SendHorizonal, Hash, Users  } from "lucide-react";

import Message from "./components/Message";
import useTypingIndicator from "./hooks/useTypingIndicator";
import MyEmojiPicker from "./components/MyEmojiPicker";

const chatSocket = io("http://localhost:4000/chat")

export default function ChatWindow({ room }) {

  const [messageText, setMessageText] = useState('');
  const [chat, setChat] = useState([]);

  const { typingText, sendTyping, sendStopTyping } = useTypingIndicator(chatSocket);

  useEffect(() => {

    chatSocket.emit("load_last_messages")

    chatSocket.on("last_messages", (messages) => {
      setChat(messages)
    })

    // TODO add to state before sending instead of when receiving from server
    chatSocket.on('receive_message', (data) => {
      setChat((prev) => [...prev, data]);
    });

    return () => {
      chatSocket.off('receive_message'); // TODO off all sockets
    }
  }, []);

  const endRef = useRef(null);
    useEffect(() => {
      endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chat, room]);


  const sendMessage = () => {
    if (messageText.trim() !== '') {
      chatSocket.emit('send_message', messageText);
      setMessageText('');
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
          <div className="text-lg font-semibold">{room?.name}</div>
        </div>
        <Button variant="ghost"><Users/></Button>
      </div>

      {/* Messages List */}
      <div className="flex-1 overflow-auto p-6 min-h-0">
        <div className="flex flex-col gap-4">
          {chat.map((msg, i) => (
            <Message
              key={i}
              username="User1"
              msg={msg}
              chatSocket={chatSocket}
            />
          ))}
          <div ref={endRef} />
        </div>
      </div>
      
      {typingText && <p>{typingText}</p>}
      
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
            placeholder={`Public message #${room.name}`}
            className="resize-none h-16"
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
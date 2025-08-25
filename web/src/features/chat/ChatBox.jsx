import { useState, useEffect } from "react";
import { io } from "socket.io-client";

const chatSocket = io("http://localhost:4000/chat")

import { Button } from "../../components/ui/button"
import { Input } from "../../components/ui/input"
import { SendHorizonal } from "lucide-react";

import MessageBubble from "./components/MessageBubble";


export default function ChatBox() {
  const [message, setMessage] = useState('');
  const [chat, setChat] = useState([]);

  useEffect(() => {
    // TODO add to state before sending instead of when receiving from server
    chatSocket.on('receive_message', (data) => {
      setChat((prev) => [...prev, data]);
    });

    return () => chatSocket.off('receive_message');
  }, []);

  const sendMessage = () => {
    if (message.trim() !== '') {
      chatSocket.emit('send_message', message);
      setMessage('');
    }
  };

  return (
    <div 
      className="flex flex-col gap-5 bg-white h-90/100 p-6 shadow-lg"
    >
      <h1 className="scroll-m-20 text-xl font-semibold tracking-tight">Chat</h1>

      <div 
        className="flex flex-col flex-2 w-100 p-5 overflow-y-scroll"
      >
        {chat.map((msg, i) => (
          <MessageBubble
            key={i}
            avatarUrl="https://picsum.photos/200"
            username="User1"
            message={msg}
          />
        ))}
      </div>
      <div className="flex w-full max-w-sm items-center gap-2">
        <Input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type a message..."
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
        />
        <Button onClick={sendMessage}><SendHorizonal/></Button>
      </div>
    </div>
  );
}
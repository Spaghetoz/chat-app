import { useState, useEffect } from "react";
import { io } from "socket.io-client";

const chatSocket = io("http://localhost:4000/chat")

import { Button } from "../../components/ui/button"
import { Input } from "../../components/ui/input"
import { SendHorizonal } from "lucide-react";

import MessageBubble from "./components/MessageBubble";
import useTypingIndicator from "./hooks/useTypingIndicator";
import MyEmojiPicker from "./components/MyEmojiPicker";


export default function ChatBox() {
  const [messageText, setMessageText] = useState('');
  const [chat, setChat] = useState([]);

  const { typingText, sendTyping, sendStopTyping } = useTypingIndicator(chatSocket);

  useEffect(() => {

    // TODO add to state before sending instead of when receiving from server
    chatSocket.on('receive_message', (data) => {
      setChat((prev) => [...prev, data]);
    });

    return () => {
      chatSocket.off('receive_message'); // TODO off all sockets
    }
  }, []);

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
            chatSocket={chatSocket}
          />
        ))}
      </div>

      {typingText && <p>{typingText}</p>}

      <div className="flex w-full max-w-sm items-center gap-2">
        <Input
          type="text"
          value={messageText}
          onChange={(e) => {
            setMessageText(e.target.value)
            sendTyping()
          }}
          placeholder="Type a message..."
          onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
        />
        <MyEmojiPicker onEmojiClick={emoji => handleEmojiSelection(emoji)}/>
        <Button onClick={handleSendMessage}><SendHorizonal/></Button>
      </div>
    </div>
  );
}
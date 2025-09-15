import { createContext, useState, useEffect } from 'react';
import { io } from 'socket.io-client';

export const ChatContext = createContext();
const chatSocket = io('http://localhost:4000/chat');

export function ChatProvider({ children }) {
  const [chat, setChat] = useState([]);
  const [privateMessages, setPrivateMessages] = useState({})

  useEffect(() => {
    chatSocket.emit("load_last_messages")
    
    chatSocket.on("load_last_messages", (messages) => {
      setChat(messages)
    })

    chatSocket.on("load_private_messages", (messages) => {

    })
    
    // TODO add to state before sending instead of when receiving from server
    chatSocket.on('receive_message', (data) => {
      setChat((prev) => [...prev, data]);
    });

    chatSocket.on('receive_private_message', (message) => {
      console.log("mp received")
      setPrivateMessages(prev => ({
        ...prev,
        [message.senderId]: message
      }));
    })

    return () => {
      chatSocket.off('load_last_messages')
      chatSocket.off("load_private_messages")
      chatSocket.off('receive_message'); // TODO off all sockets
      chatSocket.off("receive_private_messages")
    }
  }, []);

  return (
    <ChatContext.Provider value={{ chatSocket, chat, setChat, privateMessages, setPrivateMessages }}>
      {children}
    </ChatContext.Provider>
  )
}
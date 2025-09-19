import { createContext, useState, useEffect, useRef } from 'react';
import { io } from 'socket.io-client';

export const ChatContext = createContext();

export function ChatProvider({ children }) {
  const socketRef = useRef()
  const [chat, setChat] = useState([]);
  const [privateMessages, setPrivateMessages] = useState({})

  useEffect(() => {    
    
    socketRef.current = io("http://localhost:4000/chat", {
      auth: { token: window.__ACCESS_TOKEN__ },
    });

    socketRef.current?.emit("load_last_messages")
    
    socketRef.current?.on("load_last_messages", (messages) => {
      setChat(messages)
    })

    socketRef.current?.on("load_private_messages", (messages) => {

    })
    
    // TODO add to state before sending instead of when receiving from server
    socketRef.current?.on('receive_message', (data) => {
      setChat((prev) => [...prev, data]);
    });

    socketRef.current?.on('receive_private_message', (message) => {
      console.log("mp received")
      setPrivateMessages(prev => ({
        ...prev,
        [message.senderId]: message
      }));
    })

    return () => {
      socketRef.current?.off('load_last_messages')
      socketRef.current?.off("load_private_messages")
      socketRef.current?.off('receive_message'); // TODO off all sockets
      socketRef.current?.off("receive_private_messages")
      socketRef.current?.disconnect()
    }
  }, []);

  // Do not use the chat socket before it is connected
  if (!socketRef.current) return <div>Connecting to chat...</div>; 

  return (
    <ChatContext.Provider value={{ chatSocket: socketRef.current, chat, setChat, privateMessages, setPrivateMessages }}>
      {children}
    </ChatContext.Provider>
  )
}
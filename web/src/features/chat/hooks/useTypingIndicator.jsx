import { useState, useEffect, useContext } from "react";
import { ChatContext } from "../contexts/ChatContext";

/** Hook managing the typing indicator feature */
export default function useTypingIndicator() {

    const [typingUsers, setTypingUsers] = useState({});
    const [typingText, setTypingText] = useState("");
    const TYPING_TIMEOUT_IN_MS = 6000; 

    const {chatSocket} = useContext(ChatContext)
  
    const userStoppedTyping = (userId) => {
      return typingUsers[userId].lastTyping < (Date.now() - TYPING_TIMEOUT_IN_MS)
    }

    const stopUserTyping = (userId) => {
      if (!userId) return;
      setTypingUsers(prev => {
        if (!(userId in prev)) return prev;
        const { [userId]: _, ...rest } = prev;
        return rest;
      });
    }

    const addTypingUser = (userData) => {
      setTypingUsers(prev => ({
        ...prev,
        [userData.userId]: {lastTyping: userData.lastTyping}
      }));
    }
    
    const updateTypingText = () => {
      const ids = Object.keys(typingUsers);
      const n = ids.length;
  
      if (n === 0) {
        setTypingText("");
      } else if (n === 1) {
        setTypingText(`${ids[0]} is typing...`);
      } else if (n === 2) {
        setTypingText(`${ids[0]} and ${ids[1]} are typing...`);
      } else {
        setTypingText(`${ids[0]} and ${n - 1} more are typing...`);
      }
    }

    const sendTyping = () => {
        chatSocket.emit("user_typing")
    console.log("sent")
    }
    const sendStopTyping = () => {
        chatSocket.emit("user_stop_typing") 
    }
    
    useEffect(() => {
      const interval = setInterval(() => {
        for(let typingUser in typingUsers) {
          if(userStoppedTyping(typingUser)) {
            stopUserTyping(typingUser)
          }
        }
      }, 1000);
  
      updateTypingText();
  
      return () => {
        clearInterval(interval);
      }
    }, [typingUsers]);

    useEffect(() => {
    
        chatSocket.on('user_typing', (data) => {
          addTypingUser(data)
        })
        chatSocket.on('user_stop_typing', (data) => {
          stopUserTyping(data.userId)
        })
    
        return () => {
          chatSocket.off('user_typing');
          chatSocket.off("user_stop_typing"); 
        }
    }, []);

    return {typingText, sendTyping, sendStopTyping}
}
import { useState, useEffect } from "react";
import { io } from "socket.io-client";

const chatSocket = io("http://localhost:4000/chat")

export default function ChatBox() {
  const [message, setMessage] = useState('');
  const [chat, setChat] = useState([]);

  useEffect(() => {
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
    <div style={{ padding: '20px' }}>
      <h2>Chat</h2>
      <div style={{ border: '1px solid #ccc', padding: '10px', height: '300px', overflowY: 'scroll' }}>
        {chat.map((msg, idx) => (
          <p key={idx}>{msg}</p>
        ))}
      </div>
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Write a message..."
      />
      <button onClick={sendMessage}>Send</button>
    </div>
  );
}
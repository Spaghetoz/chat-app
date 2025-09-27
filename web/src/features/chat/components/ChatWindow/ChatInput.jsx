import { useState, useContext } from "react";
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { ChatContext } from "../../contexts/ChatContext";

import MyEmojiPicker from "../MyEmojiPicker"
import { SendHorizonal } from "lucide-react";

import useTypingIndicator from "../../hooks/useTypingIndicator";

export default function ChatInput({chatType, toId, onTyping}) {

    const { chatSocket } = useContext(ChatContext)
    const { sendStopTyping } = useTypingIndicator();

    const [messageText, setMessageText] = useState('');

    const handleChange = (e) => {
        setMessageText(e.target.value)
        onTyping()
    }

    const handleEmojiSelection = (emoji) => {
        //TODO insert at cursor pos
        setMessageText(prev => prev + emoji)
    }

    const handleSend = () => {

        setMessageText('');
        sendMessage(messageText)
        sendStopTyping()
    }
    
    const sendMessage = (messageText) => {
        if (messageText.trim() !== '') {
          chatSocket.emit('send_message', {messageText, chatType, toId});
        }
    };

    return(
        <div className="border-t border-neutral-800 px-6 py-4 bg-neutral-900 flex items-start gap-4">
            <div className="flex flex-1 flex-row gap-2 ">
                <Input
                    value={messageText}
                    onChange={handleChange}
                    onKeyDown={(e) => e.key === "Enter" && handleSend()}
                    placeholder={`Send message message to `} // TODO change 
                    className="border-none bg-neutral-800 h-12 !text-[15px]"
                />
                <div className="flex items-center justify-between mt-2 gap-2">
                    <div className="flex items-center gap-2">
                        <MyEmojiPicker onEmojiClick={emoji => handleEmojiSelection(emoji)}/>
                    </div>
                    <div>
                        <Button onClick={handleSend}><SendHorizonal/></Button>
                    </div>
                </div>
            </div>
        </div>
    )
}
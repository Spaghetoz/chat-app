import { useState } from "react";

import { SmilePlus } from "lucide-react";
import EmojiPicker from "emoji-picker-react";

import { Button } from "../../../components/ui/button"

export default function MyEmojiPicker({onEmojiClick}) {

    const [isOpen, setIsOpen] = useState(false);

    const handleEmojiClick = (emojiData) => {
        setIsOpen(false)

        if (onEmojiClick) {
            onEmojiClick(emojiData.emoji);
        }
    };

    const handleOpen = () => {
        setIsOpen(!isOpen)
    }

    return(
        <div className="relative inline-block">
            <Button onClick={handleOpen}><SmilePlus/></Button>
            
            {isOpen && (
                <div className="absolute z-50 mt-2">
                <EmojiPicker onEmojiClick={handleEmojiClick} />
                </div>
            )}
        </div>
    )
}
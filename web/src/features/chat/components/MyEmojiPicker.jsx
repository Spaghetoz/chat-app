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
        <div>
            <Button onClick={handleOpen}><SmilePlus/></Button>

            {isOpen && <EmojiPicker onEmojiClick={handleEmojiClick}/>}
        </div>
    )
}
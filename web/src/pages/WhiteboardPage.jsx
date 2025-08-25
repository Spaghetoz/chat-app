import Whiteboard from "@/features/whiteboard/Whiteboard";
import ChatBox from "../features/chat/Chatbox";

export default function WhiteboardPage() {

  return(
    <div className="flex justify-center align-center bg-gray-200 pt-10 w-screen h-screen">
      <div className="flex flex-row gap-5">
        <ChatBox/>
        <Whiteboard/>
      </div>
    </div>
  )
}
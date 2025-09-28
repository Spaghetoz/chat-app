import BoardToolbar from "./hooks/BoardToolbar"
import Whiteboard from "./Whiteboard"

import { LogOut } from "lucide-react"

export default function WhiteboardWindow({onExit}) {

    return(

        <div className="flex-1 flex flex-col bg-neutral-900 relative">

            <div className="h-16 border-b border-neutral-800 flex items-center px-6 justify-between">
                <div className="flex items-center gap-3">
                    <div className="text-lg font-semibold">Whiteboard</div>
                </div>

                <div className="flex items-center gap-3">
                    <button onClick={onExit} className="p-3 rounded-full hover:bg-neutral-800 active:bg-neutral-700 cursor-pointer">
                        <LogOut size={16}/>
                    </button>
                </div>
            </div>

            <div className="flex justify-center flex-1">
                <Whiteboard />
            </div>
            
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2">
                <BoardToolbar />
            </div>

        </div>
    )
}
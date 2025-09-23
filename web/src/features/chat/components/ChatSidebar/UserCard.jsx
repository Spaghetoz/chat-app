
import { Settings } from "lucide-react";
import Avatar from "../../../../components/Avatar";

export default function UserCard() {

    return(
        <div className="p-2">
            <div className="p-4 h-16 rounded-xl bg-neutral-800 hover:bg-neutral-700 flex items-center cursor-pointer">
                <Avatar width={9}/>
                <div className="flex-1 ml-3">
                <p className="text-sm font-semibold">Username</p>
                <p className="text-xs text-gray-400">Online</p>
                </div>
                <Settings className="cursor-pointer text-neutral-400 hover:text-neutral-200 w-5" />
            </div>
        </div>
    )
}
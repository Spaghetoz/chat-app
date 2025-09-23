import { Plus } from "lucide-react";
import Avatar from "../../../../components/Avatar";

const ChatSection = ({ title, items }) => {
  return (

    <div className="px-4 mt-4">
        <h2 className="text-neutral-400 text-sm mb-2 flex items-center justify-between">
            {title}
            <Plus className="cursor-pointer hover:text-neutral-200 w-5" />
        </h2>
        <div>
        {items.map((item) => (
            <div
            key={item.id}
            className="flex items-center p-2 rounded-md text-neutral-400 hover:bg-neutral-700 cursor-pointer"
            >
                <Avatar/>
                <div className="flex flex-col">
                    <strong><p className="pl-3 text-sm">{item.name}</p></strong>
                    <p className="pl-3 text-xs h-3"> </p>
                </div>
            </div>
            ))}
        </div>
    </div>
  );
};

export default ChatSection;
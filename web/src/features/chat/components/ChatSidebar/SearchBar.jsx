
import { Search } from "lucide-react";

export default function SearchBar({onChange}) {

    return(
        <div className="p-4">
            <div className="flex items-center bg-neutral-800 rounded-md px-3 py-2">
            <Search className="mr-2 w-5" />
            <input
                type="text"
                placeholder="Search..."
                // TODO improve performance to avoid sending change on each typed character
                onChange={(e) => onChange(e.target.value)}
                className="focus:outline-none text-[14px] w-full text-white"
            />
            </div>
        </div>
    )
}
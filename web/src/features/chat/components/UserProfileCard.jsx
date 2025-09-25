import Avatar from "../../../components/Avatar";

export default function UserProfileCard() {

    return (
        <div className="w-72 bg-neutral-800 text-white rounded-2xl shadow-lg overflow-hidden">

            <div
                className="h-22 w-full bg-cover bg-center bg-neutral-200"
            ></div>

            <div className="flex flex-col items-center p-3 -mt-16">
                <Avatar width="24"/>

                <h2 className="mt-2 font-bold text-base">
                    Username <span className="text-neutral-400">#userId</span>
                </h2>
                <p className="text-green-400 text-sm font-bold">Online</p>
                <div className="h-30">

                </div>
            </div>

        </div>
    );
}
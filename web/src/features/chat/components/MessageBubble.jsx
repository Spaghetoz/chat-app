import { Avatar, AvatarImage, AvatarFallback } from "../../../components/ui/avatar"

export default function MessageBubble({ avatarUrl, username, message }) {

  return (
    <div className="flex items-start gap-3 mb-3">

        <Avatar className="h-8 w-8">
            <AvatarImage src={avatarUrl} alt={username} />
            <AvatarFallback>{username[0]}</AvatarFallback>
        </Avatar>

        <div className="max-w-xs px-4 py-3 rounded-2xl bg-gray-100 text-gray-900 text-sm break-words">
            {message.text}
        </div>

    </div>
  )
}
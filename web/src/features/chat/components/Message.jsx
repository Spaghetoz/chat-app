export default function Message({ msg }) {

    const isMe = false // todo change
    return (
      <div className={`flex gap-3 ${isMe ? "justify-end" : "justify-start"}`}>
        {!isMe && (
          <div className="w-10 h-10 rounded-full bg-neutral-800 flex items-center justify-center">{msg.senderId[0]}</div>
        )}
        <div>
          <div className={`text-xs ${isMe ? "text-right" : "text-left"} text-neutral-400`}>
            <strong>{msg.senderId}</strong> • 
            {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}   {/*Todo add time to message variable */}
          </div>
          <div
            className={`mt-1 inline-block p-3 rounded-2xl max-w-xl whitespace-pre-wrap ${
              isMe ? "bg-neutral-600 text-white" : "bg-neutral-600 text-neutral-100"
            }`}
          >
            {msg.text}
          </div>
        </div>
        {isMe && <div className="w-10 h-10 rounded-full bg-neutral-600 flex items-center justify-center">A</div>}
      </div>
    );
}
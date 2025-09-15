


function initChat(io) {

    const chatNamespace = io.of("/chat")

    let messages = []
    let privateMessages = []

    chatNamespace.on("connection" , (socket) => {
        console.log("connect on chat", socket.id)
        //todo user id
        // User joins his room to be able to receive direct messages
        socket.join(socket.id)

        socket.on("load_last_messages", () => {
            const messagesLimit = 20
            socket.emit("load_last_messages", messages.slice(-messagesLimit))
        })

        socket.on("load_private_messages", () => {
            
        })

        socket.on('send_message', ({messageText, chatType, toId}) => {

            const message = {
                id: Object.keys(messages).length, // TODO uuid
                senderId: socket.id,
                text: messageText,
                reactions: {},
                chatType: chatType,
                to: toId
            }
            

            switch(chatType) {
                case "room":
                    chatNamespace.to(toId).emit("receive_room_message", message)
                    break;
                case "private":
                    privateMessages.push(message)
                    chatNamespace.to(toId).emit("receive_private_message", message)
                    break;
                default:
                    messages.push(message)
                    chatNamespace.emit('receive_message', message);
            }
        });

        socket.on("user_typing", () => {
            socket.broadcast.emit("user_typing", {userId: socket.id, lastTyping: Date.now()})
        })
        socket.on("user_stop_typing", () => {
            socket.broadcast.emit("user_stop_typing", {userId: socket.id})
        })

        socket.on('disconnect', () => {
            socket.broadcast.emit("user_stop_typing", {userId: socket.id})
        });
    })
}

module.exports = initChat;
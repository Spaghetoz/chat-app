


function initChat(io) {

    const chatNamespace = io.of("/chat")

    let messages = []

    chatNamespace.on("connection" , (socket) => {
        //todo user id
        // User joins his room to be able to receive direct messages
        socket.join(socket.id + "_dm")

        socket.on("load_last_messages", () => {
            const messagesLimit = 20
            socket.emit("load_last_messages", messages.slice(-messagesLimit))
        })

        socket.on('send_message', (messageText) => {

            const message = {
                id: Object.keys(messages).length, // TODO uuid
                senderId: socket.id,
                text: messageText,
                reactions: {}
            }
            
            messages.push(message)

            chatNamespace.emit('receive_message', message);
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
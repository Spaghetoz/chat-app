


function initChat(io) {

    const chatNamespace = io.of("/chat")

    chatNamespace.on("connection" , (socket) => {

        socket.on('send_message', (messageText) => {
            const message = {
                senderId: socket.id,
                text: messageText,
            }

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
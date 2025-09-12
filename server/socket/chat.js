


function initChat(io) {

    const chatNamespace = io.of("/chat")

    chatNamespace.on("connection" , (socket) => {

        socket.on('send_message', (data) => {
            chatNamespace.emit('receive_message', data);
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
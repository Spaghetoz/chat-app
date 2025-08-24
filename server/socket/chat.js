


function initChat(io) {

    const chatNamespace = io.of("/chat")

    chatNamespace.on("connection" , (socket) => {

        socket.on('send_message', (data) => {
            chatNamespace.emit('receive_message', data);
        });

        socket.on('disconnect', () => {
        });
    })
}

module.exports = initChat;
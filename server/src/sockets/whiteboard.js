

function initWhiteboard(io) {
    
    const whiteboardNamespace = io.of("/whiteboard")
    
    // TODO classe/object board in typescript
    let boardContent = []
    let userPositions = {}  // { socketId: {x, y} } TODO typescript 
    let boardSize = {width: 1000, height: 800}

    whiteboardNamespace.on("connection", (socket) => {
        console.log("connect on whiteboard: ", socket.id, " and user id:", socket.user.public_id );

        socket.on("init", () => {
            socket.emit("init", {boardContent, userPositions, boardSize})
        })
        
        socket.broadcast.emit("userConnection", { userId: socket.user.public_id });

        socket.on("draw", (item) => {

            boardContent.push(item)

            socket.broadcast.emit("draw", item)  // send to everyone except the sender
        })

        socket.on("updateUserPos", (pos) => {
            userPositions[socket.user.public_id] = pos;
            socket.broadcast.emit("updateUserPos", { userId: socket.user.public_id, pos });
        })

        socket.on("clearBoard", () => {
            boardContent = []
            whiteboardNamespace.emit("clearBoard");
        })

        socket.on("disconnect", () => {

            delete userPositions[socket.user.public_id];
            socket.broadcast.emit("userDisconnection", { userId: socket.user.public_id });

            console.log("disconnect :", socket.user.public_id);
        });
    }
)}

module.exports = initWhiteboard;


function initWhiteboard(io) {
    
    const whiteboardNamespace = io.of("/whiteboard")
    
    // TODO classe/object board in typescript
    let boardContent = []
    let userPositions = {}  // { socketId: {x, y} } TODO typescript 
    let boardSize = {width: 1000, height: 800}

    whiteboardNamespace.on("connection", (socket) => {
        console.log("connect:", socket.id);

        socket.on("init", () => {
            socket.emit("init", {boardContent, userPositions, boardSize})
        })
        
        socket.broadcast.emit("userConnection", { userId: socket.id });

        socket.on("draw", (item) => {

            boardContent.push(item)

            socket.broadcast.emit("draw", item)  // send to everyone except the sender
        })

        socket.on("updateUserPos", (pos) => {
            userPositions[socket.id] = pos;
            socket.broadcast.emit("updateUserPos", { userId: socket.id, pos });
        })

        socket.on("clearBoard", () => {
            boardContent = []
            whiteboardNamespace.emit("clearBoard");
        })

        socket.on("disconnect", () => {

            delete userPositions[socket.id];
            socket.broadcast.emit("userDisconnection", { userId: socket.id });

            console.log("disconnect :", socket.id);
        });
    }
)}

module.exports = initWhiteboard;
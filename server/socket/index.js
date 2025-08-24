const initWhiteboard = require("./whiteboard")

function initSockets(io) {
    initWhiteboard(io)
}

module.exports = initSockets
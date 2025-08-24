const initChat = require("./chat")
const initWhiteboard = require("./whiteboard")

function initSockets(io) {
    initWhiteboard(io)
    initChat(io)
}

module.exports = initSockets
const path = require("path")
const express = require("express")
const socket = require("socket.io")
const webpack = require("webpack")
const webpackDevMiddleware = require("webpack-dev-middleware")
const webpackHotMiddleware = require("webpack-hot-middleware")
const webpackConfig = require("../webpack.config.js")

const PORT = process.env.PORT || 3333

// const compiler = webpack(webpackConfig)
const app = express()

// app.use(webpackDevMiddleware(compiler, {publicPath: webpackConfig.output.publicPath}))
// app.use(webpackHotMiddleware(compiler))

app.use(express.static(path.resolve(__dirname, "..", "app")))

app.get("/*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "..", "app", "index.html"))
})

const server = app.listen(PORT, () => console.log(`running on port ${PORT}`))

const io = socket(server)
const gameRoomManager = new (require("./GameRoomManager"))(io)

io.on("connection", (socket) => {
    console.log(`${socket.id} connected to the game`)
    socket.on("disconnect", () => {
        console.log(`${socket.id} disconnected`)

        let gameRoom = gameRoomManager.findPlayersGameRoom(socket)

        if (gameRoom) {
            gameRoomManager.removePlayer(socket)
        }

    })

    socket.on("action", (action) => {
        let gameRoom = gameRoomManager.findPlayersGameRoom(socket)

        switch(action.type) {
            case "server/FIND_OPPONENT": {
                gameRoomManager.addPlayer(socket)
                break
            }
            case "server/SENT_CHAT": {
                gameRoomManager.addchat(gameRoom,action.name,action.message)
                break
            }
            case "server/SENT_RESET": {
                console.log('SENT_RESET คนส่ง '+action.name);
                gameRoomManager.sentreset(gameRoom, "action", {type:"SENTTO_RESET",name:action.name})
                break
            }
            case "server/ADD_NAME": {
                gameRoomManager.addname(socket,action.name)
                break
            }
            case "server/CANCEL_FIND_OPPONENT": {
                gameRoomManager.removePlayer(socket)
                break
            }
            case "server/ROCK_PAPER_SCISSORS_MOVE": {
                gameRoomManager.rockPaperScissors(socket, action.payload)
                break
            }
            case "server/SET_TILE": {
                let { tile, team } = action
                gameRoomManager.messageGameRoom(gameRoom, "action", {type:"SET_TILE", tile, team})
                break
            }
            // SET 2 PLAYER AFTER END PAOYINGCHUP  X IS WIN - O IS LOSE
            case "server/SET_PLAYER": {
                let { player, team, isPlayersTurn } = action
                let actionForReducer = {type:"SET_PLAYER", player, team, name: socket.realname, isPlayersTurn}
                gameRoomManager.messageGameRoom(gameRoom, "action", actionForReducer)
                break
            }
            // END
            case "server/RESET_TIC_TAC_TOE": {
                gameRoomManager.messageGameRoom(gameRoom, "action", {type: "TIMES_UP"})
                gameRoomManager.messageGameRoom(gameRoom, "action", {type:"RESET_TIC_TAC_TOE"})
                break
            }
            case "server/SET_CURRENT_PLAYER": {
                let { players } = gameRoom
                let player = players[0] === socket ? players[0] : players[1]
                gameRoomManager.messageGameRoom(gameRoom, "action", {type: "SET_CURRENT_PLAYER", player})
                break
            }
            case "server/END_TURN": {
                gameRoomManager.messageGameRoom(gameRoom, "action", {type: "END_TURN"})
                break                
            }
            case "server/SWITCH_PLAYER": {
                console.log('SWITCH_PLAYER')
                gameRoomManager.messageGameRoom(gameRoom, "action", {type: "TIMES_UP"})
                gameRoomManager.messageGameRoom(gameRoom, "action", {type: "END_TURN"})
                break
            }

            case "server/TIC_TAC_TOE_WINNER": {
                console.log('WINNER TYPE IS :: '+action.winner);
                let actionForReducer = {type: "TIC_TAC_TOE_WINNER", winner: action.winner,pattern:action.pattern}
                gameRoomManager.messageGameRoom(gameRoom, "action", actionForReducer)
            }
            case "server/SET_OPPONENTS_SELECTION": {
                gameRoomManager.messageGameRoom(gameRoom, "action", {type: "SET_OPPONENTS_SELECTION", payload: action.payload})
                socket.emit("action", {type: "SET_OPPONENTS_SELECTION", payload: undefined})                
            }
        }
    })
})

module.exports = {
    port: PORT,
    socket: io,
    server,
    gameRoomManager
}
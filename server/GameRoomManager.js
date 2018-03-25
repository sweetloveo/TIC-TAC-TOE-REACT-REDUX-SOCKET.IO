const determineWinner = require("../app/utils/rockPaperScissorsWinner")
const colors = require("colors")

class GameRoomManager {
    constructor(serverSocket) {
        this.gameRooms = [];
        this.gameRoomCounter = 0;
        this.socket = serverSocket;
    }
    addchat(gameRoom,name,message){
        let action = {type:'UPDATE_MESSAGE',message,name}
        gameRoom.players.forEach(player => player.emit('action', action))
        console.log(message)
        console.log(name)


    }
    addname(player,name) {
        player.realname = name;
        console.log('Socket ID:'+player.id+' Real name is::'+player.realname);
    }
    sentreset(gameRoom, eventName, data) {
        gameRoom.players.forEach(player => {
            if(player.realname !== data.name)
            {
                player.emit(eventName, data)
            }
        })
    }
    addPlayer(player) {
        let gameRoom = this.getOpenGame() // new ROOM or PUSH OLD ROOM
        gameRoom.players.push(player)
        this.isGameRoomReady(gameRoom) // CHECK OUT THAT HAVE READY TO PLAY ?
    }
    addSpectator(spectator) {
        let gameRoom = this.getOpenGame()
        gameRoom.spectators.push(spectator)
    }
    createGameRoom() {
        let newGameRoom = {
            id: this.gameRoomCounter++,
            players: [],
            spectators: [],
            rockPaperScissors: [],
            gameStarted: false
        }
        this.gameRooms.push(newGameRoom);
        return newGameRoom
    }
    endGameRoom(gameRoom) {
        gameRoom.players.forEach(player => player.disconnect())
        gameRoom.spectators.forEach(spectator => spectator.disconnect())
        this.gameRooms = this.gameRooms.filter(room => room.id !== gameRoom.id)
    }
    isGameRoomReady(gameRoom) {
        if(gameRoom.players.length === 2) {
            gameRoom.gameStarted = true
            this.messageGameRoom(gameRoom, "action", {type: "FOUND_OPPONENTEIEI", payload: true})
        }
    }
    messageGameRoom(gameRoom, eventName, data) {
        gameRoom.players.forEach(player => player.emit(eventName, data))
        gameRoom.spectators.forEach(player => player.emit(eventName, data))
    }
    getOpenGame() {
        for(var i=0; i<this.gameRooms.length; i++) {
            let currentGameRoom = this.gameRooms[i]

            if(currentGameRoom.players.length < 2 && !currentGameRoom.gameStarted) {
                return currentGameRoom
            }
        }

        return this.createGameRoom()
    }
    rockPaperScissors(player, choice) {
        let playersGameRoom = this.findPlayersGameRoom(player)

        // Find out that Player select already?
        let playerMadeMoveAlready = playersGameRoom.rockPaperScissors
                                                        .filter( ({socket}) => socket === player)
                                                        .length > 0
        if(playerMadeMoveAlready) {
            console.log('Changed option');
            playersGameRoom.rockPaperScissors = playersGameRoom.rockPaperScissors.map((playerInGame) =>
                playerInGame.socket === player ? {socket: player, choice} : playerInGame  )
        } else {
            console.log('First time selected');
            playersGameRoom.rockPaperScissors.push({socket: player, choice})
        }

        if(playersGameRoom.rockPaperScissors.length === 2) {
            console.log("Find a winner")
            this.dispatchRockPaperScissorsResults(playersGameRoom)
        }
    }
    dispatchRockPaperScissorsResults(gameRoom) {
        let players = gameRoom.rockPaperScissors
        let player1 = players[0]
        let player2 = players[1]

        let results = determineWinner(player1.choice, player2.choice)
        // determineWinner simple algorithm to find a winner
        if(results === "draw") {
            this.resetRockPaperScissors(gameRoom)
        } else if(results === "p1") {
            player1.socket.emit("action", {type: "ROCK_PAPER_SCISSORS_WON"})
            player2.socket.emit("action", {type: "ROCK_PAPER_SCISSORS_LOSS"})
            this.messageGameRoom(gameRoom, "action", {type:"ROCK_PAPER_SCISSORS_WINNER", winner: player1.socket.realname})
        } else {
            player1.socket.emit("action", {type: "ROCK_PAPER_SCISSORS_LOSS"})
            player2.socket.emit("action", {type: "ROCK_PAPER_SCISSORS_WON"})
            this.messageGameRoom(gameRoom, "action", {type:"ROCK_PAPER_SCISSORS_WINNER", winner: player2.socket.realname})
        }
    }
    removePlayer(player) {
        let gameRoom = this.findPlayersGameRoom(player)
        let isPlayer = gameRoom.players.indexOf(player) !== -1
        let isSpectator = gameRoom.spectators.indexOf(player) !== -1

        if(isPlayer) {
            gameRoom.players = gameRoom.players.filter(person => person !== player)
        }

        if(isSpectator) {
            gameRoom.spectators = gameRoom.spectators.filter(person => person !== player)
        }
    }
    resetRockPaperScissors(gameRoom) {
        gameRoom.rockPaperScissors = []
        console.log(colors.cyan(`Draw !! let do it again: ${gameRoom.id}`))
        this.messageGameRoom(gameRoom, "action", {type:"ROCK_PAPER_SCISSORS_DRAW"})
    }
    findPlayersGameRoom(player) {
        let gameRoom
        for(var i=0; i<this.gameRooms.length; i++) {
            let currentRoom = this.gameRooms[i]
            if(currentRoom.players.indexOf(player) >= 0 || currentRoom.spectators.indexOf(player) >= 0) {
                gameRoom = currentRoom
            }
        }

        return gameRoom
    }
}

module.exports = GameRoomManager
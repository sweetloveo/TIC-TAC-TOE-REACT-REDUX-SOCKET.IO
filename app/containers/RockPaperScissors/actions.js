import getRockPaperScissorsMove from "../../utils/getRockPaperScissorsMove"
import rockPaperScissorsWinner from "../../utils/rockPaperScissorsWinner"


// SET PLAYER ของแต่ละคน ถ้าแพ้ คุณเอา O ไป เซฟลง ฝั่ง Client ของคุณด้วย และส่งไปบอก server ด้วย
export function setPlayer(player, team, isPlayersTurn) {
    return (dispatch, getState) => {
        let { isOnlineMatch } = getState().matchMaking

            dispatch({
                type: "server/SET_PLAYER",
                player,
                team,
                isPlayersTurn
            })
            setTimeout(() => dispatch({
                type: "SET_USERS_PLAYER",
                usersPlayer: player
            }), 1000)

    }
}

export function handleLoss() {
    return setPlayer("player2", "o", false) // YOU LOSE.. YOU ARE PLAYER 2 ( O )
}
export function handleWin() {
    return setPlayer("player1", "x", true) // YOU WIN.. YOU ARE PLAYER 1 ( X )
}

export function rockPaperScissors(choice) {
    return (dispatch, getState) => {
        let { isOnlineMatch } = getState().matchMaking
        let type = isOnlineMatch ? "server/ROCK_PAPER_SCISSORS_MOVE" : "ROCK_PAPER_SCISSORS_MOVE"
        
        dispatch({
            type,
            payload: choice
        })
        dispatch({
            type: "SET_USERS_SELECTION",
            payload: choice
        })

        if(isOnlineMatch) {
            dispatch({
                type: "server/SET_OPPONENTS_SELECTION",
                payload: choice
            })
        }
    }
}

export function resetRockPaperScissors() {
    return {
        type: "ROCK_PAPER_SCISSORS_RESET"
    }
}
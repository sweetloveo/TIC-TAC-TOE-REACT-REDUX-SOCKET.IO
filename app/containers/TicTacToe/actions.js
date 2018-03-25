import didPlayerWinTicTacToe from "../../utils/didPlayerWinTicTacToe"
import isBoardFull from "../../utils/isBoardFull"
import {
    SET_TILE
} from "./constants"

export function setTile(tile, team) {
    return (dispatch, getState) => {
        let { isOnlineMatch } = getState().matchMaking
        let type = isOnlineMatch ? "server/SET_TILE" : "SET_TILE"

        dispatch({
            type: "SET_TILE",
            tile,
            team
        });
        dispatch({
            type,
            tile,
            team
        })
    }
}

export function resetGame() {
    return (dispatch, getState) => {
        let { isOnlineMatch } = getState().matchMaking
        let type = isOnlineMatch ? "server/RESET_TIC_TAC_TOE" : "RESET_TIC_TAC_TOE"
        
        dispatch({
            type
        })
    }
}
export function sentreset() {
    return (dispatch, getState) => {
        dispatch({
            type:"server/SENT_RESET",
            name:getState().ticTacToe.usersPlayer.name
        })
    }
}export function receivealready() {
    return (dispatch) => {
        dispatch({
            type:"RECEIVE_ALREADY"
        })
    }
}

export function switchplayer() {
    return (dispatch) => {
        dispatch({
            type: "server/SWITCH_PLAYER"
        })
    }
}

export function endTurn() {
    return (dispatch, getState) => {
        let { isOnlineMatch } = getState().matchMaking
        let type = isOnlineMatch ? "server/END_TURN" : "END_TURN"
        
        dispatch({
            type
        })
    }
}

export function evaluateBoard() {
    return (dispatch, getState) => {
        let { board, usersPlayer, player1, player2 } = getState().ticTacToe
        let { isOnlineMatch } = getState().matchMaking
        let opponent = (usersPlayer === player1) ? player2 : player1

        let didPlayerWin = didPlayerWinTicTacToe(usersPlayer.team, board)
        console.log('didPlayerWin: '+didPlayerWin);
        
        if(isOnlineMatch) {
            if(didPlayerWin) {
                dispatch({type: "server/TIC_TAC_TOE_WINNER", winner: usersPlayer, pattern:didPlayerWin})
            } else {
                let isDraw = isBoardFull(board)
                console.log('isBoardFull: '+isDraw);
                if(isDraw) {
                    dispatch({type: "server/TIC_TAC_TOE_WINNER", winner: "draw"})
                }
            } 
        }

    }
}

export function sentchat(name, message) {
    return (dispatch) => {
        dispatch({
            type: "server/SENT_CHAT",
            name,
            message
        });
    }
}
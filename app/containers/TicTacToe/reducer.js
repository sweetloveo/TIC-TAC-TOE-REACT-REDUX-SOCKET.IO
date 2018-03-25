import {
    SET_TILE
} from "./constants"

let initialState = {
    board: createBoard(),
    player1: {name: undefined, team: undefined, isPlayersTurn: undefined},
    player2: {name: undefined, team: undefined, isPlayersTurn: undefined},
    usersPlayer: undefined,
    computersPlayer: undefined,
    Allmessages:[],
    numberturn:[10],
    pattern: undefined,
    receivereset: undefined,
    gameOver: false,
    winner: {name: undefined},
    winnerState : false,
    spectators: []
}

export default function ticTacToeReducer(state = initialState, action) {
    switch(action.type) {
        case SET_TILE: {
            return {
                ...state, 
                board: setTile(state.board, action.tile, action.team),
                numberturn:[100]
            }
        }
        case "SET_PLAYER": {            
            return {
                ...state,
                [action.player]: {
                    name: action.name, 
                    team: action.team, 
                    isPlayersTurn: action.isPlayersTurn
                }
            }
        }

        // รับ KEY VALUE มา ตรงกับ PLAYER ไหน ใน OBject ก็จะดึง Object นั้น มาใส่ userPlayer
            // เช่น ถ้าคุณแพ้ คุณจะได้รับ Player 2 ดังนั้น ใน userPlayer = state.player2 ทันที (name,isplayerturn,so on) มาจาก server ส่งค่ากลับมา ที่ SET_PLAYER ACTION.
            // ตาของใครเล่น ขึ้นอยู่กับ SERVER ส่งมา แต่ก่อน server จะรู้ ผู้ชนะเป่ายิ่งฉุบ จะยิงขึ้นไปบอกก่อน เพิ้อให้ server ค่อยกระจาย EMIT ออก ทุก Client
        case "SET_USERS_PLAYER":
            return {...state, usersPlayer: state[action.usersPlayer]}
            // จบคอมมเม้นข้างบน
        case "TIMES_UP":
            return {...state,numberturn:[100]}
        case "END_TURN": {
            let newState = {
                ...state,
                player1: {...state.player1, isPlayersTurn: !state.player1.isPlayersTurn},
                player2: {...state.player2, isPlayersTurn: !state.player2.isPlayersTurn},
                numberturn:[10]
            }
            // หลังจากที่ สลับ user player สถานะข้างบนสองตัวแล้ว ต้องเอาค่าใหม่ที่สลับมายัดใส่ newState.usersPlayer ด้วย เพราถ้าไม่ทำ มันจะยังเป็นค่าเก่าที่ State การเล่น ยังไม่มีการสลับ ดังนั้น
            // ตาการเล่นจะไม่เปลี่ยนเพราะ ยังคงเป็น userPlayer ค่าเดิมตลอด
            console.log('ก่อน'+state.usersPlayer.name)
            let referenceToUsersPlayer = state.usersPlayer.name === state.player1.name ? "player1" : "player2"
            newState.usersPlayer = newState[referenceToUsersPlayer]
            console.log('หลัง'+newState.usersPlayer.name)
            // END การเปลี่ยน Newstate.userPlayer ครับ
            return newState
        }
        case "RESET_TIC_TAC_TOE":
            return {...state, board: createBoard(), gameOver: false, winner: {name: undefined},numberturn:[10],winnerState:false}
        case "GAME_OVER":
            return {...state, gameOver: true}
            case "SENTTO_RESET":
            return {...state, receivereset: true}
            case "RECEIVE_ALREADY":
            return {...state, receivereset: false}
            case "UPDATE_MESSAGE":
            return {...state, Allmessages:getMessages(state.Allmessages,action)}
        case "TIC_TAC_TOE_WINNER": 
            return {...state, winner: action.winner,winnerState:true, gameOver: true, pattern: action.pattern}
        default:
            return state
    }
}
function getMessages(state,action) {
    let newState = state.slice();
    let author = action.name.name;
    let object = {message:action.message,name:author}
    newState.push(object);

    return newState;


}
// function AnalysMYmessage(state,action,usersPlayer) {
//     let newState = state.slice();
//     if(usersPlayer.name === action.name.name){
//         newState.push(action.message);
//     }
//         return newState;
//
//
// }
// function AnalysOPmessage(state,action,usersPlayer) {
//     let newState = state.slice();
//     if(usersPlayer.name !== action.name.name) {
//         newState.push(action.message);
//     }
//         return newState
//
//
// }

function createBoard() {
    let board = []
    for(var i=0; i<3; i++) {
        board.push([undefined, undefined, undefined])
    }
    return board
}

function setTile(board, tile, team) {

    tile = parseInt(tile)
    let newBoard = board;
    // for(var i=0; i<board.length; i++) {
    //     newBoard.push([])
    //     for(var j=0; j<board[i].length; j++) {
    //         if(i*3 + j === tile) {
    //             newBoard[i].push(team)
    //         } else {
    //             newBoard[i].push(board[i][j])
    //         }
    //     }
    // }

    // อังกอล แบบใหม่ สั้นกว่า BigO น้อยกว่าหลายเท่า
    let row = Math.floor(tile/3);
    row = row*3
    let index = tile-row ;
    newBoard[Math.floor(tile/3)][index]=team;
    //

    console.log(`new board: ${newBoard}`, tile, team)
    return newBoard
}
export default (board) => {
    for(var row = 0; row<board.length; row++) {
        for(var col = 0; col < board[row].length; col++) {
            // ค่า tile จะมีเป็น x กับ o หรือ team ว่าอยู่ team ไหน.
            let tile = board[row][col]
            if(!tile) {
                return false
            }
        }
    }

    return true
}
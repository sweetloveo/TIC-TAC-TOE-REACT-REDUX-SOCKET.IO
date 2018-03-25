export default (team, board) => {
    let winningPaths = [
        [0,1,2],
        [3,4,5],
        [6,7,8],
        [0,3,6],
        [1,4,7],
        [2,5,8],
        [0,4,8],
        [6,4,2]
    ]
    let usersSelectedTileIndexes = board.reduce((selectedIndexes, row, i) => {
        row.forEach((tile, j) => {
            if(tile === team) {
                console.log(tile);
                selectedIndexes.push(i*3 + j)
            }
        })
        return selectedIndexes
    }, []) // นับว่าของ User ตัวเอง มี ตำแหน่งที่เท่าไหร่บ้าง ยัดใส่ selectedIndexes ที่เป็น Array

    // นำArray ของตัวที่ได้ มาเช็ค ตาม แพทเทิล ที่ถูกต้อง หากมีหนึ่งในนั้นตรงตามแพทเทิล ก็ถือว่าตัวเองชนะทันที !!!
    let didPlayerWin = false
    winningPaths.forEach(path => {
        // หา tile ที่ถูกต้อง ใน Array ของ user หาก เจอ สามอันติดต่อกัน แปลว่า มีแพทเทิลถูก มีการชนะเกิดขึ้น
        let matchingTiles = path.filter(tile => usersSelectedTileIndexes.indexOf(tile) >= 0)
        if(matchingTiles.length === 3) {
            didPlayerWin = matchingTiles
        }
    })

    return didPlayerWin 
}
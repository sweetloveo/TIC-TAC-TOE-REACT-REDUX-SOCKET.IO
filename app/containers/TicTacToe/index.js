import React from "react"
import { bindActionCreators } from "redux"
import { connect } from "react-redux"
import swal from 'sweetalert';
import TicTacToeBoard from "../../components/TicTacToeBoard"
import Tile from "../../components/TicTacToeTile" 
import PlayersNameDisplay from "../../components/PlayersNameDisplay"

import ResetButton from "./ResetButton"
import Wrapper from "./Wrapper"
import ChatWrapper from "./ChatWrapper"
import Row from "./Row"

import * as actions from "./actions"

class TicTacToe extends React.Component {
    scrollToBottom = () => {
        this.messagesEnd.scrollIntoView({ behavior: "smooth" });
    }
    componentDidMount() {
        this.scrollToBottom();
    }

    componentDidUpdate() {
        this.scrollToBottom();
    }
    componentWillMount() {
        
    }
    handleClick(e) {
        let { usersPlayer, gameOver } = this.props
        let selectedTile = e.target.getAttribute("data-tile")

        if(!usersPlayer.isPlayersTurn){
            swal("ผิดพลาด!", "เทิร์นของฝ่ายตรงข้ามครับ!", "error");

        }
        if(usersPlayer.isPlayersTurn&& !this.isTileEmpty(selectedTile)){
            swal("ผิดพลาด!", "ไม่สามารถลงซ้ำได้ครับ", "error");

        }
        if(usersPlayer.isPlayersTurn && !gameOver && this.isTileEmpty(selectedTile)) {
            this.setTile(selectedTile, usersPlayer.team)
        }
    }
    setTile(tile, team) {
        console.log("SETTING TILE:", tile, team)
        this.props.setTile(tile, team)
        this.props.endTurn()
        
        //set timeout allows the setTile event to complete and update the players
        //board, before trying to evaluate it for a winner
        this.props.evaluateBoard()
    }
    isTileEmpty(tile) {
        let row = Math.floor(tile / 3)
        let column = tile - row*3
        return this.props.board[row][column] === undefined ? true : false
    }
    //Make tile
    createTiles() {
        let counter = 0
        return this.props.board.map((row, i) => {
            return (
                <Row key={i}>
                    {row.map(tile => {
                        return (
                            <Tile onClick={(e) => this.handleClick(e)}
                                  team={tile}
                                  data-tile={counter}
                                  key={counter++} /> // plus 1 for in of tile
                        )
                     })
                    }
                </Row>
            )
        })
    }
    // End make tile
    renderGameOverResults(winner) {
        return (winner === "draw") ? 
                    (<h2 style={{color:'yellow'}}>Game Over! เกมเสมอครับ...</h2>) :
                    (<h2 style={{color:'yellow'}}>Game Over! {winner.name} เป็นฝ่าย ชนะ!</h2>)
    }
    rendermessage(){

        return this.props.Allmessages.map((object)=>{
            if(object.name === this.props.usersPlayer.name)
            {
                return (<li style={{background: '#B3ED7A',
                    float: 'right',clear: 'both',
                    padding: '10px 15px',
                    borderRadius: '20px',
                    marginBottom: '5px'}}>
                    {object.message}
                </li>)
            }

            else {
                return (
                    <li style={{
                        background: '#eee',
                        padding: '10px 15px',
                        borderRadius: '20px',
                        marginBottom: '5px',
                        float: 'left',
                        clear: 'both'
                    }}>
                        {object.message}
                    </li>

                )
            }
        })
    }
    handleKeyPress(e){
        if (e.key === 'Enter') {
            this.props.sentchat(this.props.usersPlayer,e.target.value);
            e.target.value = null;

        }

    }
    receivereset(){
        if(this.props.receivereset === true){
            swal({
                title: "ฝ่ายตรงข้ามขอเริ่มเกมใหม่ ?",
                text: "หากยอมรับที่จะเริ่มเกมใหม่ โปรดกด 'ตกลง' ",
                icon: "warning",
                buttons: true,
                dangerMode: true,
            })
                .then((willDelete) => {
                    if (willDelete) {
                        this.props.resetGame()
                        swal("เรียบร้อย! เกมเริ่มใหม่!", {
                            icon: "success",
                        });
                    } else {
                        swal("ปฎิเสธการ! เริ่มเกมใหม่");
                    }
                });

        }
        this.props.receivealready();

    }
    reqreset(){
        swal({
            title: "คุณมั่นใจที่จะขอเริ่มเกมใหม่ ?",
            text: "ต้องการส่งขอเรื่มเกมใหม่ให้อีกฝ่าย โปรดกด 'ตกลง' ",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
            .then((willDelete) => {
                if (willDelete) {
                    this.props.sentreset();
                    swal("เรียบร้อย! ระบบทำการส่งขอเริ่มเกมใหม่แล้ว!", {
                        icon: "success",
                    });
                } else {
                    swal("ยกเลิกการขอเริ่มเกมใหม่");
                }
            });

    }

    render() {
        let { player1, player2, gameOver, winner, usersPlayer, isOnlineMatch } = this.props

        return (
            <div style={{ width:'100%',
                margin:'auto'}}>
            <Wrapper>
                <PlayersNameDisplay players={{player1, player2}}/>
                <TicTacToeBoard>
                    {this.createTiles()}
                </TicTacToeBoard>
                { gameOver ? this.renderGameOverResults(winner) : null }
                {this.receivereset()}
                <ResetButton style={{color:'#f6f6f6'}} onClick={()=>(this.reqreset())}>เริ่มเกมใหม่</ResetButton>
            </Wrapper>
            <ChatWrapper>
                <div style={{width:'80%',borderRadius:'3px',color:'#696969'}}>
                    <div style={{ maxWidth: '80%',
                        margin: '0 auto',
                        padding: '15px'}}>
                        <div style={{background: '#fff',
                            padding: '15px',
                            border: '1px solid #eee',
                            height:'80%',
                            marginTop:'2rem'}}>
                            <h4 style={{marginTop:'-0.7rem',fontSize:'1.5rem',textDecoration:'underline'}}>ระบบแชท</h4>
                            <ul style={{listStyle: 'none',
                                padding: '0 0 10px 0',
                                overflow: 'auto',
                                height: '84%'}}>
                                {this.rendermessage()}
                                <div style={{ float:"left", clear: "both" }}
                                     ref={(el) => { this.messagesEnd = el; }}>
                                </div>
                            </ul>
                                <input onKeyPress={(e)=>(this.handleKeyPress(e))} style={{width: '100%', borderRadius: '3px',background: '#f5f5f5',
                                    padding: '10px',
                                    border: '1px solid #d5d5d5'}} type="text" id="chat-message" placeholder="พิมพ์ข้อความลงที่นี่...."/>
                        </div>
                    </div>
                </div>
            </ChatWrapper>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        ...state.ticTacToe,
        isOnlineMatch: state.matchMaking.isOnlineMatch
    }
}
function mapDispatchToProps(dispatch) {
    return bindActionCreators(actions, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(TicTacToe)
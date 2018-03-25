import React from "react"
import Wrapper from "./Wrapper"
import Player from "./Player"
import ReactCountdownClock from "react-countdown-clock"
import * as actions from "../../containers/TicTacToe/actions";

import { bindActionCreators } from "redux"
import { connect } from "react-redux"


class topTile extends React.Component {

    switchplayer(){
        if(this.props.usersPlayer.isPlayersTurn === true) {
            this.props.switchplayer();
        }
    }
    Timer(){
        return this.props.numberturn.map((item)=>{return (<ReactCountdownClock seconds={item}
                                                                         color="#CFCFCF"
                                                                         alpha={0.9}
                                                                         size={100}
                                                                         weight={10}
                                                                         paused={this.props.winnerState}
                                                                         onComplete={()=>this.switchplayer()}
        />)})

        }
    render(){
        let { player1, player2 } = this.props.players
        return (
            <Wrapper>
                <Player player={player1} />
                <div style={{marginLeft:'-6rem'}}>
                    {this.Timer()}
                </div>
                <Player player={player2} />
            </Wrapper>
        )

    }
}
function mapStateToProps(state) {
    return {
        ...state.ticTacToe
    }
}
function mapDispatchToProps(dispatch) {
    return bindActionCreators(actions, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(topTile)
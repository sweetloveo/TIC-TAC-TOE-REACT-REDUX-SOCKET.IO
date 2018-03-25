import React from "react"
import { bindActionCreators } from "redux"
import { connect } from "react-redux"
import { push } from "react-router-redux"

import Wrapper from "./Wrapper"
import RockPaperScissorsSelections from "./RockPaperScissorsSelections"
import RockPaperScissorsOptions from "../../components/RockPaperScissorsOptions"
import RockPaperScissorsImage from "../../components/RockPaperScissorsImage"
import AnimatedText from "../../components/MatchMakingSearchText"
import ReadyText from "./ReadyText"
import Center from "./Center"

import * as actions from "./actions"

class RockPaperScissors extends React.Component {
    handleClick(choice) {
        this.props.rockPaperScissors(choice)
    }
    renderRockPaperScissorsGame() {
        let OpponentsRockPaperScissorsMove = 
                    this.props.opponentsSelection ? <ReadyText  style={{color:'#f6f6f6'}} mode="single">คู่แข่งเลือกเรียบร้อยแล้ว!</ReadyText>
                                                  : <AnimatedText style={{width: "70%",color:'#f6f6f6'}}>คู่แข่งกำลังเลือก...</AnimatedText>
        return (
            <Wrapper>
                <RockPaperScissorsOptions selected={this.props.usersSelection} onClick={this.handleClick.bind(this)}/>
                <RockPaperScissorsSelections>
                    { OpponentsRockPaperScissorsMove }
                </RockPaperScissorsSelections>
            </Wrapper>
        )
    }
    renderRockPaperScissorsResult() {
        let props = this.props
        if(props.won) {
            setTimeout(() => props.push("/ticTacToe"), 6000)
            props.handleWin()
            return (
                <Center style={{color:'#f6f6f6'}}><div style={{display:'block',marginBottom:'-30rem'}}>
                    <img src={'/assets/images/WIN.png'} alt="LOGO" style={{width: '100%', }} className="img-responsive"/>
                </div>
                    ยินดีด้วยคุณ ชนะ !! การเป่ายิ่งฉุบ</Center>

            )
        } else if(props.draw) {
            setTimeout(() => props.resetRockPaperScissors(), 4000)
            return (
                <Center  style={{color:'#f6f6f6'}}><div style={{display:'block',marginBottom:'-30rem'}}>
                    <img src={'/assets/images/DRAW.png'} alt="LOGO" style={{width: '100%'}} className="img-responsive"/>
                </div>
                    คุณสองคนได้เป่าเสมอกัน !! เอาใหม่ๆนะ</Center>
            )
        } else {
            setTimeout(() => props.push("/ticTacToe"), 6000)
            props.handleLoss()
            return (
                <Center  style={{color:'#f6f6f6'}}><div style={{display:'block',marginBottom:'-30rem'}}>
                    <img src={'/assets/images/LOSE.png'} alt="LOGO" style={{width:'100%'}} className="img-responsive"/>
                </div>
                    เสียใจด้วย แพ้ !! การเป่ายิ่งฉุบ</Center>
            )
        }
    }
    render() {
        return (
            <Wrapper>
                {this.props.results ? this.renderRockPaperScissorsResult() 
                                    : this.renderRockPaperScissorsGame()}
            </Wrapper>
        )
    }
}

function mapStateToProps(state) {
    return {
        ...state.rockPaperScissors,
        ...state.matchMaking
    }
}
function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        push,
        ...actions
    }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(RockPaperScissors)
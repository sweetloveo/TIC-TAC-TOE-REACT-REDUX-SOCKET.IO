import React from "react"
import { connect } from "react-redux"
import { push } from "react-router-redux"
import { bindActionCreators } from "redux"
import { Textfit } from "react-textfit"

import Wrapper from "./Wrapper"
import AnimatedSearchText from "../../components/MatchMakingSearchText"
import * as actions from "./actions"

class MatchMakingPage extends React.Component {
    componentDidMount() {
        this.props.findOpponent()
    }
    renderSearchingForOpponent() {
        return (
            <AnimatedSearchText style={{width: "70%",color:'#f6f6f6'}}>กำลังหาคู่แข่ง...</AnimatedSearchText>
        )
    }
    renderFoundOpponent() {
        setTimeout(() => this.props.push("/rockPaperScissors"), 3000)
        return (
            <Textfit mode="single" style={{width: "70%",color:'#f6f6f6'}}>ค้นหาคู่แข่งสำเร็จ!</Textfit>
        )
    }
    render() {
        return (
            <Wrapper>
                {this.props.foundOpponent ? this.renderFoundOpponent() : this.renderSearchingForOpponent()}
            </Wrapper>
        )
    }
}

function mapStateToProps(state) {
    return {
        ...state.matchMaking
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        push,
        ...actions
    }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(MatchMakingPage)
import React from "react"
import RockPaperScissorsOption from "../RockPaperScissorsOption"
import RockPaperScissorsImage from "../RockPaperScissorsImage"
import Wrapper from "./Wrapper"

export default class RockPaperScissorsOptions extends React.Component {
    render() {
        let { choice, onClick, selected } = this.props
        return (
            <Wrapper>
                <RockPaperScissorsOption onClick={(e) => onClick("rock")} >
                    <h1 style={{color: selected === "rock" ? "yellow" : "#f6f6f6"}}>ค้อน</h1>
                    <RockPaperScissorsImage type={"rock"}
                                            selected={selected === "rock"} />
                </RockPaperScissorsOption>

                <RockPaperScissorsOption onClick={(e) => onClick("paper")}>
                    <h1 style={{color: selected === "paper" ? "yellow" : "#f6f6f6"}}>กระดาษ</h1>
                    <RockPaperScissorsImage type={"paper"}
                                            selected={selected === "paper"} />
                </RockPaperScissorsOption>
                
                <RockPaperScissorsOption onClick={(e) => onClick("scissors")}>
                    <h1 style={{color: selected === "scissors" ? "yellow" : "#f6f6f6"}}>กรรไกร</h1>
                    <RockPaperScissorsImage type={"scissors"}
                                            selected={selected === "scissors"} />
                </RockPaperScissorsOption>
            </Wrapper>
        )
    }
}
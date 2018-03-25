import React from "react"
import { Route } from "react-router-dom"

import HomePage from "../HomePage"
import TicTacToe from "../TicTacToe"
import RockPaperScissors from "../RockPaperScissors"
import MatchMaking from "../MatchMaking"

import Wrapper from "./Wrapper"

export default class App extends React.Component {
    render() {
        return (
            <Wrapper bg="/assets/images/chalkboard.jpg">
                <Route exact path="/" component={HomePage} />
                <Route path="/ticTacToe" component={TicTacToe} />
                <Route path="/rockPaperScissors" component={RockPaperScissors} />
                <Route path="/online" component={MatchMaking} />
            </Wrapper>
        )
    }
}
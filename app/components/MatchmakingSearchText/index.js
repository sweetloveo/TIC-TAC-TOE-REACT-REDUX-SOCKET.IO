import React from "react"
import AnimatedSpan from "./AnimatedSpan"
import Wrapper from "./Wrapper"
import { Textfit } from "react-textfit"


export default class MatchmakingSearchText extends React.Component {
    handleClick(e) {
        let elements = document.getElementsByClassName("loading")
        for(var i=0; i<elements.length; i++) {
            let elem = elements[i]
            elem.style["animation-name"] = "loading"
        }
    }
    animateText(text) {
        let keyCounter = 0
        text = text.split("").map(letter => { 
            if(letter !== ".") 
                return letter

            let $animatedSpan = (
                <AnimatedSpan key={keyCounter++}>{letter}</AnimatedSpan>
            )
            return $animatedSpan
        })
        return text
    }
    render() {
        let animatedText = this.animateText(this.props.children)
        return (
            <Textfit mode="single" style={this.props.style}>
                {animatedText}
            </Textfit>
        )
    }
}


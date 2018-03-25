import React from "react"
import styled from "styled-components"
import "./animation.css"

const animationDuration = 700
const animationDelay = animationDuration/3
let delayCounter = 0

let Span = styled.span`
    animation-name: loading
    animation-iteration-count: infinite;
    animation-fill-mode: both;
    animation-duration: ${animationDuration}ms;
    animation-delay: ${animationDuration/3 * delayCounter++}ms;
`

export default (props) => {
    return(
        <Span>
            {props.children}
        </Span>
    )
}
import React from "react"
import styled from "styled-components"

let Board = styled.div`
    background-image: url(/assets/images/board.png);
    background-size: cover;
    display: inline-block;
`
export default (props) => {
    return (
        <Board>
            {props.children}
        </Board>
    )
}
import React from "react"
import styled from "styled-components"
import Link from "../Link"
import { Textfit } from "react-textfit"

let Button = styled.div`
    background-image: url(assets/images/button--chalk.png);
    background-size: 100% 100%;
    background-color: transparent;
    border: none;
    box-sizing: border-box;
    width: 400px;   
    height: 150px; 
    padding: 1em;
    opacity: .75;

    @media (max-width: 480px) {
        width: 300px;
        height: 112.5px;
    }

    @media (max-width: 400px) {
        width: 220px;
        height: 82.5px;
    }
`
let Div = styled.div`
    display:flex;
    justify-content: center;
    align-items: center;
    color: inherit;
    width: 100%;
    height: 100%;
    text-decoration: none;
`

let PaddedTextfit = styled(Textfit)`
    box-sizing: border-box;
    height: 100%;
    padding: 0 15px;
`

export default (props) => {
    let shouldRenderWithALink = props.to ? true : false
    let ButtonToRender

    if(shouldRenderWithALink) {
        ButtonToRender = (
            <Button {...props}>
                <PaddedTextfit mode="single" max={60} forceSingleModeWidth={false} >
                    <Link to={props.to}>{props.children}</Link>
                </PaddedTextfit>
            </Button>
        )
    } else {
        ButtonToRender = (
            <Button {...props}>
                <PaddedTextfit mode="single" max={60} forceSingleModeWidth={false} >
                    <Div> {props.children} </Div>
                </PaddedTextfit>
            </Button>
        )
    }
    
    return ButtonToRender
}
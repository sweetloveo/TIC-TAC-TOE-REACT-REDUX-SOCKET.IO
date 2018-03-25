import React from "react"
import styled from "styled-components"
import PlayerLogo from "./PlayerLogo"
import CenteredWrapper from "./CenteredWrapper"

let Player = styled.div`
    color: ${(props) => props.isPlayersTurn ? "yellow" : "#f6f6f6"};
`

export default (props) => {
    let { name, team, isPlayersTurn } = props.player

    if(name.length > 8)
        name = name.substring(0, 12)
        
    return (
        <CenteredWrapper>
            <Player isPlayersTurn={isPlayersTurn}>
                {name}
            </Player>
            <PlayerLogo team={team} />
        </CenteredWrapper>
    )
}
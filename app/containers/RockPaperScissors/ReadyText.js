import styled, { keyframes } from "styled-components"
import { Textfit } from "react-textfit"

let flashing = keyframes`
    0% { opacity: 0; } 
    10% { opacity: 1; }
    30% { opacity: 1; }
    65% { opacity: 1; }
    // 80% { opacity: .6; }
    100% { opacity: 0; }
`

export default styled(Textfit)`
    width: 70%;
    animation: ${flashing} 2s infinite;
`
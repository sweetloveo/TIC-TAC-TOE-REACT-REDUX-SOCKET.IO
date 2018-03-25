import styled from "styled-components"

let RockPaperScissorsOption = styled.div`
    max-height: 270px;
    display: flex;
    flex-direction: column;
    align-items: center;

    h1 {
        opacity: .8;
    }
    @media (max-width: 500px) {
        h1 {
            font-size: 20px;
        }
    }
`

export default RockPaperScissorsOption
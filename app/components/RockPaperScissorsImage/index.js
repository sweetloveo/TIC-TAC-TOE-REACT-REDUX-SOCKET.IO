import React from "react"
import styled from "styled-components"

const Rock = "/assets/images/rock.png"
const RockSelected = "/assets/images/rock--selected.png"
const Paper = "/assets/images/paper.png"
const PaperSelected = "/assets/images/paper--selected.png"
const Scissors = "/assets/images/scissors.png"
const ScissorsSelected = "/assets/images/scissors--selected.png"
const QuestionMark = "/assets/images/questionMark.png"

let RockPaperScissorsImage = styled.img`
    max-width: 100%;
    max-height: 180px;
    height: auto;
`

export default (props) => {
    let isImageSelected = props.selected

    let choices = {
        "rock": Rock,
        "paper": Paper,
        "scissors": Scissors,
        "none": QuestionMark
    }

    let selectedChoices = {
        "rock": RockSelected,
        "paper": PaperSelected,
        "scissors": ScissorsSelected,
    }

    let type = props.type ? props.type.toLowerCase() : "none"
    let imgSrc = isImageSelected 
                    ? selectedChoices[type] 
                    : choices[type]

    return (
        <RockPaperScissorsImage src={imgSrc} alt={type} />
    )
}
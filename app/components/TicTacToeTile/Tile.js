import styled from "styled-components"

const xURL = `url(/assets/images/x.png)`
const oURL = `url(/assets/images/o.png)`
const xURLWin = `url(/assets/images/x-yellow.png)`
const oURLWin = `url(/assets/images/o-yellow.png)`

let Tile = styled.div`
    background-image: ${({team,color}) => {
        if(team === "x"){
            if(color === "white")
            {
                return xURL;
            }
            else {
                return xURLWin;
            }
        }
        else{
            if(team === "o") {
                if (color === "white") {
                    return oURL;
                }
                else {
                    return oURLWin;
                }
            }
            else{
                return "";
            }
        }
}};
    background-size: 100% 100%;
    display: inline-block;
    width: 150px;
    height: 150px;

    @media (max-width: 600px) {
        width: 100px;
        height: 100px;
    }
`

export default Tile
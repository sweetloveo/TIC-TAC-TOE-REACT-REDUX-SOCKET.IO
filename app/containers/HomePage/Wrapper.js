import styled from "styled-components"

let Wrapper = styled.div`
    display: flex;
	flex-direction: column;
	flex-wrap: nowrap;
	justify-content: space-around;
	align-items: center;
	align-content: center;
	height:100%;
	
    @media (max-width: 860px) {
        flex-direction: column
        justify-content: space-around;
        height:80%;

    }
    @media (max-width: 480px) {
        button {
            font-size: 28px;
            width: 300px;
            height: 90px;
        }
    }
    @media (max-width: 400px) {
        button {
            font-size: 22px;
            width: 250px;
            height: 82px;
        }
    }
`

export default Wrapper
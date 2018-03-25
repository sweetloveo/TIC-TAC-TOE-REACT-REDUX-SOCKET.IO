import styled from "styled-components"

let Wrapper = styled.div`
    background-image: url(${(props) => props.bg});
    background-size: cover;
    height: 100%;
`

export default Wrapper
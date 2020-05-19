import styled from "styled-components"
import {theme} from "../../resources"

const HeaderDiv = styled.div`
    display: flex;
    justify-content: space-around;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 52px;
    background: ${theme.colors.secondaryLight};
    z-index: 10;
`

export default HeaderDiv
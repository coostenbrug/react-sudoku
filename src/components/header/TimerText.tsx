import styled from "styled-components"
import {theme} from "../../resources"

const TimerText = styled.p`
    display: inline;
    margin-right: 16px;
    margin-left: 48px;
    font-family: ${theme.fonts.mono};
    color: ${theme.colors.primary};
    font-size: 24px;
`
export default TimerText
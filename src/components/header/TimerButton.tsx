import styled from "styled-components"
import {theme} from "../../resources"

const TimerButton = styled.button`
    height: 32px;
    width: 32px;
    font-family: ${theme.fonts.mono};
    border: 2px solid;
    border-radius: 6px;
    font-size: 18px;

    :focus {
        outline: none;
    }
`

export default TimerButton
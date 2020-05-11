import styled from "styled-components"
import { theme } from "../../resources"
import { mix } from "chroma-js"

interface Props {
    controlMode?: number;
    color?: string;
}

const getStyleByControlMode = (controlMode?: number, color?: string): string => {
    switch (controlMode) {
        default:
        case -1: {
            return 'font-size: 22px;'
        }
        case 0: {
            return `font-size: 28px;`
        }
        case 1: {
            return `font-size: 18px;
                    position: absolute;
                    top: 3px;
                    bottom 5px;`
        }
        case 2: {
            return `font-size: 0px;
                ::before {
                    position: absolute;
                    top: 3px;
                    left: 3px;
                    content: "";
                    width: 38px;
                    height: 38px;
                    background: ${color};
                    border-radius: 5px;
                    border: solid 2px ${mix(color || "black", "black").toString()};
                    box-sizing: border-box;
                }
            `
        }
    }
}

const ControlButtonText = styled.p<Props>`
    ${(props: Props): string => getStyleByControlMode(props.controlMode, props.color)}
    font-family: ${theme.fonts.base};
    margin: 0;
`

ControlButtonText.defaultProps = {
    controlMode: -1
}

export default ControlButtonText
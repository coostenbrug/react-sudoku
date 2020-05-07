import styled from "styled-components"
import { theme } from "../../resources"

interface Props {
    controlMode?: number;
    color?: string;
}

const getStyleByControlMode = (controlMode?: number, color?: string) => {
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
                    top: 2px;
                    left: 2px;
                    content: "";
                    width: 40px;
                    height: 40px;
                    background: ${color};
                    border-radius: 6px;
                }
            `
        }
    }
}

const ControlButtonText = styled.p<Props>`
    ${(props: Props) => getStyleByControlMode(props.controlMode, props.color)}
    font-family: ${theme.fonts.base};
    margin: 0;
`

ControlButtonText.defaultProps = {
    controlMode: -1
}

export default ControlButtonText
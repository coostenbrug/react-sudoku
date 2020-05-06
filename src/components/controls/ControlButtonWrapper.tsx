import styled from "styled-components"
import { theme } from "../../resources"

interface Props {
    height?: number;
    width?: number;
    pressed?: boolean;
    disabled?: boolean;
    onClick?: Function;
}

const ControlButtonWrapper = styled.button<Props>((props: Props)=>({
    fontSize: "22px",
    position: "relative",
    fontFamily: theme.fonts.base,
    background: props.pressed ? "#aaaaaa" : "#ffffff",
    border: "solid black 2px",
    borderRadius: 8,
    height: props.height,
    width: props.width,
    ":active": {
        background: "#cccccc"
    },
    ":focus": {
        outline: "none"
    }
}))

ControlButtonWrapper.defaultProps = {
    height: 48,
    width: 48,
    pressed: false,
    disabled: false,
    onClick: ()=>{}
}

export default ControlButtonWrapper
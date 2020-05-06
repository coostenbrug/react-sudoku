import styled from "styled-components"

interface Props {
    height?: number;
    width?: number;
    pressed?: boolean;
}

const ControlButton = styled.button((props: Props)=>({
    background: props.pressed ? "#cccccc" : "#e3e3e3",
    borderRadius: 8,
    height: props.height,
    width: props.width,
    fontSize: "22px",
    ":active": {
        background: "#cccccc"
    },
    ":focus": {
        outline: "none"
    }
}))

ControlButton.defaultProps = {
    height: 40,
    width: 40
}

export default ControlButton
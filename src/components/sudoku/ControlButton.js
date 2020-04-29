import styled from "styled-components"

const ControlButton = styled.button(({height, width, pressed})=>({
    background: pressed ? "#cccccc" : "#e3e3e3",
    borderRadius: 8,
    height: height,
    width: width,
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
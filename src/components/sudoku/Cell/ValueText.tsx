import React from "react"
import styled from "styled-components"

interface Props {
    locked: boolean;
}

const ValueText = styled.p({
    fontSize: "40px",
    textAlign: "center",
    userSelect: "none",
    margin: "auto"
    },
    (props: Props)=>({
        fontWeight: props.locked ? 500 : 400
    })
)

ValueText.defaultProps = {
    locked: false
}

export default ValueText
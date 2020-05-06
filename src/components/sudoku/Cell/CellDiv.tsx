import React from "react"
import styled from "styled-components"

interface Props {
    size: number;
    selected: boolean;
}

const CellDiv = styled.div({
        display: "flex",
        position: "relative",
        border: "solid 1px black"
    },
    (props: Props)=>({
        width: props.size,
        height: props.size,
        backgroundColor: props.selected ? "cyan" : "white"
    })
)

CellDiv.defaultProps = {
    size: 56
}

export default CellDiv
import React from "react"
import styled from "styled-components"

const CellDiv = styled.div({
        border: "solid 1px black"
    },
    ({size})=>({
        width: size,
        height: size
    }),
    ({selected})=>({
        backgroundColor: selected ? "cyan" : "white"
    })
)

CellDiv.defaultProps = {
    size: "40px"
}

const CellText = styled.p({
    fontSize: "30px",
    textAlign: "center",
    userSelect: "none",
    margin: "auto"
    },
    ({locked})=>({
        fontWeight: locked ? 500 : 400
    })
)

const Cell = ({
        selected,
        value,
        locked,
        handleMouseDown,
        handleMouseEnter,
        xLoc,
        yLoc
    }, props) => {
    return (
        <CellDiv
            onMouseDown={(e) => handleMouseDown(e, xLoc, yLoc)}
            onMouseEnter={(e) => handleMouseEnter(e, xLoc, yLoc)}
            selected={selected}
            {...props}>
            <CellText locked={locked}>
                {value === 0 ? " " : value}
            </CellText>
        </CellDiv>
    )
}

export default Cell
import React from "react"
import styled from "styled-components"

const CellDiv = styled.div({
        display: "inline-block",
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
    display: "inline-block",
    margin: "auto"
})

const Cell = ({selected, value}, props) => {
    const [locked, setLocked] = React.useState(false)

    return (
        <CellDiv 
            selected={selected}
            {...props}>
            <CellText>
                {value}
            </CellText>
        </CellDiv>
    )
}

export default Cell
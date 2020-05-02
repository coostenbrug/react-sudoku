import React from "react"
import styled from "styled-components"

const CellDiv = styled.div({
        display: "flex",
        position: "relative",
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
    size: "56px"
}

const CellText = styled.p({
    fontSize: "40px",
    textAlign: "center",
    userSelect: "none",
    margin: "auto"
    },
    ({locked})=>({
        fontWeight: locked ? 500 : 400
    })
)

const NoteText = styled.p(({position})=>({
    margin: 0,
    position: "absolute",
    top: [4,22,39][Math.floor(position/3)],
    left: [4,23,42][position % 3],
    width: 10,
    height: 14,
    fontSize: "14px",
    lineHeight: 1,
    textAlign: "center",
    userSelect: "none"
}))

const renderNotes = notes => {
    let noteElements = new Array()
    let position = 0
    notes.forEach((note, i)=>{
        if(note === true) {
            console.log("pushin")
            noteElements.push(
            <NoteText 
            position={position}
            key={i}
            >
                {i}
            </NoteText>
            )
            position++
        }
    })
    return noteElements
}

const Cell = ({
        selected,
        value,
        locked,
        handleMouseDown,
        handleMouseEnter,
        xLoc,
        yLoc,
        notes
    }, props) => {
    return (
        <CellDiv
            onMouseDown={(e) => handleMouseDown(e, xLoc, yLoc)}
            onMouseEnter={(e) => handleMouseEnter(e, xLoc, yLoc)}
            selected={selected}
            {...props}>
            {value ? 
                <CellText locked={locked}>
                    {value}
                </CellText> 
                :
                renderNotes(notes)
            }
        </CellDiv>
    )
}

Cell.defaultProps = {
    selected: false,
    value: null,
    locked: false,
    handleMouseDown: () => {},
    handleMouseEnter: () => {},
    xLoc: -1,
    yLoc: -1,
    notes: []
}

export default Cell
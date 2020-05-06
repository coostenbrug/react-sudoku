import React from "react"
import styled from "styled-components"

interface CellDivProps {
    size: number;
    selected: boolean;
}

const CellDiv = styled.div({
        display: "flex",
        position: "relative",
        border: "solid 1px black"
    },
    (props: CellDivProps)=>({
        width: props.size,
        height: props.size,
        backgroundColor: props.selected ? "cyan" : "white"
    })
)

CellDiv.defaultProps = {
    size: 56
}

interface CellTextProps {
    locked: boolean;
}

const CellText = styled.p({
    fontSize: "40px",
    textAlign: "center",
    userSelect: "none",
    margin: "auto"
    },
    (props: CellTextProps)=>({
        fontWeight: props.locked ? 500 : 400
    })
)

CellText.defaultProps = {
    locked: false
}

interface NoteTextProps {
    position: number;
}
const NoteText = styled.p`
    margin: 0;
    position: absolute;
    top: ${(props: NoteTextProps) => [4,22,39][Math.floor(props.position/3)]+"px"};
    left: ${(props: NoteTextProps) => [4,23,42][props.position % 3]+"px"};
    width: 10;
    height: 14;
    font-size: 14px;
    line-height: 1;
    text-align: center;
    user-select: none;
`

const renderNotes = (notes: boolean[]) => {
    let noteElements = new Array()
    let position = 0
    notes.forEach((note, i)=>{
        if(note === true) {
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

interface CellProps {
    selected: boolean;
    value: number;
    locked: boolean;
    handleMouseDown: Function;
    handleMouseEnter: Function;
    xLoc: number;
    yLoc: number;
    notes: boolean[];

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
    }: CellProps, props: CellProps) => {
    return (
        <CellDiv
            size={56}
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
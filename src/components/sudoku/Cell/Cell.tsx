import React from "react"
import NoteText from "./NoteText"
import CellDiv from "./CellDiv"
import ValueText from "./ValueText"

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

interface Props {
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
    }: Props, props: Props) => {
    return (
        <CellDiv
            size={56}
            onMouseDown={(e) => handleMouseDown(e, xLoc, yLoc)}
            onMouseEnter={(e) => handleMouseEnter(e, xLoc, yLoc)}
            selected={selected}
            {...props}>
            {value ? 
                <ValueText locked={locked}>
                    {value}
                </ValueText> 
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
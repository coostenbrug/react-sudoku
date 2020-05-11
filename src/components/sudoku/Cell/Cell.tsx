import React from "react"
import NoteText from "./NoteText"
import CellDiv from "./CellDiv"
import ValueText from "./ValueText"

const renderNotes = (notes: boolean[]): React.ReactElement[] => {
    const noteElements: React.ReactElement[] = []
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
    bgColor: number;
}

const Cell = ({
        selected,
        value,
        locked,
        handleMouseDown,
        handleMouseEnter,
        xLoc,
        yLoc,
        notes,
        bgColor
    }: Props, props: Props): React.ReactElement => {
    return (
        <CellDiv
            size={56}
            bgColor={bgColor}
            onMouseDown={(e): void => handleMouseDown(e, xLoc, yLoc)}
            onMouseEnter={(e): void => handleMouseEnter(e, xLoc, yLoc)}
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
    handleMouseDown: (): void => {return},
    handleMouseEnter: (): void => {return},
    xLoc: -1,
    yLoc: -1,
    notes: [],
    bgColor: 1
}

export default Cell
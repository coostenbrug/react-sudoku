import React from "react"
import CellGroup from "./CellGroup"
import { Cell } from "./Cell"
import styled from "styled-components"
import { BoardData } from "../../types/types"
import { CellArray } from "../../utils"

const SudokuBoardWrap = styled.div({
    margin: "auto"
})

interface Props {
    boardData: BoardData;
    cellData: CellArray;
    cellFunctions: {
        handleMouseDown: Function;
        handleMouseEnter: Function;
    }
}

const SudokuBoard = (props: Props) => {
    const { 
        height,
        groupHeight,
        width,
        groupWidth,
    } = props.boardData

    const {
        handleMouseDown,
        handleMouseEnter
    } = props.cellFunctions

    const { cellData } = props

    const mapCells = (gri: number , gci: number, i: number) => {
        let elementArray = new Array(groupWidth)
        for (let j = 0; j < groupWidth; j++) {
            let x = groupHeight*gri+i
            let y = groupWidth*gci+j
            let cell = cellData[x][y]
            elementArray[j] = (
                <Cell
                  key={`Cell ${x},${y}`}
                  xLoc={x}
                  yLoc={y}
                  {...cell}
                  handleMouseDown={handleMouseDown}
                  handleMouseEnter={handleMouseEnter}
                />
            )
        }
        return elementArray
    }

    const mapCellRows = (gri: number, gci: number) => {
        let elementArray = new Array(groupHeight)
        for (let i = 0; i < groupHeight; i++) {
            elementArray[i] = (
                <div style={{display: "flex"}} key={`CellRow ${gri}:${i}`}>
                    {mapCells(gri,gci,i)}
                </div>
            )
        }
        return elementArray
    }

    return (
        <SudokuBoardWrap>
            {[...Array(height/groupHeight)].map((e,gri)=>(
                <div style={{display: "flex"}} key={`GroupRow ${gri}`}>
                    {[...Array(width/groupWidth)].map((e,gci)=>(
                        <CellGroup key={`Group r:${gri},c:${gci}`}>
                            {mapCellRows(gri,gci)}
                        </CellGroup>
                    ))}
                </div>
            ))}
        </SudokuBoardWrap>
    )
}

export default SudokuBoard
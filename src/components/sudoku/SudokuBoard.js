import React from "react"
import CellGroup from "./CellGroup"
import Cell from "./Cell"
import styled from "styled-components"

const SudokuBoardWrap = styled.div({})

const SudokuBoard = ({boardData, cellData}) => {
    const { 
        height,
        groupHeight,
        width,
        groupWidth,
    } = boardData

    const {
        values,
        selected,
        locked,
        handleMouseDown,
        handleMouseEnter
    } = cellData

    const mapCells = (gri,gci,i) => {
        let elementArray = new Array(boardData.groupWidth)
        for (let j = 0; j < boardData.groupWidth; j++) {
            let x = boardData.groupHeight*gri+i
            let y = boardData.groupWidth*gci+j
            elementArray[j] = (
                <Cell
                  key={`Cell ${x},${y}`}
                  xLoc={x}
                  yLoc={y}
                  value={values[x][y]}
                  selected={selected[x][y]}
                  locked={locked[x][y]}
                  handleMouseDown={handleMouseDown}
                  handleMouseEnter={handleMouseEnter}
                />
            )
        }
        return elementArray
    }

    const mapCellRows = (gri,gci) => {
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
                            {mapCellRows(gri,gci,cellData)}
                        </CellGroup>
                    ))}
                </div>
            ))}
        </SudokuBoardWrap>
    )
}

export default SudokuBoard
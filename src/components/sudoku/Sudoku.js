import React from "react"
import CellGroup from "./CellGroup"
import Cell from "./Cell"
import styled from "styled-components"

const SudokuBoard = styled.div({})

const mapCells = (data,gri,gci,i,passToCell) => {
    let elementArray = new Array(data.groupWidth)
    for (let j = 0; j < data.groupWidth; j++) {
        let x = data.groupHeight*gri+i
        let y = data.groupWidth*gci+j
        elementArray[j] = (
            <Cell
              key={`Cell ${x},${y}`}
              xLoc={x}
              yLoc={y}
              value={data.values[x][y]}
              handleMouseDown={passToCell.handleMouseDown}
              handleMouseEnter={passToCell.handleMouseEnter}
              selected={passToCell.selected[x][y]}
            />
        )
    }
    return elementArray
}

const mapCellRows = (data,gri,gci,passToCell) => {
    let elementArray = new Array(data.groupHeight)
    for (let i = 0; i < data.groupHeight; i++) {
        elementArray[i] = (
            <div style={{display: "flex"}} key={`CellRow ${gri}:${i}`}>
                {mapCells(data,gri,gci,i,passToCell)}
            </div>
        )
    }
    return elementArray
}

const Sudoku = ({data}) => {

    const falseArray = Array(data.height).fill().map(() => Array(data.width).fill(false))

    const [selected, setSelected] = React.useState(falseArray)
    const [selectMode, setSelectMode] = React.useState(true)

    const handleCellMouseDown = (e,x,y) => {
        if (e.buttons === 1) {
            e.preventDefault()
            if (e.ctrlKey) {
                setSelectMode(!selected[x][y])
                let newSelected = [...selected]
                newSelected[x][y] = !selected[x][y]
                setSelected(newSelected)
            } else {
                setSelectMode(true)
                let newSelected = [...falseArray]
                newSelected[x][y] = true
                setSelected(newSelected)
            }
        }
    }

    const handleCellMouseEnter = (e,x,y) => {
        if (e.buttons === 1) {
            let newSelected = [...selected]
            newSelected[x][y] = selectMode
            setSelected(newSelected)
        }
    }

    const passToCell = {
        handleMouseDown: handleCellMouseDown,
        handleMouseEnter: handleCellMouseEnter,
        selected
    }

    return (
        <SudokuBoard>
            {[...Array(data.height/data.groupHeight)].map((e,gri)=>(
                <div style={{display: "flex"}} key={`GroupRow ${gri}`}>
                    {[...Array(data.width/data.groupHeight)].map((e,gci)=>(
                        <CellGroup key={`Group r:${gri},c:${gci}`}>
                            {mapCellRows(data,gri,gci, passToCell)}
                        </CellGroup>
                    ))}
                </div>
            ))}
        </SudokuBoard>
    )
}

export default Sudoku
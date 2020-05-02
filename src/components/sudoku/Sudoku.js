import React from "react"
import SudokuBoard from "./SudokuBoard"
import ControlPanel from "./ControlPanel"
import { CellArray } from "../../utils"

const Sudoku = ({data}) => {
    
    const falseArray = Array(data.height).fill().map(() => Array(data.width).fill(false))

    const [cellData, setCellData] = React.useState(new CellArray(data.cellData))
    const [values, setValues] = React.useState(data.values)
    const [isSelecting, setIsSelecting] = React.useState(true)
    const [controlMode, setControlMode] = React.useState(0)

    React.useEffect(() => {
        document.addEventListener("keydown", handleKeyDown);
        return () => document.removeEventListener("keydown", handleKeyDown);
    })
      

    const handleCellMouseDown = (e,x,y) => {
        if (e.buttons === 1) {
            e.preventDefault()
            if (e.ctrlKey) {
                setIsSelecting(!cellData[x][y].selected)
                let newCellData = new CellArray(cellData)
                cellData[x][y].selected = !cellData[x][y].selected
                setCellData(newCellData)
            } else {
                setIsSelecting(true)
                let newCellData = new CellArray(cellData)
                newCellData.forEachCell((cell)=>{
                    cell.selected = false
                })
                newCellData[x][y].selected = true
                setCellData(newCellData)
            }
        }
    }

    const handleCellMouseEnter = (e,x,y) => {
        if (e.buttons === 1) {
            let newCellData = new CellArray(cellData)
            newCellData[x][y].selected = isSelecting
            setCellData(newCellData)
        }
    }

    const setSelectedCellValues = value => {
        let shouldEraseValue = cellData.queriedCellsAllHaveProperty(
          cell=>(cell.value !== value),
          cell=>(cell.selected && !cell.locked),
        )

        let newCellData = new CellArray(cellData)
        newCellData.forEachCell((cell)=>{
            if(cell.selected && !cell.locked) {
                if (shouldEraseValue) {
                    cell.value = null
                } else {
                    cell.value = value
                    cell.notes = []
                }
            }
        })
        setValues(newCellData)
    }

    const toggleSelectedCellNotes = note => {
        let shouldEraseNote = cellData.queriedCellsAllHaveProperty(
          cell=>(!cell.notes || !cell.notes[note]),
          cell=>(cell.selected && !cell.locked && !cell.value)
        )

        let newCellData = new CellArray(cellData)
        newCellData.forEachCell((cell)=>{
            if(cell.selected && !cell.locked && !cell.value) {
                if (!cell.notes) {cell.notes = new Array(9)}
                if (shouldEraseNote) {
                    cell.notes[note] = false
                } else {
                    cell.notes[note] = true
                }
            }
        })
        setValues(newCellData)
    }

    const modifyCellContents = value => {
        switch (controlMode) {
            default:
            case 0:
                setSelectedCellValues(value)
                break;
            case 1:
                toggleSelectedCellNotes(value)
                break;
        }
    }

    const clearCellContents = () => {
        let newCellData = new CellArray(cellData)
        newCellData.forEachCell((cell)=>{
            if(cell.selected && !cell.locked) {
                cell.value = null
                cell.notes = []
            }
        })
        setValues(newCellData)
    }

    const handleKeyDown = e => {
        switch (e.key) {
            case "1":
            case "2":
            case "3":
            case "4":
            case "5":
            case "6":
            case "7":
            case "8":
            case "9":
                modifyCellContents(e.key)
                break;

            case "Delete":
            case "Backspace":
                clearCellContents()
                break;
                
            default:
                break;
        }
    }

    const handleControlPanelClick = (e, code) => {
        switch (code) {
            case "1":
            case "2":
            case "3":
            case "4":
            case "5":
            case "6":
            case "7":
            case "8":
            case "9":
                modifyCellContents(code)
                break;

            case "erase":
                clearCellContents()
                break;

            case "ans":
                setControlMode(0)
                break;

            case "note":
                setControlMode(1)
                break;

            default:
                break;
        }
    }

    const cellFunctions = {
        handleMouseDown: handleCellMouseDown,
        handleMouseEnter: handleCellMouseEnter
    }

    return(
    <div style={{display: "flex", flexDirection: "column", justifyContent: "space-between"}}>
        <SudokuBoard boardData={data.boardData} cellData={data.cellData} cellFunctions={cellFunctions}/>
        <ControlPanel controlMode={controlMode} handleOnClick={handleControlPanelClick}/>
    </div>
)}

export default Sudoku
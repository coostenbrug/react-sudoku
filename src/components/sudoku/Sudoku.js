import React from "react"
import SudokuBoard from "./SudokuBoard"
import ControlPanel from "./ControlPanel"
import { CellArray, Stack } from "../../utils"
import cellDataReducer from "./cellDataReducer"

const Sudoku = ({data}) => {
    
    const [cellData, dispatchCellData] = React.useReducer(cellDataReducer,{data: new CellArray(data.cellData), memory: {undo: new Stack(), redo: new Stack()}})
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
                setIsSelecting(!cellData.data[x][y].selected)
                dispatchCellData({type: "TOGGLE_SEL", cell: {x: x, y: y}})
            } else {
                setIsSelecting(true)
                dispatchCellData({type: "RESET_SEL",  cell: {x: x, y: y}})
            }
        }
    }

    const handleCellMouseEnter = (e,x,y) => {
        if (e.buttons === 1) {
            dispatchCellData({type: "SET_SEL", cell: {x: x, y: y}, input: isSelecting})
        }
    }

    const modifyCellContents = input => {
        switch (controlMode) {
            default:
            case 0:
                dispatchCellData({type: "TOGGLE_SEL_CELLS_VALUE", input: input})
                break;
            case 1:
                dispatchCellData({type: "TOGGLE_SEL_CELLS_NOTE", input: input})
                break;
        }
    }

    const clearCellContents = () => {
        dispatchCellData({type: "CLEAR_SEL_CELLS"})
    }

    const undo = () => {
        dispatchCellData({type: "MEM_UNDO"})
    }

    const redo = () => {
        dispatchCellData({type: "MEM_REDO"})
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

            case "undo":
                undo()
                break;
            case "redo":
                redo()
                break;
            default:
                break;
        }
    }

    const cellFunctions = {
        handleMouseDown: handleCellMouseDown,
        handleMouseEnter: handleCellMouseEnter
    }

    const controlPanelFunctions = {
        modifyCellContents,
        clearCellContents,
        setControlMode,
        undo,
        redo
    }

    return(
    <div style={{display: "flex", flexDirection: "column", justifyContent: "space-between"}}>
        <SudokuBoard boardData={data.boardData} cellData={cellData.data} cellFunctions={cellFunctions}/>
        <ControlPanel controlMode={controlMode} functions={controlPanelFunctions}/>
    </div>
)}

export default Sudoku
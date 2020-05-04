import React from "react"
import SudokuBoard from "./SudokuBoard"
import ControlPanel from "./ControlPanel"
import { CellArray, Stack } from "../../utils"
import cellDataReducer from "./cellDataReducer"

const Sudoku = ({data}) => {
    
    const [cellData, dispatchCellData] = React.useReducer(cellDataReducer,new CellArray(data.cellData))
    const [isSelecting, setIsSelecting] = React.useState(true)
    const [controlMode, setControlMode] = React.useState(0)
    const undoMemory = React.useRef(new Stack())
    const redoMemory = React.useRef(new Stack())

    React.useEffect(() => {
        document.addEventListener("keydown", handleKeyDown);
        return () => document.removeEventListener("keydown", handleKeyDown);
    })
      
    const handleCellMouseDown = (e,x,y) => {
        if (e.buttons === 1) {
            e.preventDefault()
            if (e.ctrlKey) {
                setIsSelecting(!cellData[x][y].selected)
                dispatchCellData({type: "toggleCellSelection", cell: {x: x, y: y}})
            } else {
                setIsSelecting(true)
                dispatchCellData({type: "resetCellSelection",  cell: {x: x, y: y}})
            }
        }
    }

    const handleCellMouseEnter = (e,x,y) => {
        if (e.buttons === 1) {
            dispatchCellData({type: "setCellSelection", cell: {x: x, y: y}, input: isSelecting})
        }
    }

    const saveToUndoMemory = () => {
        //TODO: update memory only when board data has actually changed
        // JSON.parse(JSON.stringify(obj)) is used to "clone" the object to save to memory
        const saveMemory = new CellArray(JSON.parse(JSON.stringify(cellData)))
        undoMemory.current.push(saveMemory)
    }

    const saveToRedoMemory = () => {
        // JSON.parse(JSON.stringify(obj)) is used to "clone" the object to save to memory
        const saveMemory = new CellArray(JSON.parse(JSON.stringify(cellData)))
        redoMemory.current.push(saveMemory)
    }

    const clearRedoMemory = () => {
        redoMemory.current.clear()
    }

    const modifyCellContents = input => {
        updateMemoryStacks()

        switch (controlMode) {
            default:
            case 0:
                dispatchCellData({type: "toggleSelectedValue", input: input})
                break;
            case 1:
                dispatchCellData({type: "toggleSelectedNote", input: input})
                break;
        }
    }

    const clearCellContents = () => {
        updateMemoryStacks()
        dispatchCellData({type: "clearSelectedCells"})
    }

    const applyMemoryToCellData = memory => {
        dispatchCellData({type: "applyMemory", input: memory})
    }

    const undo = () => {
        //TODO: do not apply selected prop from memory
        const memory = undoMemory.current.pop()
        
        if (memory) {
            saveToRedoMemory()
            applyMemoryToCellData(memory)
        }
    }

    const redo = () => {
        const memory = redoMemory.current.pop()
        
        if (memory) {
            saveToUndoMemory()
            applyMemoryToCellData(memory)
        }
    }

    const updateMemoryStacks = () => {
        //TODO: update memory only when board data has actually changed
        if(true) {
            saveToUndoMemory()
            clearRedoMemory()
        }
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
        <SudokuBoard boardData={data.boardData} cellData={cellData} cellFunctions={cellFunctions}/>
        <ControlPanel controlMode={controlMode} functions={controlPanelFunctions}/>
    </div>
)}

export default Sudoku
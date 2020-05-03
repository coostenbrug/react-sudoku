import React from "react"
import SudokuBoard from "./SudokuBoard"
import ControlPanel from "./ControlPanel"
import { CellArray, Stack } from "../../utils"

const Sudoku = ({data}) => {
    
    const [cellData, setCellData] = React.useState(new CellArray(data.cellData))
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
        let newCellData = new CellArray(cellData)

        switch (controlMode) {
            default:
            case 0:
                newCellData.setSelectedCellsValue(input)
                break;
            case 1:
                newCellData.toggleSelectedCellsNote(input)
                break;
        }
        setCellData(newCellData)        
    }

    const clearCellContents = () => {
        updateMemoryStacks()
        let newCellData = new CellArray(cellData)

        newCellData.forEachCell((cell)=>{
            if(cell.selected && !cell.locked) {
                cell.value = null
                cell.notes = []
            }
        })
        setCellData(newCellData)
    }

    const applyMemoryToCellData = memory => {
        let newCellData = new CellArray(cellData)
        newCellData.forEachCell((cell,i,j) => {
            cell.value = memory[i][j].value
            cell.notes = memory[i][j].notes
        })
        setCellData(newCellData)
    }

    const undo = () => {
        //TODO: do not apply selected prop from memory
        console.log("undo")

        const memory = undoMemory.current.pop()
        
        if (memory) {
            saveToRedoMemory()
            applyMemoryToCellData(memory)
        }
    }

    const redo = () => {
        console.log("redo")

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
        <SudokuBoard boardData={data.boardData} cellData={data.cellData} cellFunctions={cellFunctions}/>
        <ControlPanel controlMode={controlMode} functions={controlPanelFunctions}/>
    </div>
)}

export default Sudoku
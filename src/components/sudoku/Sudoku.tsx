import React from "react"
import SudokuBoard from "./SudokuBoard"
import { ControlPanel } from "../controls"
import { CellArray, Stack } from "../../utils"
import cellDataReducer from "./cellDataReducer"
import { BoardData, Cell } from "../../types/types"

interface Props {
    data: {
        boardData: BoardData;
        cellData: CellArray | Cell[][] | Object[][];
    } 
}

const Sudoku = (props: Props) => {
    const { data } = props
    
    const [cellData, dispatchCellData] = React.useReducer(cellDataReducer,{data: new CellArray(data.cellData), memory: {undo: new Stack(), redo: new Stack()}})
    const [isSelecting, setIsSelecting] = React.useState(true)
    const [controlMode, setControlMode] = React.useState(0)

    React.useEffect(() => {
        document.addEventListener("keydown", handleKeyDown);
        return () => document.removeEventListener("keydown", handleKeyDown);
    })
      
    const handleCellMouseDown = (e: MouseEvent, x: number, y: number) => {
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

    const handleCellMouseEnter = (e: MouseEvent, x: number, y: number) => {
        if (e.buttons === 1) {
            dispatchCellData({type: "SET_SEL", cell: {x: x, y: y}, input: isSelecting})
        }
    }

    const modifyCellContents = (input: string) => {
        switch (controlMode) {
            default:
            case 0:
                dispatchCellData({type: "TOGGLE_SEL_CELLS_VALUE", input: input})
                break;
            case 1:
                dispatchCellData({type: "TOGGLE_SEL_CELLS_NOTE", input: input})
                break;
            case 2:
                dispatchCellData({type: "SET_SEL_CELLS_COLOR", input: input})
                break;
        }
    }

    const handleKeyDown = (e: KeyboardEvent) => {
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
                dispatchCellData({type: "CLEAR_SEL_CELLS"})
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
        clearCellContents: function() {dispatchCellData({type: "CLEAR_SEL_CELLS"})},
        setControlMode,
        undo: function() {dispatchCellData({type: "MEM_UNDO"})},
        redo: function() {dispatchCellData({type: "MEM_REDO"})}
    }

    const controlPanelState = {
        controlMode,
        undoDisabled: !cellData.memory.undo.peek(),
        redoDisabled: !cellData.memory.redo.peek()
    }

    return(
    <div style={{display: "flex", flexDirection: "column", justifyContent: "space-between"}}>
        <SudokuBoard boardData={data.boardData} cellData={cellData.data} cellFunctions={cellFunctions}/>
        <ControlPanel stateProps={controlPanelState} functions={controlPanelFunctions}/>
    </div>
)}

export default Sudoku
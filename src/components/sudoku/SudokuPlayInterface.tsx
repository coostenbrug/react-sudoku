import React from "react"
import SudokuBoard from "./SudokuBoard"
import { ControlPanel } from "../controls"
import { CellArray, Stack } from "../../utils"
import cellDataReducer from "./cellDataReducer"
import { BoardData, Cell } from "../../types/types"

interface Props {
    data: {
        boardData: BoardData;
        cellData: CellArray | Cell[][] | Record<string, any>[][];
    };
    controlMode: number;
    setControlMode: Function;
    isPaused: boolean;
}

const SudokuPlayInterface = (props: Props): React.ReactElement => {
    const { data, controlMode, setControlMode } = props
    
    const [cellData, dispatchCellData] = React.useReducer(cellDataReducer,{data: new CellArray(data.cellData), memory: {undo: new Stack<CellArray>(), redo: new Stack<CellArray>()}})
    const [isSelecting, setIsSelecting] = React.useState(true)
      
    const handleCellMouseDown = (e: MouseEvent, x: number, y: number): void => {
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

    const handleCellMouseEnter = (e: MouseEvent, x: number, y: number): void => {
        if (e.buttons === 1) {
            dispatchCellData({type: "SET_SEL", cell: {x: x, y: y}, input: isSelecting})
        }
    }

    const modifyCellContents = (input: string): void => {
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

    const cellFunctions = {
        handleMouseDown: handleCellMouseDown,
        handleMouseEnter: handleCellMouseEnter
    }

    const controlPanelFunctions = {
        modifyCellContents,
        clearCellContents: function(): void {dispatchCellData({type: "CLEAR_SEL_CELLS"})},
        setControlMode,
        undo: function(): void {dispatchCellData({type: "MEM_UNDO"})},
        redo: function(): void {dispatchCellData({type: "MEM_REDO"})}
    }

    const controlPanelState = {
        controlMode,
        undoDisabled: !cellData.memory.undo.peek(),
        redoDisabled: !cellData.memory.redo.peek()
    }

    return(
    <div style={{display: "flex", flexDirection: "column", justifyContent: "space-between"}}>
        {props.isPaused ? 
        <p>Paused</p>
        :
        <>
            <SudokuBoard boardData={data.boardData} cellData={cellData.data} cellFunctions={cellFunctions}/>
            <ControlPanel stateProps={controlPanelState} functions={controlPanelFunctions}/>
        </>}
    </div>
)}

export default SudokuPlayInterface
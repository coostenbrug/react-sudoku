import React from "react"
import SudokuPlayInterface from "./SudokuPlayInterface"
import ControlModeController from "./ControlModeController"
import { BoardData, Cell } from "../../types/types"
import { CellArray } from "../../utils"

interface Props {
    data: {
        boardData: BoardData;
        cellData: CellArray | Cell[][] | Object[][];
    } 
}

interface ControlModeControllerProps {
    controlMode: number;
    setControlMode: Function;
}

const Sudoku = (props: Props) => (
    <ControlModeController>{({controlMode, setControlMode}: ControlModeControllerProps) =>
        <SudokuPlayInterface data={props.data} controlMode={controlMode} setControlMode={setControlMode}/>
    }</ControlModeController>
)

export default Sudoku
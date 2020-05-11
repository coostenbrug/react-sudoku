import React from "react"
import SudokuPlayInterface from "./SudokuPlayInterface"
import ControlModeController from "./ControlModeController"
import { BoardData, Cell } from "../../types/types"
import { CellArray } from "../../utils"

interface Props {
    data: {
        boardData: BoardData;
        cellData: CellArray | Cell[][] | Record<string, any>[][];
    }; 
}

interface ControlModeControllerProps {
    controlMode: number;
    setControlMode: Function;
}

const Sudoku = (props: Props): React.ReactElement => (
    <ControlModeController>{({controlMode, setControlMode}: ControlModeControllerProps): React.ReactElement =>
        <SudokuPlayInterface data={props.data} controlMode={controlMode} setControlMode={setControlMode}/>
    }</ControlModeController>
)

export default Sudoku
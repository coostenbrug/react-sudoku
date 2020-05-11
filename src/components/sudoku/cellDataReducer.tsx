import _ from "lodash"
import { Cell, CellDataState, Action } from "../../types/types"
import { CellArray } from "../../utils"

function saveMemory(state: CellDataState, stack: string, cellArray: CellArray): void {
    const saveMemory = _.cloneDeep(cellArray)
    if (stack === "undo") {
        state.memory.undo.push(saveMemory)
    } else {
        state.memory.redo.push(saveMemory)
    }
}

function applyMemory(state: CellDataState, memory: CellArray): void {
    state.data.forEachCell((cell: Cell, i: number, j: number) => {
        cell.value = memory[i][j].value
        cell.notes = memory[i][j].notes
        cell.bgColor= memory[i][j].bgColor
    })
}

function cellIsEmpty(cell: Cell): boolean {
    return (
        cell.value === undefined
        && 
        (
            cell.notes === undefined 
            || 
            cell.notes?.every((note: boolean) => note === false
            )
        )
    )
}

function deepCompareStateData(state: CellDataState, newState: CellDataState): CellDataState {

    let shouldUpdate = false

    state.data.forEachCell((cell: Cell, i: number, j: number) => {
        if(
            cell.value !== newState.data[i][j].value
            ||
            cell.notes !== newState.data[i][j].notes
            ||
            cell.bgColor !== newState.data[i][j].bgColor
            ) {

            shouldUpdate = true
        }
    })

    if (shouldUpdate) {
        saveMemory(newState, "undo", state.data)
        newState.memory.redo.clear()
        return newState
    } else {
        return state
    }
}

function cellDataReducer(state: CellDataState, action: Action): CellDataState {

    const newState = _.cloneDeep(state)

    switch (action.type) {
        //Toggle value of selected cells
        case "TOGGLE_SEL_CELLS_VALUE": {
            const shouldEraseValue = state.data.queriedCellsAllHaveProperty(
                (cell: Cell)=>(cell.value !== action.input),
                (cell: Cell)=>(cell.selected && !cell.locked),
            )
            
            newState.data.forEachCell((cell: Cell)=>{
                if(cell.selected && !cell.locked) {
                    if (shouldEraseValue) {
                        cell.value = undefined
                    } else {
                        cell.value = action.input
                        cell.notes = []
                    }
                }
            })

            return deepCompareStateData(state, newState)
        }

        //Toggle notes of selected cells 
        case "TOGGLE_SEL_CELLS_NOTE": {
            const shouldEraseNote = state.data.queriedCellsAllHaveProperty(
                (cell: Cell)=>(!cell.notes || !cell.notes[action.input]),
                (cell: Cell)=>(cell.selected && !cell.locked && !cell.value)
              )
            
            newState.data.forEachCell((cell: Cell)=>{
                if(cell.selected && !cell.locked && !cell.value) {
                    if (!cell.notes) {cell.notes = new Array(9)}
                    if (shouldEraseNote) {
                        cell.notes[action.input] = false
                    } else {
                        cell.notes[action.input] = true
                    }
                }
            })
            return deepCompareStateData(state, newState)
        }

        //Set color of selected cells
        case "SET_SEL_CELLS_COLOR": {
            newState.data.forEachCell((cell: Cell)=>{
                if(cell.selected) {
                    cell.bgColor = action.input
                }
            })
            return deepCompareStateData(state, newState)
        }

        //Clear value, notes, or colors of selected cells
        case "CLEAR_SEL_CELLS": {

            // if any cell contains a note or value
              // clear notes and values
            // else clear colors

            let selectedCellsAreEmpty = true
            state.data.forEachCell((cell: Cell) => {
                if (cell.selected && !cell.locked && !cellIsEmpty(cell)) {
                    selectedCellsAreEmpty = false
                } 
            })

            if (selectedCellsAreEmpty) {
                // clear colors
                newState.data.forEachCell((cell: Cell)=>{
                    if (cell.selected) {
                        cell.bgColor = 1
                    }
                })
            } else {
                //clear notes and values
                newState.data.forEachCell((cell: Cell)=>{
                    if (cell.selected && !cell.locked) {
                        cell.value = undefined
                        cell.notes = []
                    }
                })
            }

            return deepCompareStateData(state, newState)
        }

        //Set a cell to selected/not selected
        case "SET_SEL": {
            if (action.cell !== undefined) {
                newState.data[action.cell.x][action.cell.y].selected = action.input
                return newState
            }
            return state
        }

        //Set a cell to the opposite selected state
        case "TOGGLE_SEL": {
            if (action.cell !== undefined) {
                newState.data[action.cell.x][action.cell.y].selected = !state.data[action.cell.x][action.cell.y].selected
                return newState
            } 
            return state
        }

        //Set all cells to not selected and the passed cell to selected
        case "RESET_SEL": {
            newState.data.forEachCell((cell: Cell)=>{
                cell.selected = false
            })
            if (action.cell !== undefined) {
                newState.data[action.cell.x][action.cell.y].selected = true
                return newState
            }
            return state
        }

        //Apply the top of the undo stack to board data, and save it to redo stack
        case "MEM_UNDO": {
            const undoMemory = newState.memory.undo.pop()
            if (undoMemory) {
                saveMemory(newState, "redo", state.data)
                applyMemory(newState, undoMemory)
            }
            
            return newState
        }

        //Apply the top of the redo stack to board data, and save it to undo stack
        case "MEM_REDO": {   
            const redoMemory = newState.memory.redo.pop()
            if (redoMemory) {
                saveMemory(newState, "undo", state.data)
                applyMemory(newState, redoMemory)
            }
            return newState
        }

        default: {
            throw new Error()
        }
    }
}

export default cellDataReducer
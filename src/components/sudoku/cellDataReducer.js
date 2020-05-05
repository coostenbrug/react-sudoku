import _ from "lodash"

function cellDataReducer(state, action) {

    let newState = _.cloneDeep(state)

    switch (action.type) {
        //Toggle value of selected cells
        case "toggleSelectedValue":
            let shouldEraseValue = state.data.queriedCellsAllHaveProperty(
                cell=>(cell.value !== action.input),
                cell=>(cell.selected && !cell.locked),
            )
            
              newState.data.forEachCell((cell,i,j)=>{
                if(cell.selected && !cell.locked) {
                    if (shouldEraseValue) {
                        cell.value = null
                    } else {
                        cell.value = action.input
                        cell.notes = []
                    }
                }
            })
            return newState

        //Toggle notes of selected cells
        case "toggleSelectedNote":
            let shouldEraseNote = state.data.queriedCellsAllHaveProperty(
                cell=>(!cell.notes || !cell.notes[action.input]),
                cell=>(cell.selected && !cell.locked && !cell.value)
              )
            
              newState.data.forEachCell((cell)=>{
                if(cell.selected && !cell.locked && !cell.value) {
                    if (!cell.notes) {cell.notes = new Array(9)}
                    if (shouldEraseNote) {
                        cell.notes[action.input] = false
                    } else {
                        cell.notes[action.input] = true
                    }
                }
            })
            return newState

        //Clear value and notes of selected cells
        case "clearSelectedCells":
            newState.data.forEachCell((cell)=>{
                if(cell.selected && !cell.locked) {
                    cell.value = null
                    cell.notes = []
                }
            })
            return newState

        //Set a cell to selected/not selected
        case "setCellSelection":
            newState.data[action.cell.x][action.cell.y].selected = action.input
            return newState
        
        //Set a cell to the opposite selected state
        case "toggleCellSelection":
            newState.data[action.cell.x][action.cell.y].selected = !state.data[action.cell.x][action.cell.y].selected
            return newState

        //Set all cells to not selected and the passed cell to selected
        case "resetCellSelection":
            newState.data.forEachCell((cell)=>{
                cell.selected = false
            })
            newState.data[action.cell.x][action.cell.y].selected = true
            return newState

        //Apply the top of the undo stack to board data, and save it to redo stack
        case "UNDO":        
            let undoMemory = newState.memory.undo.pop()
            if (undoMemory) {
                saveMemory(newState, "redo", state.data)
                applyMemory(newState, undoMemory)
            }
            
            return newState
        
        //Apply the top of the redo stack to board data, and save it to undo stack
        case "REDO":        
            let redoMemory = newState.memory.redo.pop()
            if (redoMemory) {
                saveMemory(newState, "undo", state.data)
                applyMemory(newState, redoMemory)
            }
            return newState

        //Push board data to the undo stack, and clear the redo stack
        case "SAVE_NEW":
            //TODO: update memory only when board data has actually changed
            if(true) {
                saveMemory(newState, "undo", state.data)
                newState.memory.redo.clear()
            }
            return newState

        default:
            throw new Error()
    }
}

function saveMemory(state, stack, cellData) {
    // TODO: update memory only when board data has actually changed
    // JSON.parse(JSON.stringify(obj)) is used to "clone" the object to save to memory
    const saveMemory = _.cloneDeep(cellData)
    state.memory[stack].push(saveMemory)
}

function applyMemory(state, memory) {
    state.data.forEachCell((cell,i,j) => {
        cell.value = memory[i][j].value
        cell.notes = memory[i][j].notes
    })
}

export default cellDataReducer
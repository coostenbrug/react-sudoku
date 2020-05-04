import _ from "lodash"

function cellDataReducer(state, action) {

    let newState = _.cloneDeep(state)

    switch (action.type) {
        case "toggleSelectedValue":

            let shouldEraseValue = state.queriedCellsAllHaveProperty(
                cell=>(cell.value !== action.input),
                cell=>(cell.selected && !cell.locked),
            )
            
              newState.forEachCell((cell,i,j)=>{
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

        case "toggleSelectedNote":
            let shouldEraseNote = state.queriedCellsAllHaveProperty(
                cell=>(!cell.notes || !cell.notes[action.input]),
                cell=>(cell.selected && !cell.locked && !cell.value)
              )
            
              newState.forEachCell((cell)=>{
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

        case "clearSelectedCells":
            newState.forEachCell((cell)=>{
                if(cell.selected && !cell.locked) {
                    cell.value = null
                    cell.notes = []
                }
            })
            return newState

        case "applyMemory":
            newState.forEachCell((cell,i,j) => {
                cell.value = action.input[i][j].value
                cell.notes = action.input[i][j].notes
            })
            return newState

        case "setCellSelection":
            newState[action.cell.x][action.cell.y].selected = action.input
            return newState
            
        case "toggleCellSelection":
            newState[action.cell.x][action.cell.y].selected = !state[action.cell.x][action.cell.y].selected
            return newState

        case "resetCellSelection":
            newState.forEachCell((cell)=>{
                cell.selected = false
            })
            newState[action.cell.x][action.cell.y].selected = true
            return newState

        default:
            throw new Error()
    }
}

export default cellDataReducer
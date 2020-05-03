class CellArray extends Array {
    constructor(data) { 
        super(data.width)
        data.forEach((row,i) => {
            this[i]= data[i]
        })
    }

    forEachCell(fnc) {
        this.forEach((row,i) => {
            row.forEach((cell,j) => {
                fnc(cell,i,j)
            })
        })
    }

    queriedCellsAllHaveProperty(query, property) {
        let allHaveProperty = true
        this.forEachCell((cell)=>{
            if(query(cell)) {
                if (property(cell)) {allHaveProperty = false}
            }
        })
        return allHaveProperty
    }
    
    setSelectedCellsValue(value) {
        let shouldEraseValue = this.queriedCellsAllHaveProperty(
            cell=>(cell.value !== value),
            cell=>(cell.selected && !cell.locked),
          )

        this.forEachCell((cell)=>{
            if(cell.selected && !cell.locked) {
                if (shouldEraseValue) {
                    cell.value = null
                } else {
                    cell.value = value
                    cell.notes = []
                }
            }
        })
    }

    toggleSelectedCellsNote(note) {
        let shouldEraseNote = this.queriedCellsAllHaveProperty(
            cell=>(!cell.notes || !cell.notes[note]),
            cell=>(cell.selected && !cell.locked && !cell.value)
          )
        this.forEachCell((cell)=>{
            if(cell.selected && !cell.locked && !cell.value) {
                if (!cell.notes) {cell.notes = new Array(9)}
                if (shouldEraseNote) {
                    cell.notes[note] = false
                } else {
                    cell.notes[note] = true
                }
            }
        })
    }
}

export default CellArray
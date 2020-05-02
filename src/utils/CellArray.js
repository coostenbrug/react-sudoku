class CellArray extends Array {
    constructor(data) { 
        super(data.width)
        data.forEach((row,i) => {
            this[i]= data[i]
        })
    }

    forEachCell(fnc, condition) {
        this.forEach(row => {
            row.forEach(cell => {
                fnc(cell)
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
}

export default CellArray
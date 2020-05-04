class CellArray extends Array {
    constructor(data) { 
        super(data.width)
        Object.keys(data).forEach((row,i) => {
            this[i]= data[i]
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

CellArray.prototype.forEachCell = function(fnc) {
    this.forEach((row,i) => {
        row.forEach((cell,j) => {
            fnc(cell,i,j)
        })
    })
}

export default CellArray
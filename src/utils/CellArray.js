class CellArray extends Array {
    constructor(data) { 
        super(data.width)
        data.forEach((row,i) => {
            this[i]= data[i]
        })
    }

    forEachCell(fnc) {
        this.forEach(row => {
            row.forEach(cell => {
                fnc(cell)
            })
        })
    }
}

export default CellArray
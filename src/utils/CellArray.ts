import { Cell } from "../types/types"

class CellArray extends Array {
    constructor(data: CellArray | Cell[][] | Record<string, any>[][]) { 
        super(data.length)
        Object.keys(data).forEach((row,i) => {
            this[i]= data[i]
        })
    }

    queriedCellsAllHaveProperty(query: Function, property: Function): boolean {
        let allHaveProperty = true
        this.forEachCell((cell: Cell)=>{
            if(query(cell)) {
                if (property(cell)) {allHaveProperty = false}
            }
        })
        return allHaveProperty
    }

    forEachCell(fnc: Function): void {
        this.forEach((row,i) => {
            row.forEach((cell: Cell, j: number) => {
                fnc(cell,i,j)
            })
        })
    }
}

export default CellArray
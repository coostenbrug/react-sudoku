import React from "react"
import CellGroup from "./CellGroup"
import Cell from "./Cell"

/*
const getPartition = (data, pWidth, pHeight, x, y) => {
    // data = [[w1,w2,w3,w4],[x1,x2,x3,x4],[y1,y2,y3,y4],[z1,z2,z3,z4]]
    // using x=1, y=1, pWidth=2, oHeight=2
    // output = [[x2,x3],[y2,y3]]
    partition = new Array()
    for (let i = 0; i < pHeight; i++) {
        partition[i] = 
    }
    data = data.slice(y,y+pHeight)
    data = data.map(row => )
}
*/

const mapCells = (data,gri,gci,i) => {
    let elementArray = new Array(data.groupWidth)
    for (let j = 0; j < data.groupWidth; j++) {
        elementArray[j] = (
            <Cell value={data.values[data.groupHeight*gri+i][data.groupWidth*gci+j]}/>
        )
    }
    return elementArray
}

const mapCellRows = (data,gri,gci) => {
    let elementArray = new Array(data.groupHeight)
    for (let i = 0; i < data.groupHeight; i++) {
        elementArray[i] = (
            <div>
                {mapCells(data,gri,gci,i)}
            </div>
        )
    }
    return elementArray
} 

const Sudoku = ({data}) => (
    <div>
        {[...Array(data.height/data.groupHeight)].map((e,gri)=>(
            <div key={`GroupRow ${gri}`}>
                {[...Array(data.width/data.groupHeight)].map((e,gci)=>(
                    <CellGroup key={`Group r:${gri},c:${gci}`}>
                    {mapCellRows(data,gri,gci)}
                    </CellGroup>
                ))}
            </div>
        ))}
    </div>
)

export default Sudoku
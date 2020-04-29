import React from "react"
import SudokuBoard from "./SudokuBoard"
import ControlPanel from "./ControlPanel"

const Sudoku = ({data}) => {
    
    const falseArray = Array(data.height).fill().map(() => Array(data.width).fill(false))

    const [cellData, setCellData] = React.useState(data.cellData)
    const [values, setValues] = React.useState(data.values)
    const [isSelecting, setIsSelecting] = React.useState(true)

    React.useEffect(() => {
        document.addEventListener("keydown", handleKeyDown);
        return () => document.removeEventListener("keydown", handleKeyDown);
    })
      

    const handleCellMouseDown = (e,x,y) => {
        if (e.buttons === 1) {
            e.preventDefault()
            if (e.ctrlKey) {
                setIsSelecting(!cellData[x][y].selected)
                let newCellData = [...cellData]
                cellData[x][y].selected = !cellData[x][y].selected
                setCellData(newCellData)
            } else {
                setIsSelecting(true)
                let newCellData = [...cellData]
                newCellData.forEach((row)=>{
                    row.forEach((cell)=>{
                        cell.selected = false
                    })
                })
                newCellData[x][y].selected = true
                setCellData(newCellData)
            }
        }
    }

    const handleCellMouseEnter = (e,x,y) => {
        if (e.buttons === 1) {
            let newCellData = [...cellData]
            newCellData[x][y].selected = isSelecting
            setCellData(newCellData)
        }
    }

    const setSelectedCellValues = value => {
        let newCellData = [...cellData]
        newCellData.forEach((row)=>{
            row.forEach((cell)=>{
                if(cell.selected && !cell.locked) {
                    cell.value = value
                }
            })
        })
        setValues(newCellData)
    }

    const handleKeyDown = e => {
        if(["1","2","3","4","5","6","7","8","9"].includes(e.key)) {
            setSelectedCellValues(e.key)
        } else if (e.key === "Delete" || e.key === "Backspace") {
            setSelectedCellValues("")
        }
    }

    const handleControlPanelClick = (e, code) => {
        if(["1","2","3","4","5","6","7","8","9"].includes(code)) {
            setSelectedCellValues(code)
        } else if (code === "Erase") {
            setSelectedCellValues("")
        }
    }

    const cellFunctions = {
        handleMouseDown: handleCellMouseDown,
        handleMouseEnter: handleCellMouseEnter
    }

    return(
    <div style={{display: "flex", flexDirection: "column", justifyContent: "space-between"}}>
        <SudokuBoard boardData={data.boardData} cellData={data.cellData} cellFunctions={cellFunctions}/>
        <ControlPanel handleOnClick={handleControlPanelClick}/>
    </div>
)}

export default Sudoku
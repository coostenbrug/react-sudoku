import React from "react"
import SudokuBoard from "./SudokuBoard"
import ControlPanel from "./ControlPanel"

const Sudoku = ({data}) => {
    
    const falseArray = Array(data.height).fill().map(() => Array(data.width).fill(false))

    const [cellData, setCellData] = React.useState(data.cellData)
    const [values, setValues] = React.useState(data.values)
    const [isSelecting, setIsSelecting] = React.useState(true)
    const [controlMode, setControlMode] = React.useState(0)

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

    const toggleSelectedCellNotes = note => {
        let newCellData = [...cellData]
        newCellData.forEach((row)=>{
            row.forEach((cell)=>{
                if(cell.selected && !cell.locked) {
                    if (!cell.notes) {cell.notes = []}
                    cell.notes.push(note)
                }
            })
        })
        setValues(newCellData)
    }

    const modifyCellContents = value => {
        switch (controlMode) {
            default:
            case 0:
                setSelectedCellValues(value)
                break;
            case 1:
                toggleSelectedCellNotes(value)
                break;
        }
    }

    const clearCellContents = () => {
        let newCellData = [...cellData]
        newCellData.forEach((row)=>{
            row.forEach((cell)=>{
                if(cell.selected && !cell.locked) {
                    cell.value = null
                    cell.notes = []
                }
            })
        })
        setValues(newCellData)
    }

    const handleKeyDown = e => {
        if(["1","2","3","4","5","6","7","8","9"].includes(e.key)) {
            modifyCellContents(e.key)
        } else if (e.key === "Delete" || e.key === "Backspace") {
            clearCellContents()
        }
    }

    const handleControlPanelClick = (e, code) => {
        if(["1","2","3","4","5","6","7","8","9"].includes(code)) {
            modifyCellContents(code)
        } else if (code === "erase") {
            clearCellContents()
        } else if (code === "ans") {
            setControlMode(0)
        } else if (code === "note") {
            setControlMode(1)
        }
    }

    const cellFunctions = {
        handleMouseDown: handleCellMouseDown,
        handleMouseEnter: handleCellMouseEnter
    }

    return(
    <div style={{display: "flex", flexDirection: "column", justifyContent: "space-between"}}>
        <SudokuBoard boardData={data.boardData} cellData={data.cellData} cellFunctions={cellFunctions}/>
        <ControlPanel controlMode={controlMode} handleOnClick={handleControlPanelClick}/>
    </div>
)}

export default Sudoku
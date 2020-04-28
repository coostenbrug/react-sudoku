import React from "react"
import SudokuBoard from "./SudokuBoard"
import ControlPanel from "./ControlPanel"

const Sudoku = ({data}) => {
    
    const falseArray = Array(data.height).fill().map(() => Array(data.width).fill(false))

    const [selected, setSelected] = React.useState(falseArray)
    const [values, setValues] = React.useState(data.values)
    const [selectMode, setSelectMode] = React.useState(true)

    React.useEffect(() => {
        document.addEventListener("keydown", handleKeyDown);
        return () => document.removeEventListener("keydown", handleKeyDown);
    })
      

    const handleCellMouseDown = (e,x,y) => {
        if (e.buttons === 1) {
            e.preventDefault()
            if (e.ctrlKey) {
                setSelectMode(!selected[x][y])
                let newSelected = [...selected]
                newSelected[x][y] = !selected[x][y]
                setSelected(newSelected)
            } else {
                setSelectMode(true)
                let newSelected = [...falseArray]
                newSelected[x][y] = true
                setSelected(newSelected)
            }
        }
    }

    const handleCellMouseEnter = (e,x,y) => {
        if (e.buttons === 1) {
            let newSelected = [...selected]
            newSelected[x][y] = selectMode
            setSelected(newSelected)
        }
    }

    const setSelectedCellValues = value => {
        let newValues = [...values]
        values.forEach((row,i)=>{
            row.forEach((cell,j)=>{
                if(selected[i][j] && !data.locked[i][j]) {
                    newValues[i][j] = value
                }
            })
        })
        setValues(newValues)
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

    const cellData = {
        handleMouseDown: handleCellMouseDown,
        handleMouseEnter: handleCellMouseEnter,
        selected,
        values,
        locked: data.locked
    }

    const boardData = {
        height: data.height,
        groupHeight: data.groupHeight,
        width: data.width,
        groupWidth: data.groupWidth
    }

    return(
    <div style={{display: "flex", flexDirection: "column", justifyContent: "space-between"}}>
        <SudokuBoard boardData={boardData} cellData={cellData}/>
        <ControlPanel handleOnClick={handleControlPanelClick}/>
    </div>
)}

export default Sudoku
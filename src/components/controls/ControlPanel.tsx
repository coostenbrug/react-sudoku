import styled from "styled-components"
import React from "react"
import ControlButton from "./ControlButton"
import ControlButtonWrapper from "./ControlButtonWrapper"
import { cellColors } from "../../resources"

const ControlPanelRow = styled.div({
    display: "flex"
})

const ControlPanelWrapper = styled.div({
    margin: "20px auto 0 auto",
    border: "solid 2px",
    borderRadius: 8,
    display: "flex",
    flexDirection: "column",

    [`${ControlButtonWrapper}`]: {
        marginRight: 4,
        ":first-of-type": {
            marginLeft: 4
        }
    },
    [`${ControlPanelRow}`]: {
        marginBottom: 4,
        ":first-of-type": {
            marginTop: 4
        }
    }
})

interface Props {
    functions: {
        modifyCellContents: Function;
        clearCellContents: Function;
        setControlMode: Function;
        undo: Function;
        redo: Function;
    },
    stateProps: {
        controlMode: number;
        undoDisabled: boolean;
        redoDisabled: boolean;
    }
}

const ControlPanel = (props: Props) => {
    const {
        modifyCellContents,
        clearCellContents,
        setControlMode,
        undo,
        redo
    } = props.functions
    
    const {
        controlMode,
        undoDisabled,
        redoDisabled
    } = props.stateProps

    return(
        <ControlPanelWrapper>
            <ControlPanelRow>
                <ControlButton color={cellColors[0]} controlMode={controlMode} onClick={function() {modifyCellContents(1)}}>1</ControlButton>
                <ControlButton color={cellColors[1]} controlMode={controlMode} onClick={function() {modifyCellContents(2)}}>2</ControlButton>
                <ControlButton color={cellColors[2]} controlMode={controlMode} onClick={function() {modifyCellContents(3)}}>3</ControlButton>
                <ControlButton color={cellColors[3]} controlMode={controlMode} onClick={function() {modifyCellContents(4)}}>4</ControlButton>
                <ControlButton color={cellColors[4]} controlMode={controlMode} onClick={function() {modifyCellContents(5)}}>5</ControlButton>
                <ControlButton color={cellColors[5]} controlMode={controlMode} onClick={function() {modifyCellContents(6)}}>6</ControlButton>
                <ControlButton color={cellColors[6]} controlMode={controlMode} onClick={function() {modifyCellContents(7)}}>7</ControlButton>
                <ControlButton color={cellColors[7]} controlMode={controlMode} onClick={function() {modifyCellContents(8)}}>8</ControlButton>
                <ControlButton color={cellColors[8]} controlMode={controlMode} onClick={function() {modifyCellContents(9)}}>9</ControlButton>
                <ControlButton controlMode={-1} onClick={function() {clearCellContents()}}>X</ControlButton>
            </ControlPanelRow>
            <ControlPanelRow>
                <ControlButton controlMode={-1} pressed={controlMode === 0} width={100} onClick={function() {setControlMode(0)}}>Ans</ControlButton>
                <ControlButton controlMode={-1} pressed={controlMode === 1} width={100} onClick={function() {setControlMode(1)}}>Note</ControlButton>
                <ControlButton controlMode={-1} pressed={controlMode === 2} width={100} onClick={function() {setControlMode(2)}}>Color</ControlButton>
                <ControlButton controlMode={-1} disabled={undoDisabled} width={100} onClick={function() {undo()}}>Undo</ControlButton>
                <ControlButton controlMode={-1} disabled={redoDisabled} width={100} onClick={function() {redo()}}>Redo</ControlButton>
            </ControlPanelRow>
        </ControlPanelWrapper>
    )
}

ControlPanel.defaultProps = {
    handleOnClick: () => {}
}

export default ControlPanel
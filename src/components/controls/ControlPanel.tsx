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
        checkBasicSudoku: Function;
    };
    stateProps: {
        controlMode: number;
        undoDisabled: boolean;
        redoDisabled: boolean;
    };
}


const ControlPanel = (props: Props): React.ReactElement => {

    const {
        modifyCellContents,
        clearCellContents,
        setControlMode,
        undo,
        redo,
        checkBasicSudoku
    } = props.functions
    
    const {
        controlMode,
        undoDisabled,
        redoDisabled
    } = props.stateProps

    return(
        <ControlPanelWrapper>
            <ControlPanelRow>
                <ControlButton keys={["1"]} color={cellColors[0]} controlMode={controlMode} onClick={function(): void {modifyCellContents(1)}}>1</ControlButton>
                <ControlButton keys={["2"]} color={cellColors[1]} controlMode={controlMode} onClick={function(): void {modifyCellContents(2)}}>2</ControlButton>
                <ControlButton keys={["3"]} color={cellColors[2]} controlMode={controlMode} onClick={function(): void {modifyCellContents(3)}}>3</ControlButton>
                <ControlButton keys={["4"]} color={cellColors[3]} controlMode={controlMode} onClick={function(): void {modifyCellContents(4)}}>4</ControlButton>
                <ControlButton keys={["5"]} color={cellColors[4]} controlMode={controlMode} onClick={function(): void {modifyCellContents(5)}}>5</ControlButton>
                <ControlButton keys={["6"]} color={cellColors[5]} controlMode={controlMode} onClick={function(): void {modifyCellContents(6)}}>6</ControlButton>
                <ControlButton keys={["7"]} color={cellColors[6]} controlMode={controlMode} onClick={function(): void {modifyCellContents(7)}}>7</ControlButton>
                <ControlButton keys={["8"]} color={cellColors[7]} controlMode={controlMode} onClick={function(): void {modifyCellContents(8)}}>8</ControlButton>
                <ControlButton keys={["9"]} color={cellColors[8]} controlMode={controlMode} onClick={function(): void {modifyCellContents(9)}}>9</ControlButton>
                <ControlButton keys={["Delete","Backspace"]} controlMode={-1} onClick={function(): void {clearCellContents()}}>X</ControlButton>
            </ControlPanelRow>
            <ControlPanelRow>
                <ControlButton pressed={controlMode === 0} width={100} onClick={function(): void {setControlMode(0)}}>Ans</ControlButton>
                <ControlButton pressed={controlMode === 1} width={100} onClick={function(): void {setControlMode(1)}}>Note</ControlButton>
                <ControlButton pressed={controlMode === 2} width={100} onClick={function(): void {setControlMode(2)}}>Color</ControlButton>
            </ControlPanelRow>
            <ControlPanelRow>
                <ControlButton keys={[","]} disabled={undoDisabled} width={100} onClick={function(): void {undo()}}>Undo</ControlButton>
                <ControlButton keys={["."]} disabled={redoDisabled} width={100} onClick={function(): void {redo()}}>Redo</ControlButton>
                <ControlButton width={100} onClick={function(): void {checkBasicSudoku()}}>Check</ControlButton>
            </ControlPanelRow>
        </ControlPanelWrapper>
    )
}

ControlPanel.defaultProps = {
    handleOnClick: (): void => {return}
}

export default ControlPanel
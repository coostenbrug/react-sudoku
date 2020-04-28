import styled from "styled-components"
import React from "react"
import ControlButton from "./ControlButton"

const ControlPanelWrapper = styled.div({

})

const ControlPanel = ({handleOnClick}) => (
    <ControlPanelWrapper>
        <ControlButton onClick={(e)=>handleOnClick(e,1)}>1</ControlButton>
        <ControlButton onClick={(e)=>handleOnClick(e,2)}>2</ControlButton>
        <ControlButton onClick={(e)=>handleOnClick(e,3)}>3</ControlButton>
        <ControlButton onClick={(e)=>handleOnClick(e,4)}>4</ControlButton>
        <ControlButton onClick={(e)=>handleOnClick(e,5)}>5</ControlButton>
        <ControlButton onClick={(e)=>handleOnClick(e,6)}>6</ControlButton>
        <ControlButton onClick={(e)=>handleOnClick(e,7)}>7</ControlButton>
        <ControlButton onClick={(e)=>handleOnClick(e,8)}>8</ControlButton>
        <ControlButton onClick={(e)=>handleOnClick(e,9)}>9</ControlButton>
        <ControlButton onClick={(e)=>handleOnClick(e,"Erase")}>Erase</ControlButton>
    </ControlPanelWrapper>
)

ControlPanel.defaultProps = {
    handleOnClick: () => {}
}

export default ControlPanel
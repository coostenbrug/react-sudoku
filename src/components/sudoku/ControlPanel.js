import styled from "styled-components"
import React from "react"
import ControlButton from "./ControlButton"

const ControlPanelRow = styled.div({
    display: "flex"
})

const ControlPanelWrapper = styled.div({
    margin: "20px auto 0 auto",
    border: "solid 2px",
    borderRadius: 8,
    display: "flex",
    flexDirection: "column",

    [`${ControlButton}`]: {
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

const ControlPanel = ({handleOnClick}) => (
    <ControlPanelWrapper>
        <ControlPanelRow>
            <ControlButton onClick={(e)=>handleOnClick(e,"1")}>1</ControlButton>
            <ControlButton onClick={(e)=>handleOnClick(e,"2")}>2</ControlButton>
            <ControlButton onClick={(e)=>handleOnClick(e,"3")}>3</ControlButton>
            <ControlButton onClick={(e)=>handleOnClick(e,"4")}>4</ControlButton>
            <ControlButton onClick={(e)=>handleOnClick(e,"5")}>5</ControlButton>
            <ControlButton onClick={(e)=>handleOnClick(e,"6")}>6</ControlButton>
            <ControlButton onClick={(e)=>handleOnClick(e,"7")}>7</ControlButton>
            <ControlButton onClick={(e)=>handleOnClick(e,"8")}>8</ControlButton>
            <ControlButton onClick={(e)=>handleOnClick(e,"9")}>9</ControlButton>
            <ControlButton onClick={(e)=>handleOnClick(e,"Erase")}>X</ControlButton>
        </ControlPanelRow>
    </ControlPanelWrapper>
)

ControlPanel.defaultProps = {
    handleOnClick: () => {}
}

export default ControlPanel
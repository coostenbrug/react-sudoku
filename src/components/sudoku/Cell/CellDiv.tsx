import styled from "styled-components"
import cellColors from "../../../resources/cellColors"

interface Props {
    size: number;
    selected: boolean;
    bgColor: number;
}

const CellDiv = styled.div({
        display: "flex",
        position: "relative",
        border: "solid 1px black"
    },
    (props: Props)=>({
        width: props.size,
        height: props.size,
        backgroundColor: props.selected ? "cyan" : cellColors[props.bgColor]
    })
)

CellDiv.defaultProps = {
    size: 56,
    selected: false,
    bgColor: 0
}

export default CellDiv
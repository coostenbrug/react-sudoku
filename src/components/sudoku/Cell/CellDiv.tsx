import styled from "styled-components"
import cellColors from "../../../resources/cellColors"
import { mix } from "chroma-js"

interface Props {
    size: number;
    selected: boolean;
    bgColor: number;
}

const getBackgroundColor = (colorIndex: number, selected: boolean) => {
    if (selected) {
        return mix("#a0b3d9",cellColors[colorIndex-1],0.3).toString()
    } else {
        return cellColors[colorIndex-1]
    }
}

const CellDiv = styled.div`
    display: flex;
    position: relative;
    border: solid 1px black;
    width: ${(props: Props) => props.size}px;
    height: ${(props: Props) => props.size}px;
    background-color: ${(props: Props) => getBackgroundColor(props.bgColor, props.selected)};
`


CellDiv.defaultProps = {
    size: 56,
    selected: false,
    bgColor: 1
}

export default CellDiv
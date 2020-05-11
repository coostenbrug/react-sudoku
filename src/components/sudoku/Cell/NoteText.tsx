import styled from "styled-components"

interface Props {
    position: number;
}
const NoteText = styled.p`
    margin: 0;
    position: absolute;
    top: ${(props: Props) => [4,22,39][Math.floor(props.position/3)]+"px"};
    left: ${(props: Props) => [4,23,42][props.position % 3]+"px"};
    width: 10;
    height: 14;
    font-size: 14px;
    line-height: 1;
    text-align: center;
    user-select: none;
`

export default NoteText
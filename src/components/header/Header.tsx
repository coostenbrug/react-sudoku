import React from "react"
import HeaderDiv from "./HeaderDiv"
import Timer from "./Timer"

interface Props {
    isPaused: boolean;
    setIsPaused(arg0: boolean): void;
}

const Header = ({isPaused, setIsPaused}: Props): React.ReactElement => {
    return(
        <HeaderDiv>
            <Timer isPaused={isPaused} setIsPaused={setIsPaused}/>
        </HeaderDiv>
    )
}

export default Header
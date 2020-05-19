import React from "react"
import HeaderDiv from "./HeaderDiv"
import Timer from "./Timer"

const Header = (): React.ReactElement => {
    return(
        <HeaderDiv>
            <Timer/>
        </HeaderDiv>
    )
}

export default Header
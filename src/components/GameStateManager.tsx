import React from "react"

interface Props {
    children: Function;
}

const GameStateManager = ({ children }: Props): React.ReactElement => {

    const [isPaused, setIsPaused] = React.useState(false)

    return(children({
        isPaused,
        setIsPaused
    }))
}

export default GameStateManager
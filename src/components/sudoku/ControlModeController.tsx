import React from "react"

interface KeyMap {
    [propName: string]: any;
}

const controlModeKeyMap: KeyMap = {z: 0, x: 1, c: 2}

interface Props {
    children: Function
}

const ControlModeController = ({children}: Props) => {

    const [defaultMode, setDefaultMode] = React.useState(0)
    const [controlMode, setControlMode] = React.useState(defaultMode)

    React.useEffect(() => {
        document.addEventListener("keydown", handleKeyDown);
        document.addEventListener("keyup", handleKeyUp);
        return () => {
            document.removeEventListener("keydown", handleKeyDown);
            document.removeEventListener("keyup", handleKeyUp);
        }
    })

    const handleKeyDown = (e: KeyboardEvent) => {
        if (Object.keys(controlModeKeyMap).includes(e.key)) {
            setControlMode(controlModeKeyMap[e.key])
        }
    }

    const handleKeyUp = (e: KeyboardEvent) => {
        if (Object.keys(controlModeKeyMap).includes(e.key)) {
            setControlMode(defaultMode)
        }
    }

    const setControlModeAndDefaultMode = (input: number) => {
        setControlMode(input)
        setDefaultMode(input)
    }

    return(children({
        controlMode,
        setControlMode: setControlModeAndDefaultMode
    }))
}

export default ControlModeController
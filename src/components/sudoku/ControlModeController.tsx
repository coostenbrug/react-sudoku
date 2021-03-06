import React from "react"

interface KeyMap {
    [propName: string]: number;
}

const controlModeKeyMap: KeyMap = {z: 0, x: 1, c: 2}

interface Props {
    children: Function;
}

const ControlModeController = ({children}: Props): React.ReactElement => {

    const [defaultMode, setDefaultMode] = React.useState<number>(0)
    const [controlMode, setControlMode] = React.useState<number>(defaultMode)
    const [heldModes, setHeldModes] = React.useState<boolean[]>([])

    const updateHeldModes = (mode: number, value: boolean): void => {
        const newHeldModes: boolean[] = [...heldModes]
        newHeldModes[mode] = value
        setHeldModes(newHeldModes)
    }

    const handleKeyDown = (e: KeyboardEvent): void => {
        if (Object.keys(controlModeKeyMap).includes(e.key)) {
            updateHeldModes(controlModeKeyMap[e.key], true)
            setControlMode(controlModeKeyMap[e.key])
        }
    }

    const handleKeyUp = (e: KeyboardEvent): void => {
        if (Object.keys(controlModeKeyMap).includes(e.key)) {
            updateHeldModes(controlModeKeyMap[e.key], false)
        }
    }

    React.useEffect(() => {
        document.addEventListener("keydown", handleKeyDown);
        document.addEventListener("keyup", handleKeyUp);
        return (): void => {
            document.removeEventListener("keydown", handleKeyDown);
            document.removeEventListener("keyup", handleKeyUp);
        }
    })

    React.useEffect(() => {
        let lastHeldMode = null
        heldModes.forEach((held, i) => {
            if (held) {
                lastHeldMode = i
            }
        })

        if (lastHeldMode === null) {
            setControlMode(defaultMode)
        } else {
            setControlMode(lastHeldMode)
        }
    },[heldModes])

    const setControlModeAndDefaultMode = (input: number): void=> {
        setControlMode(input)
        setDefaultMode(input)
    }

    return(children({
        controlMode,
        setControlMode: setControlModeAndDefaultMode
    }))
}

export default ControlModeController
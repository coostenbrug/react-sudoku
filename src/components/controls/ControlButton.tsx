import React, { Ref } from "react"
import ControlButtonWrapper from "./ControlButtonWrapper"
import ControlButtonText from "./ControlButtonText"

interface Props {
    children: React.ReactNode;
    height?: number;
    width?: number;
    pressed?: boolean;
    controlMode?: number;
    disabled?: boolean;
    onClick?: () => void;
    color?: string;
    keys?: string[];
}

const ControlButton = (props: Props) => {
    
    const buttonRef: Ref<HTMLButtonElement> = React.useRef(null)

    React.useEffect(() => {
        document.addEventListener("keydown", handleKeyDown);
        return () => document.removeEventListener("keydown", handleKeyDown);
    })

    const handleKeyDown = (e: KeyboardEvent) => {
        if (props.keys && props.keys.includes(e.key)) {
            if (buttonRef.current !== null) {buttonRef.current!.click()}
        }
    } 

    return (
    <ControlButtonWrapper
      height={props.height}
      width={props.width}
      pressed={props.pressed}
      disabled={props.disabled}
      onClick={props.onClick}
      ref={buttonRef}
    >
        <ControlButtonText
          controlMode={props.controlMode}
          color={props.color}
          >{props.children}</ControlButtonText>
    </ControlButtonWrapper>
)}

ControlButton.defaultProps = {
    height: 48,
    width: 48,
    pressed: false,
    controlMode: 0,
    disabled: false,
    onClick: () => {}
}

export default ControlButton
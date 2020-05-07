import React from "react"
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
}

const ControlButton = (props: Props) => (
    <ControlButtonWrapper
      height={props.height}
      width={props.width}
      pressed={props.pressed}
      disabled={props.disabled}
      onClick={props.onClick}
    >
        <ControlButtonText
          controlMode={props.controlMode}
          color={props.color}
          >{props.children}</ControlButtonText>
    </ControlButtonWrapper>
)

ControlButton.defaultProps = {
    height: 48,
    width: 48,
    pressed: false,
    controlMode: 0,
    disabled: false,
    onClick: () => {}
}

export default ControlButton
import React from "react";
import { StyledButton } from "./style";
import { theme } from "../../../styles/themes";

export default function Button(props) {
  const color = props.color ? props.color : theme.colors.primary;
  const size = props.size ? props.size : "small";
  return (
    <StyledButton color={color} size={size} {...props}>
      {props.children}
    </StyledButton>
  );
}

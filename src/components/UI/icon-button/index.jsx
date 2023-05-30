import React from "react";
import * as S from "./style";
import { IconContext } from "react-icons";

export default function IconButton({
  size = "32",
  icon,
  color = "black",
  onClick,
}) {
  const Icon = icon;
  return (
    <S.IconButtonStyle size="32" onClick={onClick}>
      <IconContext.Provider value={{ color, size }}>
        <Icon />
      </IconContext.Provider>
    </S.IconButtonStyle>
  );
}

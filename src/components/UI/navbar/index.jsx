import React from "react";
import * as S from "./style";
import { theme } from "../../../styles/themes";
import IconButton from "../icon-button";
import { FaBars } from "react-icons/fa";

export default function Navbar({
  title,
  items,
  color = theme.colors.primary,
  onMenuClick,
  hasMenuButton,
}) {
  return (
    <S.StyledNavbar color={color}>
      <S.NavLeft>
        {hasMenuButton && (
          <S.Menu>
            <IconButton
              icon={FaBars}
              size="32"
              color="white"
              onClick={onMenuClick}
            />
          </S.Menu>
        )}
        <S.NavTitle>{title}</S.NavTitle>
      </S.NavLeft>

      <S.NavItems>
        {items.map((item) => (
          <S.NavItem key={item.name + item.url}>
            <S.NavLink href={item.url}>{item.name}</S.NavLink>
          </S.NavItem>
        ))}
      </S.NavItems>
    </S.StyledNavbar>
  );
}

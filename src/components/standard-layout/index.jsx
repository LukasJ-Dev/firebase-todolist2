import React from "react";
import Navbar from "../UI/navbar";
import * as S from "./style";
import { useDispatch } from "react-redux";
import { appAction } from "../../features/app/appSlice";

export default function StandardLayout({ children, page }) {
  const dispatch = useDispatch();
  return (
    <S.LayoutStyle>
      <Navbar
        title="Firebase Todolist App"
        items={[]}
        onMenuClick={() => dispatch(appAction.toggleMenu())}
        hasMenuButton={page === "dashboard"}
      />
      {children}
    </S.LayoutStyle>
  );
}

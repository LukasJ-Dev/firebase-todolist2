import React from "react";
import styled from "styled-components";
import StandardLayout from "../components/standard-layout";
import { Container } from "../components/UI/styles";
import Todolist from "../components/todolist";
import TodolistsHandler from "../components/TodolistsHandler";
import { useSelector } from "react-redux";
import { selectShowMenu } from "../features/app/appSlice";

const DashboardLayout = styled.div`
  display: flex;
  height: 100%;
  width: 100%;
`;

const SidebarStyle = styled.div`
  @media screen and (max-width: 768px) {
    ${(props) => props.showMenu && "display: none;"}
    position: fixed;
    z-index: 10;
    height: 100%;
    padding-right: 100%;
    background-color: rgba(0, 0, 0, 0.5);
  }
`;

export default function Dashboard() {
  const showMenu = useSelector(selectShowMenu);
  return (
    <StandardLayout page="dashboard">
      <DashboardLayout>
        <SidebarStyle showMenu={showMenu}>
          <TodolistsHandler />
        </SidebarStyle>
        <Container>
          <Todolist />
        </Container>
      </DashboardLayout>
    </StandardLayout>
  );
}

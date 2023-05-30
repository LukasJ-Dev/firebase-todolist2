import React, { useEffect } from "react";
import SidebarList from "./UI/sidebar-list";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchTodolists,
  postTodolist,
  selectAllTodolists,
  selectSelectedItem,
  todolistsAction,
} from "../features/todolists/todolistsSlice";

function TodolistsHandler() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchTodolists());
  }, []);

  const selectedItem = useSelector(selectSelectedItem);

  const todolists = useSelector(selectAllTodolists);

  const handleSelectItem = (id) => {
    dispatch(todolistsAction.setSelectItem(id));
  };

  const handleNewTodolist = (title) => {
    dispatch(postTodolist({ title }));
  };

  return (
    <SidebarList
      title="Todolists"
      itemName="Todolist"
      selectedItem={selectedItem}
      items={todolists}
      callback={(id) => handleSelectItem(id)}
      callbackOnNewItem={handleNewTodolist}
    />
  );
}

export default TodolistsHandler;

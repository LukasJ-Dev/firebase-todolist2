import React, { useEffect, useState } from "react";
import TaskCard from "../task-card";
import NewTaskCard from "../task-card/newTask";
import * as S from "./style";
import { useDispatch, useSelector } from "react-redux";
import {
  selectTodolistName,
  selectSelectedItem,
  updateTodolist,
  selectAmountOfTodolists,
} from "../../features/todolists/todolistsSlice";
import { deleteTodolist } from "../../features/todolists/todolistsSlice";
import {
  deleteMarked,
  deleteTask,
  editTaskById,
  fetchTasksByTodolist,
  markAll,
  postTask,
  selectTasks,
  updateTaskCheck,
} from "../../features/tasks/tasksSlice";
import EditTaskModal from "../EditTaskModal";
import { createPortal } from "react-dom";
import IconButton from "../UI/icon-button";
import {
  FaCheckDouble,
  FaMinus,
  FaPen,
  FaTrash,
  FaTrashAlt,
} from "react-icons/fa";

export default function Todolist() {
  const [editTask, setEditTask] = useState(null);

  const dispatch = useDispatch();

  const todolistName = useSelector(selectTodolistName);

  const todolistAmount = useSelector(selectAmountOfTodolists);

  const selectedItem = useSelector(selectSelectedItem);

  const tasks = useSelector(selectTasks);

  useEffect(() => {
    if (selectedItem) dispatch(fetchTasksByTodolist(selectedItem));
  }, [selectedItem]);

  const newTaskInput = async (name) => {
    dispatch(postTask({ name: name, todolist: selectedItem }));
  };

  const markAllTasks = async () => {
    dispatch(markAll(selectedItem));
  };

  const deleteMarkedTasks = async () => {
    const confirmDelete = confirm(
      "Are you sure you want to delete all the marked tasks?"
    );
    if (confirmDelete) dispatch(deleteMarked(selectedItem));
  };

  const handleDeleteTodolist = async () => {
    if (todolistAmount === 1)
      return alert("You cant have less than one todolist");
    const deleteConfirm = confirm(
      "Are you sure you want to delete this todolist and all of its tasks? (This todolist will be GONE FOREVER)"
    );
    if (deleteConfirm) dispatch(deleteTodolist(selectedItem));
  };

  const handleChangeName = async () => {
    const newName = prompt("New Name");
    dispatch(updateTodolist({ id: selectedItem, title: newName }));
  };

  const handleCheck = async (checked, id) => {
    dispatch(updateTaskCheck({ id, checked }));
  };

  const handleDeleteTask = async (taskId) => {
    dispatch(deleteTask(taskId));
  };

  const saveEditTask = async (task) => {
    dispatch(editTaskById({ id: task.id, editedTask: task }));

    setEditTask(null);
  };

  const handleEditTask = (taskId) => {
    setEditTask(tasks.find((task) => task.id === taskId));
  };

  return (
    <>
      <S.styledTodolist>
        <S.TodolistHead>
          <S.styledTitle>{todolistName}</S.styledTitle>
          <S.ButtonContainer>
            <IconButton
              icon={FaCheckDouble}
              size="32"
              color="black"
              onClick={markAllTasks}
            />

            <IconButton
              icon={FaMinus}
              size="32"
              color="black"
              onClick={deleteMarkedTasks}
            />
            <IconButton
              icon={FaPen}
              size="32"
              color="black"
              onClick={handleChangeName}
            />
            <IconButton
              icon={FaTrash}
              size="32"
              color="black"
              onClick={handleDeleteTodolist}
            />
            {/*             <Button color={theme.colors.warning} onClick={handleChangeName}>
              Change Name
            </Button>
            <Button color={theme.colors.error} onClick={handleDeleteTodolist}>
              Delete Todolist
            </Button> */}
          </S.ButtonContainer>
        </S.TodolistHead>
        {tasks.map((task) => (
          <TaskCard
            key={task.id}
            task={task}
            onChecked={handleCheck}
            onEdit={handleEditTask}
            onDelete={handleDeleteTask}
          />
        ))}
        <NewTaskCard callback={newTaskInput} />
      </S.styledTodolist>
      {createPortal(
        <EditTaskModal
          task={editTask}
          onCancel={() => setEditTask(null)}
          onSave={(task) => saveEditTask(task)}
        />,
        document.getElementById("edit-modal-element")
      )}
    </>
  );
}

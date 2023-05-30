import React, { useEffect, useRef, useState } from "react";
import * as S from "./style";
import Input from "../UI/input";
import Button from "../UI/button";
import { theme } from "../../styles/themes";

export default function EditTaskModal({ task, onSave, onCancel }) {
  const isOpen = task !== null;
  const dialogRef = useRef(null);

  const [titleInput, setTitleInput] = useState("");
  const [descriptionInput, setDescriptionInput] = useState("");

  useEffect(() => {
    setTitleInput(task?.name || "");
    setDescriptionInput(task?.description || "");
    if (isOpen && !dialogRef.current.open) dialogRef.current.showModal();
    else if (!isOpen && dialogRef.current.open) dialogRef.current.close();
  }, [isOpen]);

  const taskName = task?.name || "";

  const handleSave = () => {
    const editedTask = { ...task };
    editedTask.name = titleInput;
    editedTask.description = descriptionInput;
    onSave(editedTask);
  };

  const handleCancel = () => {
    onCancel();
  };
  return (
    <S.editDialog ref={dialogRef}>
      <S.dialogContainer>
        <S.Text>Edit Task</S.Text>
        <Input
          label="Title"
          value={titleInput}
          onChange={(e) => setTitleInput(e.target.value)}
        />
        <Input
          label="Description"
          value={descriptionInput}
          onChange={(e) => setDescriptionInput(e.target.value)}
        />
        <S.ModalButtonContainer>
          <Button onClick={handleSave}>Confirm</Button>
          <Button color={theme.colors.dark} onClick={handleCancel}>
            Cancel
          </Button>
        </S.ModalButtonContainer>
      </S.dialogContainer>
    </S.editDialog>
  );
}

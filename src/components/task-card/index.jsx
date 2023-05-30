import React, { useState } from "react";
import * as S from "./style";
import Checkbox from "../UI/checkbox";
import { FaEdit, FaPen, FaTrash } from "react-icons/fa";
import IconButton from "../UI/icon-button";

export default function TaskCard({ task, onChecked, onEdit, onDelete }) {
  return (
    <S.styledTask>
      <S.Header>
        <Checkbox
          onChecked={(checked) => onChecked(checked, task.id)}
          checked={task.checked}
        />
        <S.TaskTitle>{task.name}</S.TaskTitle>
        <S.Buttons>
          <IconButton
            icon={FaPen}
            size="24"
            color="black"
            onClick={() => onEdit(task.id)}
          />
          <IconButton
            icon={FaTrash}
            size="24"
            color="black"
            onClick={() => onDelete(task.id)}
          />
        </S.Buttons>
      </S.Header>
      <S.Footer>
        <S.TaskDescription description={task.description}>
          {task.description || "No description"}
        </S.TaskDescription>
      </S.Footer>
    </S.styledTask>
  );
}

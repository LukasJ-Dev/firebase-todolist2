import React, { useState } from "react";
import * as S from "./style";

export default function NewTaskCard({ callback }) {
  const onEnter = (event) => {
    if (event.key == "Enter") {
      callback(event.target.value);
    }
  };

  return (
    <S.styledTask>
      <S.NewTask placeholder="New Task" onKeyDown={onEnter} />
    </S.styledTask>
  );
}

import React from "react";
import * as S from "./style";
import { useState } from "react";

export default function Checkbox({ onChecked, checked }) {
  const handleCheckboxChange = (event) => {
    onChecked(event.target.checked);
  };

  return (
    <S.CheckboxDiv>
      <S.CheckboxLabel checked={checked}>
        <S.CheckboxStyle checked={checked} onChange={handleCheckboxChange} />
      </S.CheckboxLabel>
    </S.CheckboxDiv>
  );
}

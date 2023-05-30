import React from "react";
import * as S from "./style";

export default function SidebarList({
  title,
  itemName,
  items,
  callback,
  selectedItem,
  callbackOnNewItem,
}) {
  const onEnter = (event) => {
    if (event.key === "Enter") {
      callbackOnNewItem(event.target.value);
    }
  };

  return (
    <S.StyledSidebar>
      <S.SidebarTitle>{title}</S.SidebarTitle>
      <S.ItemList>
        {items.map((item) => (
          <S.StyledItem
            key={item.id}
            onClick={() => callback(item.id)}
            isSelected={selectedItem == item.id}
          >
            {item.title}
          </S.StyledItem>
        ))}
        <S.StyledItem>
          <S.InputItem placeholder={`New ${itemName}...`} onKeyDown={onEnter} />
        </S.StyledItem>
      </S.ItemList>
    </S.StyledSidebar>
  );
}

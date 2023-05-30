import styled from "styled-components";
import { css } from "styled-components";
import { theme } from "../../../styles/themes";

const buttonSize = {
  small: css`
    font-size: 1em;
    border-radius: ${theme.borderRadius.small};
  `,
};

export const StyledButton = styled.button`
  background-color: ${(props) => props.color};
  color: white;
  padding: 10px 20px;
  border: none;
  box-shadow: ${theme.boxShadow.medium};
  ${(props) => buttonSize[props.size]}
  &:hover {
    opacity: 0.75;
  }
  &:active {
    opacity: 0.65;
    box-shadow: ${theme.boxShadow.small};
  }
  &:disabled {
    opacity: 0.9;
  }
`;

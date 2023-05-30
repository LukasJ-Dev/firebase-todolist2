import styled from "styled-components";
import { colors } from "../../../styles/colors";
import { theme } from "../../../styles/themes";

export const InputLayout = styled.div`
  color: ${(props) => (props.isError ? theme.colors.error : "black")};
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
  display: flex;
  flex-direction: column;
  gap: 5px;
`;

export const InputStyle = styled.input`
  width: 100%;
  height: 30px;
  border: ${(props) =>
    props.isError ? `2px solid ${theme.colors.error}` : "none"};
  background-color: white;
  border-radius: ${theme.borderRadius.small};
  &:focus {
    box-shadow: ${theme.boxShadow.small};
    border: none;
    outline: none;
  }
`;

export const LabelStyle = styled.label`
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
  font-size: 1.12em;
`;

export const ErrorMessage = styled.p`
  color: ${theme.colors.error};
  font-weight: 500;
`;

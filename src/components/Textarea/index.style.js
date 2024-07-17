import { css } from "@emotion/react";
import styled from "@emotion/styled";

export const Label = styled.p`
  font-family: "Poppins", sans-serif;
  font-size: 14px;
  font-weight: 400;
  color: var(--secondary);
  margin: 0;
`;

export const InputWrapper = styled.div`
  position: relative;
  width: 100%;
`;

export const TextareaStyled = styled.textarea`
  width: ${(props) => (props.fullWidth ? "100%" : "auto")};
  height: 40px;
  border-radius: 10px;
  background-color: transparent;
  border: 1px solid #ddd;
  margin: 8px 0;
  height: 120px;
  padding: 12px;
  resize: none;
  color: var(--default);
  font-family: "Poppins", sans-serif;
  font-size: 12px;
  font-weight: 400;
  caret-color: var(--primary-500);
  :focus {
    outline: none !important;
  }
  &:not(:focus) {
    padding: 12px;
    outline: none;
  }
  ${(props) =>
    props.commentDesign &&
    css`
      width: 100%;
      height: 120px;
      padding: 12px;
      box-sizing: border-box;
      border: 1px solid var(--secondary-inverse);
      border-radius: 10px;
      background: var(--neutral);
      resize: none;
      font-family: "Poppins", sans-serif;
      font-size: 14px;
      font-weight: 400;
      color: var(--default);
      caret-color: var(--secondary-500);
      :focus {
        outline: none !important;
      }
      &:not(:focus) {
        padding: 12px;
        outline: none;
      }
    `}
`;

export const IconWrapper = styled.div`
  position: absolute;
  right: 15px;
  top: 55%;
  transform: translateY(-48%);
  font-size: 20px;
  cursor: pointer;
  color: var(--tertiary-inverse);
`;

export const ErrorMessage = styled.p`
  color: red;
  font-size: 10px;
  font-weight: 400;
  margin: 0 16px;
`;

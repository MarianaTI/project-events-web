import styled from "@emotion/styled";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

export const StyledFileInput = styled.input`
  width: 100%;
  padding: 6px;
  margin: 8px 0;
  border: 1px dashed #bbb;
  border-radius: 5px;
  font-family: "Poppins", sans-serif; 
  font-size: 12px;
  font-weight: 500;
  color: var(--default);
  &::file-selector-button {
    cursor: pointer;
    border: none;
    padding: 4px 16px;
    font-family: "Poppins", sans-serif;
    font-size: 12px;
    font-weight: 500;
    color: var(--default);
    border-radius: 10px;
    background: var(--primary-100);
    transition: background 0.7s ease;
    :hover {
      background: var(--primary-200);
    }
  }
`;

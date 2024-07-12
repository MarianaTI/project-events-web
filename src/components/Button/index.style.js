import styled from "@emotion/styled";

export const ButtonStyled = styled.button`
  width: ${(props) => (props.fullWidth ? "100%" : "auto")};
  margin: 16px 0;
  padding: 0 40px;
  cursor: pointer;
  border: none;
  height: 40px;
  border-radius: 10px;
  background-color: var(--primary-500);
  color: var(--primary-50);
  font-family: "Poppins", sans-serif;
  font-weight: 600;
  font-size: 14px;
  transition: background-color 0.5s ease;
  :hover {
    background-color: var(--primary-400);
  }
`;

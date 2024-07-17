import styled from "@emotion/styled";

export const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: calc(100vh - 57px);
  background-color: var(--tertiary-100);
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  width: 45%;
  padding: 32px 40px;
  height: 90%;
  background-color: var(--neutral);
  border-radius: 10px;
  overflow-y: auto;
`;

export const Logo = styled.div`
  display: flex;
  align-items: center;
  justify-content: start;
  gap: 8px;
  img {
    width: 30px;
  }
  h1 {
    margin: 0;
    font-size: 24px;
    font-family: "Poppins", sans-serif;
    font-weight: 400;
  }
`;

export const H5Styled = styled.h5`
  font-size: 14px;
  font-family: "Poppins", sans-serif;
  font-weight: 400;
  color: var(--tertiary-);
  margin: 4px 0;
`;

export const Flex = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  column-gap: 56px;
  width: 100%;
`;

export const Label = styled.span`
  font-family: "Poppins", sans-serif;
  font-size: 14px;
  font-weight: 400;
  color: var(--default);
  margin: 8px 0;
`;

export const FormStyled = styled.form`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const ButtonContainer = styled.div`
  display: flex;
  justify-content: end;
`;

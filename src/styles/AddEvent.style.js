import styled from "@emotion/styled";

export const Container = styled.div`
  margin: 40px 32px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  width: 40%;
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

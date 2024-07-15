import styled from "@emotion/styled";

export const Container = styled.div`
  margin: 40px 32px;
`;

export const Content = styled.div`
  width: 50%;
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

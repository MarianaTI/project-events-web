import styled from "@emotion/styled";

export const Container = styled.div`
  margin: 40px 32px;
  display: grid;
  grid-template-columns: 1fr 1fr;
`;

export const ImageStyled = styled.section`
  display: flex;
  flex-direction: column;
  gap: 16px;
  img {
    width: 100%;
    height: 75%;
    object-fit: cover;
  }
  h1 {
    margin: 0;
    font-size: 64px;
    font-family: "Poppins", sans-serif;
    font-weight: 700;
    color: var(--default);
  }
`;

export const Information = styled.section`
  padding: 40px 64px;
  display: flex;
  flex-direction: column;
  gap: 12px;
  p {
    font-size: 16px;
    font-weight: 400;
    color: var(--default);
  }
  span {
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 16px;
    font-weight: 500;
    color: var(--default);
  }
  h5 {
    font-size: 28px;
    font-family: "Poppins", sans-serif;
    font-weight: 600;
    color: var(--default);
  }
`;

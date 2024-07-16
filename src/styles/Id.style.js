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
  .location {
    display: flex;
    align-items: start;
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

export const ButtonsContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 32px 0;
`;

export const ButtonPeople = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 8px;
  background-color: var(--secondary-500);
  color: var(--neutral);
  border-radius: 25px;
  padding: 0.5rem 1rem;
  font-weight: 500;
  font-size: 12px;
  border: none;
  transition: background-color 0.3s ease;
  outline: none;
  :hover {
    background-color: var(--primary-400);
  }
  :focus-visible {
    ring: 2px solid rgba(255, 255, 255, 0.75);
  }
`;

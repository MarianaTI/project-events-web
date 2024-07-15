import styled from "@emotion/styled";

export const Container = styled.div`
  width: 320px;
  display: flex;
  flex-direction: column;
  gap: 14px;
  cursor: pointer;
  img {
    width: 100%;
    height: 180px;
    object-fit: cover;
    box-shadow: 0px 10px 25px 0px rgba(0, 0, 0, 0.2);
  }
`;

export const Info = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  h1,
  h2 {
    margin: 0;
    font-size: 14px;
    font-family: "Poppins", sans-serif;
    font-weight: 600;
    color: var(--default);
  }
`;

export const Description = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  span {
    font-size: 12px;
    font-family: "Poppins", sans-serif;
    font-weight: 400;
    color: var(--tertiary);
  }
`;

export const ButtonStyled = styled.button`
  background-color: palegoldenrod;
  font-size: 12px;
  font-family: "Poppins", sans-serif;
  font-weight: 500;
  color: var(--neutral);
  padding: 7px 16px;
  background-color: var(--primary-500);
  border-radius: 30px;
  transition: box-shadow 0.2s ease, transform 0.2s ease;
  :active {
    box-shadow: inset 2px 2px 5px rgba(0, 0, 0, 0.1);
    transform: scale(0.98);
  }
`;

import styled from "@emotion/styled";

export const Container = styled.div`
  margin: 40px 32px;
`;

export const H1Styled = styled.h1`
  margin: 0;
  font-size: 24px;
  font-family: "Poppins", sans-serif;
  font-weight: 400;
`;

export const ButtonContainer = styled.div`
  margin: 24px 16px;
  display: flex;
  justify-content: end;
`;

export const ButtonStyled = styled.button`
  background-color: var(--secondary-500);
  color: var(--neutral);
  padding: 10px 20px;
  transition: box-shadow 0.2s ease, transform 0.2s ease;
  border-radius: 50px;
  cursor: pointer;
  :active {
    box-shadow: 0px 10px 36px 0px rgba(0,0,0,0.1);
    transform: scale(0.98);
  }
`;

export const EventsContent = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const Title = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
`;

export const EventContainer = styled.section`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  padding-left: 3%;
  margin: 32px 0;
  column-gap: 88px;
  row-gap: 56px;
  @media (max-width: 1600px) {
    grid-template-columns: repeat(3, 1fr);
  }
`;

import styled from "@emotion/styled";

export const Container = styled.div`
  margin: 40px 32px;
`;

export const NewEvents = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  h1 {
    margin: 0;
    font-size: 24px;
    font-family: "Poppins", sans-serif;
    font-weight: 400;
  }
  .description {
    font-size: 12px;
    font-family: "Poppins", sans-serif;
    font-weight: 400;
    color: var(--tertiary-inverse);
  }
`;

export const Line = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 12px;
  width: 11%;
  hr {
    width: 100%;
    height: 1px;
    margin: 2px;
    color: var(--secondary-inverse);
  }
`;

export const EventContainer = styled.section`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  padding-left: 3%;
  margin: 48px 0;
  column-gap: 88px;
  row-gap: 56px;
  @media(max-width: 1600px){
    grid-template-columns: repeat(3, 1fr);
  }
`;

export const ImageContainer = styled.div`
  margin: 40px 0 64px;
  img {
    width: 100%;
    height: 300px;
    object-fit: cover;
  }
`;

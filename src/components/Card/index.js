import React from "react";
import { ButtonStyled, Container, Description, Info } from "./index.style";

const Card = ({name, price, time, date, onClick, image}) => {
  return (
    <Container>
      <img src={image} alt={name}/>
      <Info>
        <h1>{name}</h1>
        <h1>${price}</h1>
      </Info>
      <Description>
        <span>{time}</span>
        <span>{date}</span>
      </Description>
      <div>
        <ButtonStyled onClick={onClick}>Ver más aquí</ButtonStyled> 
      </div>
    </Container>
  );
};

export default Card;

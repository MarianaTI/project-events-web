import React from "react";
import { ButtonStyled, Container, Description, Info } from "./index.style";

const Card = ({name, price, place, time, date, onClick, image}) => {
  return (
    <Container>
      <img src={image} alt={name}/>
      <Info>
        <h1>{name}</h1>
        <h2>${price}</h2>
      </Info>
      <Description>
        <span>{place}</span>
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

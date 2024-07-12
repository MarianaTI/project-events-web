import React from "react";
import { ButtonStyled } from "./index.style";

const Button = ({ fullWidth, text, onClick, type, disable }) => {
  return (
    <ButtonStyled
      onClick={onClick}
      fullWidth={fullWidth}
      type={type}
      disable={disable}
    >
      {text}
    </ButtonStyled>
  );
};

export default Button;

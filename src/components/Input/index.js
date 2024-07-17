import React from "react";
import { useController } from "react-hook-form";
import { ErrorMessage, IconWrapper, InputStyled, InputWrapper, Label } from "./index.style";

const Input = ({ label, icon, error, control, name, fullWidth, type, defaultValue, placeholder }) => {
  const {
    field,
    fieldState: { invalid, isTouched, isDirty },
    formState: { touchedFields, dirtyFields },
  } = useController({
    name,
    control,
  });
  return (
    <div style={{padding: "4px 0"}}>
      <Label>{label}</Label>
      <InputWrapper>
        <InputStyled {...field} fullWidth={fullWidth} type={type} defaultValue={defaultValue} placeholder={placeholder}/>
        {icon && <IconWrapper>{icon}</IconWrapper>}
      </InputWrapper>
      {error && <ErrorMessage>{error}</ErrorMessage>}
    </div>
  );
};

export default Input;

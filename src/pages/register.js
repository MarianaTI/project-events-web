import Button from "@/components/Button";
import Input from "@/components/Input";
import {
  Container,
  FormRegister,
  LinkRegister,
  RegisterStyled,
} from "@/styles/Login.style";
import React from "react";
import { useForm } from "react-hook-form";

export default function Register() {
  const {
    control,
    handleSubmit,
    formState: { errors, isDirty },
  } = useForm({});

  return (
    <Container>
      <RegisterStyled>
        <img src="/images/logo.png" />
        <div>
          <h1>Regístrate</h1>
          <p>Hola! Gracias por estar aquí ✌️</p>
          <p>
            Ingresa los datos de aquí abajo para comenzar a navegar pronto 👇
          </p>
        </div>
        <FormRegister>
          <Input fullWidth control={control} name="username" label="Usuario" />
          <Input fullWidth control={control} name="email" label="Correo" />
          <Input
            fullWidth
            control={control}
            name="password"
            label="Contraseña"
          />
          <Button text="Inicia sesión" />
        </FormRegister>
        <LinkRegister>
          <span>¿Ya tienes un cuenta?</span>
          <a href="/">Inicia sesión aquí</a>
        </LinkRegister>
      </RegisterStyled>
    </Container>
  );
}

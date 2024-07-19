import SignUpUserUseCase from "@/application/usecases/userUseCase/SignUpUserUseCase";
import Button from "@/components/Button";
import Input from "@/components/Input";
import User from "@/domain/entities/user";
import UserRepo from "@/infraestructure/implementation/httpRequest/axios/UserRepo";
import {
  Container,
  FormRegister,
  LinkRegister,
  RegisterStyled,
} from "@/styles/Login.style";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { IoEyeSharp, IoEyeOffSharp } from "react-icons/io5";

export default function Register() {
  const route = useRouter();
  const [isShowPassword, setShowPassword] = useState(false);
  const {
    control,
    handleSubmit,
    formState: { errors, isDirty },
  } = useForm({
    defaultValues: {
      name: "",
      lastname: "",
      email: "",
      password: "",
    },
  });

  const togglePasswordVisibility = () => {
    setShowPassword(!isShowPassword);
  };

  const onSubmit = async (data) => {
    const user = new User(
      null,
      data.name,
      data.lastname,
      data.email,
      data.password
    );
    const userRepo = new UserRepo();
    const signUpUserUseCase = new SignUpUserUseCase(userRepo);

    try {
      const registeredUser = await signUpUserUseCase.run(user);
      console.log("Usuario creado: ", registeredUser);
      route.push("/");
    } catch (error) {
      console.error("Error creando usuario:", error);
    }
  };

  return (
    <Container>
      <RegisterStyled>
        <img src="/images/logo.png" alt="logo" />
        <div>
          <h1>Regístrate</h1>
          <p>Hola! Gracias por estar aquí ✌️</p>
          <p>
            Ingresa los datos de aquí abajo para comenzar a navegar pronto 👇
          </p>
        </div>
        <FormRegister onSubmit={handleSubmit(onSubmit)}>
          <Input fullWidth control={control} name="name" label="Nombre" />
          <Input fullWidth control={control} name="lastname" label="Apellido" />
          <Input fullWidth control={control} name="email" label="Correo" />
          <Input
            fullWidth
            control={control}
            name="password"
            label="Contraseña"
            type={isShowPassword ? "text" : "password"}
            icon={
              isShowPassword ? (
                <IoEyeOffSharp onClick={togglePasswordVisibility} />
              ) : (
                <IoEyeSharp onClick={togglePasswordVisibility} />
              )
            }
          />
          <Button text="Registrarse" type="submit" />
        </FormRegister>
        <LinkRegister>
          <span>¿Ya tienes un cuenta?</span>
          <a href="/">Inicia sesión aquí</a>
        </LinkRegister>
      </RegisterStyled>
    </Container>
  );
}

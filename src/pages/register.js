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
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "react-toastify";

const schema = yup.object().shape({
  name: yup.string().required("El nombre de usuario es obligatorio"),
  lastname: yup.string().required("El apellido de usuario es obligatorio"),
  email: yup
    .string()
    .email("Email no válido")
    .required("El email es obligatorio"),
  password: yup
    .string()
    .min(6, "La contraseña debe tener al menos 6 caracteres")
    .required("La contraseña es obligatoria"),
});

export default function Register() {
  const route = useRouter();
  const [isShowPassword, setShowPassword] = useState(false);
  const {
    control,
    handleSubmit,
    formState: { errors, isDirty },
  } = useForm({
    resolver: yupResolver(schema),
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
      toast.success("Registro exitoso!");
      route.push("/");
    } catch (error) {
      console.error("Error creando usuario:", error);
      toast.error("Error al registrarse :(");
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
          <Input
            fullWidth
            control={control}
            name="name"
            label="Nombre"
            error={errors.name?.message}
          />
          <Input
            fullWidth
            control={control}
            name="lastname"
            label="Apellido"
            error={errors.lastname?.message}
          />
          <Input
            fullWidth
            control={control}
            name="email"
            label="Correo"
            error={errors.email?.message}
          />
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
            error={errors.password?.message}
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

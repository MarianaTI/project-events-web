import { setUser } from "@/actions/userActions";
import SignInUserUseCase from "@/application/usecases/userUseCase/SignInUserUseCase";
import Button from "@/components/Button";
import Input from "@/components/Input";
import User from "@/domain/entities/user";
import UserRepo from "@/infraestructure/implementation/httpRequest/axios/UserRepo";
import { Container, Form, LinkStyled, Login } from "@/styles/Login.style";
import Cookies from "js-cookie";
import Head from "next/head";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import CryptoJS from "crypto-js";
import { useState } from "react";
import { IoEyeSharp, IoEyeOffSharp } from "react-icons/io5";

export default function Home() {
  const route = useRouter();
  const [isShowPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();
  const {
    control,
    handleSubmit,
    formState: { errors, isDirty },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const togglePasswordVisibility = () => {
    setShowPassword(!isShowPassword);
  };

  const onSubmit = async (data) => {
    try {
      const user = new User(null, null, null, data.email, data.password);
      const userRepo = new UserRepo(dispatch);
      const signInUseCase = new SignInUserUseCase(userRepo);
      const signInResponse = await signInUseCase.run(user);

      if (signInResponse && signInResponse.token) {
        const encryptedToken = CryptoJS.AES.encrypt(
          signInResponse.token,
          "cookie-encrypted"
        ).toString();
        Cookies.set("userToken", encryptedToken, { expires: 1 / 24 });
        dispatch(setUser(signInResponse.user));
        route.push("/home");
      }
    } catch (error) {
      console.log("Error: ", error);
    }
  };

  return (
    <>
      <Head>
        <title>Evenfy</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/images/logo.png" />
      </Head>
      <Container>
        <Login>
          <img src="/images/logo.png" alt="logo" />
          <div>
            <h1>Bienvenido</h1>
            <p>Es bueno verte de nuevo! 👋</p>
            <p>Inicia sesión con tus datos aquí debajo 👇</p>
          </div>
          <Form onSubmit={handleSubmit(onSubmit)}>
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
            <Button text="Inicia sesión" type="submit" />
          </Form>
          <LinkStyled>
            <span>¿Aun no tienes una cuenta?</span>
            <a href="/register">Registrate aquí</a>
          </LinkStyled>
        </Login>
      </Container>
    </>
  );
}

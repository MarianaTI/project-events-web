import Input from "@/components/Input";
import { Container, Content, H5Styled, Logo } from "@/styles/AddEvent.style";
import React from "react";
import { useForm } from "react-hook-form";

export default function AddEvent() {
  const {
    control,
    handleSubmit,
    formState: { errors, isDirty },
  } = useForm({});

  return (
    <Container>
      <Content>
        <Logo>
          <img src="/images/logo.png" />
          <h1>Añadir evento</h1>
        </Logo>
        <H5Styled>
          Completa los campos a continuación para agregar un nuevo evento a
          nuestro calendario. ¡Queremos que tu ocasión especial sea conocida por
          todos!
        </H5Styled>
        <form>
          <Input control={control} name="name" label="Nombre del evento" fullWidth/>
          <Input control={control} name="description" label="Descripción del evento" fullWidth/>
          <Input control={control} name="price" label="Costo del evento"/>
        </form>
      </Content>
    </Container>
  );
}

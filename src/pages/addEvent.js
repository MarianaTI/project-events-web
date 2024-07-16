import File from "@/components/File";
import Input from "@/components/Input";
import Textarea from "@/components/Textarea";
import { Container, Content, H5Styled, Logo } from "@/styles/AddEvent.style";
import React, { useRef, useState } from "react";
import { useForm } from "react-hook-form";

export default function AddEvent() {
  const [imageUrl, setImageUrl] = useState("");
  const fileInputRef = useRef(null);
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
          <Input
            control={control}
            name="title"
            label="Nombre del evento"
            fullWidth
          />
          <Textarea
            placeholder="Escriba aquí su comentario..."
            fullWidth
            control={control}
            name="description"
            commentDesign
          />
          <Input control={control} name="cost" label="Costo del evento" />
          <File
            name="image"
            onChange={(e) => {
              const file = e.target.files[0];
              if (file) {
                const reader = new FileReader();
                reader.onloadend = function () {
                  console.log("Imagen en base64:", reader.result);
                  setImageUrl(reader.result);
                };
                reader.readAsDataURL(file);
              }
            }}
            ref={fileInputRef}
          />
        </form>
      </Content>
    </Container>
  );
}

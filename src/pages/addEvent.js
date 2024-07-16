import Button from "@/components/Button";
import File from "@/components/File";
import Input from "@/components/Input";
import MapComponent from "@/components/Map";
import Textarea from "@/components/Textarea";
import EventRepo from "@/infraestructure/implementation/httpRequest/axios/EventRepo";
import { Container, Content, H5Styled, Logo } from "@/styles/AddEvent.style";
import React, { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";

export default function AddEvent() {
  const userId = useSelector((state) => state.user._id);
  const [imageUrl, setImageUrl] = useState("");
  const fileInputRef = useRef(null);
  const [location, setLocation] = useState(null);
  const {
    control,
    handleSubmit,
    formState: { errors, isDirty },
  } = useForm({});

  const eventRepo = new EventRepo();

  const onSubmit = async (data) => {
    const file = fileInputRef.current.files[0];
    const eventData = {
      ...data,
      image: file,
      id_user: userId,
      location,
    };

    try {
      const response = await eventRepo.create(eventData);
      console.log("evento: ", response);
    } catch (error) {
      console.error("Error al crear el event:", error);
    }
  };

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
        <form onSubmit={handleSubmit(onSubmit)}>
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
          <Input
            control={control}
            name="date"
            label="Fecha y hora del evento"
            type="datetime-local"
          />
          <Input control={control} name="cost" label="Costo del evento" />
          <MapComponent onLocationChange={setLocation} />
          <div>
            <Button text="Aceptar" type="submit" />
          </div>
        </form>
      </Content>
    </Container>
  );
}

import Button from "@/components/Button";
import File from "@/components/File";
import Input from "@/components/Input";
import Textarea from "@/components/Textarea";
import MapComponent from "@/components/Map";
import { Container, Content, H5Styled, Logo } from "@/styles/AddEvent.style";
import React, { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import EventRepo from "@/infraestructure/implementation/httpRequest/axios/EventRepo";
import UpdateEventUseCase from "@/application/usecases/eventUseCase/UpdateEventUseCase";
import { useRouter } from "next/router";

export default function UpdateEvent() {
  const router = useRouter();
  const userId = useSelector((state) => state.user._id);
  const [imageUrl, setImageUrl] = useState("");
  // const [fileName, setFileName] = useState("");
  const fileInputRef = useRef(null);
  const [location, setLocation] = useState(null);
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors, isDirty },
  } = useForm({});

  useEffect(() => {
    if (router.query.id) {
      const formattedDate = new Date(router.query.date).toISOString().slice(0, 16);
      const event = {
        _id: router.query.id,
        title: router.query.title,
        description: router.query.description,
        date: formattedDate,
        cost: router.query.cost,
        location: router.query.location,
        image: { secureUrl: router.query.image },
      };
      reset(event);
      setImageUrl(event.image.secureUrl);
      // setFileName(event.image.secureUrl.split('/').pop());
      setLocation(event.location.split(",").map((coord) => parseFloat(coord)));
    }
  }, [router.query, reset]);

  const onSubmit = async (data) => {
    const file = fileInputRef.current.files[0];
    const eventData = {
      _id: router.query.id,
      id_user: userId,
      title: data.title,
      description: data.description,
      content: data.content,
      image: file,
      date: data.date,
      date: data.date,
      cost: data.cost,
      location: location.join(","),
    };

    const eventRepo = new EventRepo(userId);
    const updateEventUseCase = new UpdateEventUseCase(eventRepo);

    try {
      const response = await updateEventUseCase.run(eventData);
      router.push("/user/event");
    } catch (error) {
      console.error("Error updating event: ", error);
    }
  };

  return (
    <Container>
      <Content>
        <Logo>
          <img src="/images/logo.png" />
          <h1>Editar evento</h1>
        </Logo>
        <H5Styled>Completa</H5Styled>
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
                // setFileName(file.name);
              }
            }}
            ref={fileInputRef}
            // fileName={fileName}
          />
          <Input
            control={control}
            name="date"
            label="Fecha y hora del evento"
            type="datetime-local"
          />
          <Input control={control} name="cost" label="Costo del evento" />
          <MapComponent onLocationChange={setLocation} initialPosition={location}/>
          <div>
            <Button text="Aceptar" type="submit" />
          </div>
        </form>
      </Content>
    </Container>
  );
}

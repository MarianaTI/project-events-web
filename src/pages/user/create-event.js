import Button from "@/components/Button";
import File from "@/components/File";
import Input from "@/components/Input";
import MapComponent from "@/components/Map";
import Textarea from "@/components/Textarea";
import EventRepo from "@/infraestructure/implementation/httpRequest/axios/EventRepo";
import {
  ButtonContainer,
  Container,
  Content,
  Flex,
  FormStyled,
  H5Styled,
  Label,
  Logo,
} from "@/styles/AddEvent.style";
import { useRouter } from "next/router";
import React, { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const schema = yup.object().shape({
  title: yup.string().required("Título es obligatorio"),
  description: yup.string().required("Descripción es obligatoria"),
  date: yup.date().required("Fecha y hora son obligatorios"),
  cost: yup
    .number()
    .required("Costo es obligatorio")
    .positive("El costo debe ser un número positivo"),
});

export default function CreateEvent() {
  const router = useRouter();
  const userId = useSelector((state) => state.user._id);
  const [imageUrl, setImageUrl] = useState("");
  const fileInputRef = useRef(null);
  const [location, setLocation] = useState(null);
  const {
    control,
    handleSubmit,
    formState: { errors, isDirty },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const eventRepo = new EventRepo();

  const onSubmit = async (data) => {
    const file = fileInputRef.current.files[0];
    const eventData = {
      ...data,
      image: file,
      id_user: userId,
      location,
      b_concluido: false,
    };

    try {
      const response = await eventRepo.create(eventData);
      router.push("/user/event");
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
        <FormStyled onSubmit={handleSubmit(onSubmit)}>
          <Input
            control={control}
            name="title"
            label="Título"
            fullWidth
            error={errors.title?.message}
          />
          <div>
            <Label>Descripción</Label>
            <Textarea
              placeholder="Escriba aquí su descripción..."
              fullWidth
              control={control}
              name="description"
              error={errors.description?.message}
            />
          </div>
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
          <Flex>
            <Input
              control={control}
              name="date"
              label="Fecha y hora"
              type="datetime-local"
              fullWidth
              error={errors.date?.message}
            />
            <Input
              control={control}
              name="cost"
              label="Precio"
              fullWidth
              placeholder="$ 0.00"
              error={errors.cost?.message}
            />
          </Flex>
          <div>
            <Label>Ubicación</Label>
            <MapComponent onLocationChange={setLocation} />
          </div>
          <ButtonContainer>
            <Button text="Guardar información" type="submit" />
          </ButtonContainer>
        </FormStyled>
      </Content>
    </Container>
  );
}

import Button from "@/components/Button";
import File from "@/components/File";
import Input from "@/components/Input";
import Textarea from "@/components/Textarea";
import MapComponent from "@/components/Map";
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
import React, { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import EventRepo from "@/infraestructure/implementation/httpRequest/axios/EventRepo";
import UpdateEventUseCase from "@/application/usecases/eventUseCase/UpdateEventUseCase";
import { useRouter } from "next/router";
import { Switch } from "@headlessui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { toast } from "react-toastify";

const schema = yup.object().shape({
  title: yup.string(),
  description: yup.string(),
  date: yup.date(),
  cost: yup
    .number()
    .min(0, 'El costo debe ser un número positivo')
});

export default function UpdateEvent() {
  const router = useRouter();
  const userId = useSelector((state) => state.user._id);
  const [imageUrl, setImageUrl] = useState("");
  // const [fileName, setFileName] = useState("");
  const fileInputRef = useRef(null);
  const [location, setLocation] = useState(null);
  const [enabled, setEnabled] = useState(false);
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors, isDirty },
  } = useForm({
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    const fetchEventDetails = async () => {
      try {
        if (router.query.id) {
          const formattedDate = new Date(router.query.date)
            .toISOString()
            .slice(0, 16);
          const event = {
            _id: router.query.id,
            title: router.query.title,
            description: router.query.description,
            date: formattedDate,
            cost: router.query.cost,
            location: router.query.location,
            image: { secureUrl: router.query.image },
            b_activo: router.query.b_activo, // Convertir a booleano
          };
          reset(event);
          setImageUrl(event.image.secureUrl);
          setLocation(
            event.location.split(",").map((coord) => parseFloat(coord))
          );
          setEnabled(event.b_activo); // Actualizar el estado del Switch
        }
      } catch (error) {
        console.error("Error fetching event details: ", error);
      }
    };

    fetchEventDetails();
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
      b_activo: enabled,
    };

    const eventRepo = new EventRepo(userId);
    const updateEventUseCase = new UpdateEventUseCase(eventRepo);

    try {
      const response = await updateEventUseCase.run(eventData);
      toast.success("Editado correctamente");
      router.push("/user/event");
    } catch (error) {
      console.error("Error updating event: ", error);
      toast.error("Error al crear el blog");
    }
  };

  return (
    <Container>
      <Content>
        <Logo>
          <img src="/images/logo.png" />
          <h1>Editar evento</h1>
        </Logo>
        <H5Styled>
          Completa los campos a continuación para actualizar los detalles de tu
          evento. ¡Queremos asegurarnos de que tu ocasión especial se mantenga
          destacada y actualizada en nuestro calendario!
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
                // setFileName(file.name);
              }
            }}
            ref={fileInputRef}
            // fileName={fileName}
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
          <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
            <Label>Activo</Label>
            <Switch
              checked={enabled}
              onChange={() => setEnabled(!enabled)} // Cambiar el estado inverso
              className="group inline-flex h-6 w-11 items-center rounded-full bg-gray-200 transition data-[checked]:bg-blue-600"
            >
              <span className="size-4 translate-x-1 rounded-full bg-white transition group-data-[checked]:translate-x-6" />
            </Switch>
          </div>
          <div>
            <Label>Ubicación</Label>
            <MapComponent
              onLocationChange={setLocation}
              initialPosition={location}
            />
          </div>
          <ButtonContainer>
            <Button text="Guardar información" type="submit" />
          </ButtonContainer>
        </FormStyled>
      </Content>
    </Container>
  );
}

import {
  ButtonContainer,
  ButtonStyled,
  CatButton,
  Categories,
  Container,
  EventContainer,
  EventsContent,
  H1Styled,
  Title,
} from "@/styles/Event.style";
import React, { useEffect, useState } from "react";
import { FaFire } from "react-icons/fa";
import Card from "@/components/Card";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import EventRepo from "@/infraestructure/implementation/httpRequest/axios/EventRepo";
import GetAllEventUseCase from "@/application/usecases/eventUseCase/GetAllEventUseCase";

export default function Event() {
  const router = useRouter();
  const userId = useSelector((state) => state.user._id);
  const name = useSelector((state) => state.user.name);
  const [events, setEvents] = useState([]);
  const [eventType, setEventType] = useState("todos");
  const eventRepo = new EventRepo();
  const getAllEventUseCase = new GetAllEventUseCase(eventRepo);

  const navigateToEvent = (id) => {
    return router.push({
      pathname: "/user/[id]",
      query: { id: id },
    });
  };

  const navigateToCreate = () => {
    router.push("/user/create-event");
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = date.getDate();
    const month = date.toLocaleDateString("es-ES", { month: "long" });
    const year = date.getFullYear();
    return `${day} ${month}, ${year}`;
  };

  const formatTime = (dateString) => {
    const date = new Date(dateString);
    let hours = date.getHours();
    const minutes = date.getMinutes();
    const ampm = hours >= 12 ? "pm" : "am";
    hours = hours % 12;
    hours = hours ? hours : 12;
    const minutesStr = minutes < 10 ? "0" + minutes : minutes;
    return `${hours}:${minutesStr} ${ampm}`;
  };

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await getAllEventUseCase.run();
        const fetchedEvents = response.response.events.filter(
          (event) => event.user._id === userId
        );

        let filteredEvents = [];
        switch (eventType) {
          case "activos":
            filteredEvents = fetchedEvents.filter(
              (event) => event.b_activo === true && event.b_cancelado === false && event.b_concluido === false 
            );
            break;
          case "inactivos":
            filteredEvents = fetchedEvents.filter(
              (event) => event.b_activo === false
            );
            break;
          case "cancelados":
            filteredEvents = fetchedEvents.filter(
              (event) => event.b_cancelado === true
            );
            break;
          case "concluidos":
            filteredEvents = fetchedEvents.filter(
              (event) => event.b_concluido === true
            );
            break;
          default:
            filteredEvents = fetchedEvents;
        }

        setEvents(filteredEvents);
      } catch (error) {
        console.log(error);
      }
    };

    fetchEvents();
  }, [eventType, userId]);

  return (
    <Container>
      <EventsContent>
        <Title>
          <FaFire size={24} color="#122088" />
          <H1Styled>Disfruta nuestros eventos</H1Styled>
        </Title>
        <ButtonContainer>
          <ButtonStyled onClick={navigateToCreate}>Agregar evento</ButtonStyled>
        </ButtonContainer>
        <Categories>
        <CatButton active={eventType === "todos"} onClick={() => setEventType("todos")}>Todos</CatButton>
        <CatButton active={eventType === "activos"} onClick={() => setEventType("activos")}>Activos</CatButton>
        <CatButton active={eventType === "inactivos"} onClick={() => setEventType("inactivos")}>Inactivos</CatButton>
        <CatButton active={eventType === "cancelados"} onClick={() => setEventType("cancelados")}>Cancelados</CatButton>
        <CatButton active={eventType === "concluidos"} onClick={() => setEventType("concluidos")}>Concluidos</CatButton>
        </Categories>
        <div>
          {events.length === 0 ? (
            <div style={{ textAlign: "center", marginTop: 80 }}>
              <span>No has creado ningun evento hasta el momento</span>
            </div>
          ) : (
            <EventContainer>
              {events.map((event, index) => (
                <Card
                  key={index}
                  name={event.title}
                  image={event.image.secureUrl}
                  time={formatTime(event.date)}
                  date={formatDate(event.date)}
                  description={event.description}
                  price={event.cost}
                  onClick={() => navigateToEvent(event._id)}
                />
              ))}
            </EventContainer>
          )}
        </div>
      </EventsContent>
    </Container>
  );
}

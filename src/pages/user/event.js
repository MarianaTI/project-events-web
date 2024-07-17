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
  const [events, setEvents] = useState([]);
  const eventRepo = new EventRepo();
  const getAllEventUseCase = new GetAllEventUseCase(eventRepo);

  const navigateToEvent = (id) => {
    return router.push({
      pathname: "/user/[id]",
      query: { id: id },
    });
  };

  const navigateToAdd = () => {
    router.push("/addEvent");
  }

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
        const filteredEvents = response.response.events.filter(
          (event) => event.user._id === userId
        );
        setEvents(filteredEvents);
      } catch (error) {
        console.log(error);
      }
    };

    fetchEvents();
  }, []);

  return (
    <Container>
      <H1Styled>Eventos</H1Styled>
      <ButtonContainer>
        <ButtonStyled onClick={navigateToAdd}>Agregar evento</ButtonStyled>
      </ButtonContainer>
      <EventsContent>
        <Title>
          <FaFire size={24} color="#122088" />
          <H1Styled>Disfruta nuestros eventos</H1Styled>
        </Title>
        <Categories>
          <CatButton>Todos</CatButton>
          <CatButton>Activos</CatButton>
          <CatButton>Inactivos</CatButton>
          <CatButton>Cancelados</CatButton>
          <CatButton>Concluidos</CatButton>
        </Categories>
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
      </EventsContent>
    </Container>
  );
}

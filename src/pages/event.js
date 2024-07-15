import {
  ButtonContainer,
  ButtonStyled,
  Container,
  EventContainer,
  EventsContent,
  H1Styled,
  Title,
} from "@/styles/Event.style";
import React from "react";
import { FaFire } from "react-icons/fa";
import { event } from "../../constants";
import Card from "@/components/Card";
import { useRouter } from "next/router";

export default function Event() {
  const router = useRouter();

  const navigateToEvent = (id) => {
    return router.push({
      pathname: "/[id]",
      query: { id: id },
    });
  };

  return (
    <Container>
      <H1Styled>Eventos</H1Styled>
      <ButtonContainer>
        <ButtonStyled>Agregar evento</ButtonStyled>
      </ButtonContainer>
      <EventsContent>
        <Title>
          <FaFire size={24} color="#5b0888" />
          <H1Styled>Disfruta nuestros eventos</H1Styled>
        </Title>
        <EventContainer>
          {event.map((event, index) => (
            <Card
              key={index}
              name={event.nombre}
              image={event.imagen}
              date={event.fecha}
              time={event.hora}
              description={event.descripcion}
              guests={event.invitados}
              price={event.costo}
              place={event.lugar}
              onClick={() => navigateToEvent(event.slug)}
            />
          ))}
        </EventContainer>
      </EventsContent>
    </Container>
  );
}

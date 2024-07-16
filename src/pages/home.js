import Card from "@/components/Card";
import {
  AllEvents,
  Container,
  EventContainer,
  ImageContainer,
  Line,
  NewEvents,
} from "@/styles/Home.style";
import { FiCalendar } from "react-icons/fi";
import { event } from "../../constants";
import Parallax from "@/components/Parallax";
import { useRouter } from "next/router";
import { H1Styled, Title } from "@/styles/Event.style";
import { FaFire } from "react-icons/fa6";
import EventRepo from "@/infraestructure/implementation/httpRequest/axios/EventRepo";
import GetAllEventUseCase from "@/application/usecases/eventUseCase/GetAllEventUseCase";
import { useEffect, useState } from "react";

export default function Home() {
  const router = useRouter();
  const [events, setEvents] = useState([]);
  const eventRepo = new EventRepo();
  const getAllEventUseCase = new GetAllEventUseCase(eventRepo);

  const navigateToEvent = (id) => {
    return router.push({
      pathname: "/[id]",
      query: { id: id },
    });
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
        setEvents(response.response.events);
      } catch (error) {
        console.log(error);
      }
    };

    fetchEvents();
  }, []);

  return (
    <Container>
      <ImageContainer>
        <Parallax imageUrl="/images/home.jpg" title="BIGGEST FESTIVAL EVER" />
      </ImageContainer>
      <NewEvents>
        <h1>Eventos próximos</h1>
        <Line>
          <hr />
          <FiCalendar size={30} color="#bebebe" />
          <hr />
        </Line>
        <span className="description">
          No te pierdas la oportunidad de participar en experiencias únicas y
          emocionantes.
        </span>
        <div>
          {events.length === 0 ? (
            <div style={{ textAlign: "center" }}>
              <span>No hay eventos disponibles</span>
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
      </NewEvents>
      <AllEvents>
        <Title>
          <FaFire size={24} color="#5b0888" />
          <H1Styled>Todos los eventos</H1Styled>
        </Title>
        <div>
          {events.length === 0 ? (
            <div style={{ textAlign: "center" }}>
              <span>No hay eventos disponibles</span>
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
      </AllEvents>
    </Container>
  );
}

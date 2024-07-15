import Card from "@/components/Card";
import {
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

export default function Home() {
  const router = useRouter();

  const navigateToEvent = (id) => {
    return router.push({
      pathname: "/[id]",
      query: { id: id },
    });
  };

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
      </NewEvents>
    </Container>
  );
}

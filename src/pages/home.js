import Card from "@/components/Card";
import {
  Container,
  EventContainer,
  Line,
  NewEvents,
} from "@/styles/Home.style";
import { FiCalendar } from "react-icons/fi";
import { event } from "../../constants";

export default function Home() {
  return (
    <Container>
      <div>Imagen</div>
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
            />
          ))}
        </EventContainer>
      </NewEvents>
    </Container>
  );
}

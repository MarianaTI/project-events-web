import { useRouter } from "next/router";
import React from "react";
import { event } from "../../constants";
import { Container, ImageStyled, Information } from "@/styles/Id.style";
import { AiFillDollarCircle } from "react-icons/ai";
import { MdLocationOn } from "react-icons/md";
import { HiMiniUsers } from "react-icons/hi2";
import { FaClock } from "react-icons/fa6";
import { FaCalendar } from "react-icons/fa";

export default function IdEvent() {
  const router = useRouter();
  const { id } = router.query;
  const eventDetails = event.find((e) => e.slug === id);

  if (!eventDetails) {
    return <div>Evento no encontrado</div>;
  }

  return (
    <Container>
      <ImageStyled>
        <img src={eventDetails.imagen} alt={eventDetails.nombre} />
        <h1>{eventDetails.nombre}</h1>
      </ImageStyled>
      <Information>
        <h5>Información del evento 🎉</h5>
        <p>{eventDetails.descripcion}</p>
        <h1>Más información:</h1>
        <span><FaCalendar size={20} color="#5b0888"/> {eventDetails.fecha}</span>
        <span><FaClock size={20} color="#5b0888"/> {eventDetails.hora}</span>
        <span><HiMiniUsers size={22} color="#5b0888"/> {eventDetails.invitados}</span>
        <span><AiFillDollarCircle size={22} color="#5b0888"/> ${eventDetails.costo}</span>
        <span><MdLocationOn size={23} color="#5b0888"/> {eventDetails.lugar}</span>
      </Information>
    </Container>
  );
}

import GetAllEventUseCase from "@/application/usecases/eventUseCase/GetAllEventUseCase";
import EventRepo from "@/infraestructure/implementation/httpRequest/axios/EventRepo";
import { Container, Content } from "@/styles/Date.style";
import { Title } from "@/styles/Event.style";
import moment from "moment";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { BsCalendar2CheckFill } from "react-icons/bs";

const localizer = momentLocalizer(moment);

export default function DateComponent() {
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

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await getAllEventUseCase.run();
        const fetchedEvents = response.response.events;

        const activeEvents = fetchedEvents.filter(event => event.b_activo);

        const formattedEvents = activeEvents.map((event) => ({
          id: event._id,
          title: event.title,
          start: new Date(event.date),
          end: new Date(new Date(event.date).getTime() + 60 * 60 * 1000), // suponer una duración de 1 hora
          allDay: false,
        }));

        setEvents(formattedEvents);
      } catch (error) {
        console.log(error);
      }
    };

    fetchEvents();
  }, []);

  const eventPropGetter = (event) => {
    const backgroundColor = event.id % 2 === 0 ? "#a684d6" : "#5b0888"; // Ejemplo: color diferente para eventos pares e impares
    return { style: { backgroundColor } };
  };

  return (
    <Container>
      <Content>
        <Title>
          <BsCalendar2CheckFill size={24} color="#122088" />
          <h1>Calendarios de eventos</h1>
        </Title>
        <Calendar
          localizer={localizer}
          events={events}
          startAccessor="start"
          endAccessor="end"
          style={{ height: "75vh"}}
          onSelectEvent={(event) => navigateToEvent(event.id)}
          views={['month', 'week', 'day']}
          eventPropGetter={eventPropGetter}
        />
      </Content>
    </Container>
  );
}

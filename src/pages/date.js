import GetAllEventUseCase from "@/application/usecases/eventUseCase/GetAllEventUseCase";
import EventRepo from "@/infraestructure/implementation/httpRequest/axios/EventRepo";
import moment from "moment";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";

const localizer = momentLocalizer(moment);

export default function DateComponent() {
  const router = useRouter();
  const [events, setEvents] = useState([]);
  const eventRepo = new EventRepo();
  const getAllEventUseCase = new GetAllEventUseCase(eventRepo);

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
        const fetchedEvents = response.response.events;

        const formattedEvents = fetchedEvents.map(event => ({
          id: event._id,
          title: event.title,
          start: new Date(event.date),
          end: new Date(new Date(event.date).getTime() + 60 * 60 * 1000), // suponer una duración de 1 hora
          allDay: false
        }));

        setEvents(formattedEvents);
      } catch (error) {
        console.log(error);
      }
    };

    fetchEvents();
  }, []);

  return <div>
  <h2>Calendario de Eventos</h2>
  <Calendar
    localizer={localizer}
    events={events}
    startAccessor="start"
    endAccessor="end"
    style={{ height: 500 }}
    //onSelectEvent={event => navigateToEvent(event.id)}
  />
</div>;
}

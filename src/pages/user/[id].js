import { useRouter } from "next/router";
import React, { Fragment, useEffect, useState } from "react";
import {
  ButtonPeople,
  ButtonsContainer,
  Container,
  ImageStyled,
  Information,
} from "@/styles/Id.style";
import { AiFillDollarCircle } from "react-icons/ai";
import { MdLocationOn } from "react-icons/md";
import { FaClock, FaHeart } from "react-icons/fa6";
import { FaCalendar } from "react-icons/fa";
import { Dialog, Transition } from "@headlessui/react";
import { IoMdEye } from "react-icons/io";
import { useSelector } from "react-redux";
import EventRepo from "@/infraestructure/implementation/httpRequest/axios/EventRepo";
import GetOneEventUseCase from "@/application/usecases/eventUseCase/GetOneEventUseCase";
import dynamic from "next/dynamic";
import GuestRepo from "@/infraestructure/implementation/httpRequest/axios/GuestRepo";
import GetOneGuestUseCase from "@/application/usecases/guestUseCase/GetOneGuestUseCase";

const Location = dynamic(() => import("@/components/Location/Location"), {
  ssr: false,
});

export default function IdEvent() {
  const router = useRouter();
  const userId = useSelector((state) => state.user._id);
  const { id } = router.query;
  const [isOpen, setIsOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [guest, setGuest] = useState([]);
  const [locationName, setLocationName] = useState("");
  const eventRepo = new EventRepo();
  const getOneEventUseCase = new GetOneEventUseCase(eventRepo);

  const guestRepo = new GuestRepo();
  const getGuestUseCase = new GetOneGuestUseCase(guestRepo);

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
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

  const onSubmit = async () => {
    const guestData = {
      id_user: userId,
      id_event: id,
    };

    try {
      const response = await guestRepo.create(guestData);
      await fetchEvent();
    } catch (error) {
      console.error("Error al crear el invitado:", error);
    }
  };

  const fetchEvent = async () => {
    if (id) {
      try {
        const response = await getOneEventUseCase.run(id);
        setSelectedEvent(response.response);

        const locationCoords = response.response.location
          .split(",")
          .map((coord) => parseFloat(coord));
        fetchLocationName(locationCoords);
      } catch (error) {
        console.log(error);
      }
    }
  };

  const fetchGuest = async () => {
    if (id) {
      try {
        const response = await getGuestUseCase.run(id);
        setGuest(response.event);
      } catch (error) {
        console.log(error);
      }
    }
  };

  const fetchLocationName = async (coords) => {
    const [lat, lon] = coords;
    const response = await fetch(
      `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}`
    );
    const data = await response.json();
    setLocationName(data.display_name);
  };

  useEffect(() => {
    fetchEvent();
    fetchGuest();
  }, [id]);

  if (!selectedEvent) {
    return <div>No existe este evento, intenta seleccionando otro.</div>;
  }

  const locationCoords = selectedEvent.location
    .split(",")
    .map((coord) => parseFloat(coord));

  return (
    <Container>
      <ImageStyled>
        <img src={selectedEvent.image.secureUrl} alt={selectedEvent.title} />
        <h1>{selectedEvent.title}</h1>
      </ImageStyled>
      <Information>
        <h5>Información del evento 🎉</h5>
        <p>{selectedEvent.description}</p>
        <h1>Más información‼️</h1>
        <span>
          <FaCalendar size={20} color="#122088" />{" "}
          {formatDate(selectedEvent.date)}
        </span>
        <span>
          <FaClock size={20} color="#122088" /> {formatTime(selectedEvent.date)}
        </span>
        {/* <span>
          <HiMiniUsers size={22} color="#122088" /> {eventDetails.invitados}
        </span> */}
        <span>
          <AiFillDollarCircle size={22} color="#122088" /> ${selectedEvent.cost}
        </span>
        <span className="location">
          <MdLocationOn size={23} color="#122088" /> {locationName}
        </span>
        <Location position={locationCoords} />
        <ButtonsContainer>
          <ButtonPeople type="button" onClick={openModal}>
            <IoMdEye size={18} />
            Ver invitados
          </ButtonPeople>
          <div style={{display: "flex", gap: "12px"}}>
            <ButtonPeople onClick={onSubmit}>
              Editar
            </ButtonPeople>
            <ButtonPeople onClick={onSubmit}>
              Eliminar
            </ButtonPeople>
          </div>

          <Transition appear show={isOpen} as={Fragment}>
            <Dialog
              as="div"
              className="fixed inset-0 z-50 overflow-y-auto"
              onClose={closeModal}
            >
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <div className="fixed inset-0 bg-black/25" />
              </Transition.Child>

              <div className="fixed inset-0 overflow-y-auto">
                <div className="flex min-h-full items-center justify-center p-4 text-center">
                  <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0 scale-95"
                    enterTo="opacity-100 scale-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100 scale-100"
                    leaveTo="opacity-0 scale-95"
                  >
                    <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                      <Dialog.Title
                        as="h3"
                        className="text-lg font-medium leading-6 text-gray-900"
                      >
                        Personas registradas al evento
                      </Dialog.Title>
                      <div className="mt-2">
                        {/* Contenido */}
                        <ul>
                          {guest.length > 0 ? (
                            guest.map((person, index) => (
                              <li key={index}>{person.user.fullname}</li>
                            ))
                          ) : (
                            <li>No hay invitados registrados.</li>
                          )}
                        </ul>
                      </div>

                      <div className="mt-4 flex justify-end">
                        <button
                          type="button"
                          className="inline-flex justify-center rounded-lg border border-transparent bg-purple-100 px-8 py-2 text-sm font-medium text-purple-800 hover:bg-purple-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-500 focus-visible:ring-offset-2"
                          onClick={closeModal}
                        >
                          Salir
                        </button>
                      </div>
                    </Dialog.Panel>
                  </Transition.Child>
                </div>
              </div>
            </Dialog>
          </Transition>
        </ButtonsContainer>
      </Information>
    </Container>
  );
}

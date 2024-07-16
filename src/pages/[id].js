import { useRouter } from "next/router";
import React, { Fragment, useState } from "react";
import { event, members } from "../../constants";
import {
  ButtonPeople,
  ButtonsContainer,
  Container,
  ImageStyled,
  Information,
  Users,
} from "@/styles/Id.style";
import { AiFillDollarCircle } from "react-icons/ai";
import { MdLocationOn } from "react-icons/md";
import { HiMiniUsers } from "react-icons/hi2";
import { FaClock, FaHeart } from "react-icons/fa6";
import { FaCalendar } from "react-icons/fa";
import { Dialog, Transition } from "@headlessui/react";
import { IoMdEye } from "react-icons/io";

export default function IdEvent() {
  const router = useRouter();
  const { id } = router.query;
  const [isOpen, setIsOpen] = useState(false);
  const eventDetails = event.find((e) => e.slug === id);

  if (!eventDetails) {
    return <div>Evento no encontrado</div>;
  }

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  return (
    <Container>
      <ImageStyled>
        <img src={eventDetails.imagen} alt={eventDetails.nombre} />
        <h1>{eventDetails.nombre}</h1>
      </ImageStyled>
      <Information>
        <h5>Información del evento 🎉</h5>
        <p>{eventDetails.descripcion}</p>
        <h1>Más información‼️</h1>
        <span>
          <FaCalendar size={20} color="#5b0888" /> {eventDetails.fecha}
        </span>
        <span>
          <FaClock size={20} color="#5b0888" /> {eventDetails.hora}
        </span>
        {/* <span>
          <HiMiniUsers size={22} color="#5b0888" /> {eventDetails.invitados}
        </span> */}
        <span>
          <AiFillDollarCircle size={22} color="#5b0888" /> ${eventDetails.costo}
        </span>
        <span>
          <MdLocationOn size={23} color="#5b0888" /> {eventDetails.lugar}
        </span>
        <ButtonsContainer>
          <ButtonPeople type="button">
            <FaHeart size={14} />
            Confirmar asistencia  
          </ButtonPeople>
          <ButtonPeople type="button" onClick={openModal}>
            <IoMdEye size={18} />
            Ver invitados
          </ButtonPeople>

          <Transition appear show={isOpen} as={Fragment}>
            <Dialog
              as="div"
              className="fixed inset-0 z-10 overflow-y-auto"
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
                          {members.map((person, index) => (
                            <li>{person.name}</li>
                          ))}
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

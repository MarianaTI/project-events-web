import React from "react";
import { useState } from "react";
import { Dialog, DialogPanel } from "@headlessui/react";
import { FiMenu, FiX } from "react-icons/fi";
import styled from "@emotion/styled";
import { useRouter } from "next/router";
import Cookies from "js-cookie";

export const Logo = styled.span`
  color: var(--default);
  font-weight: 600;
  font-size: 14px;
`;

export const StyledLink = styled.a`
  color: var(--default);
  font-weight: 600;
  font-size: 14px;
  cursor: pointer;
  position: relative;
  border: none;
  background: none;
  transition-timing-function: cubic-bezier(0.25, 0.8, 0.25, 1);
  transition-duration: 400ms;
  transition-property: color;
  display: flex;
  align-items: center;
  :focus::after,
  :hover::after {
    width: 100%;
    left: 0%;
  }
  ::after {
    content: "";
    pointer-events: none;
    bottom: -1px;
    left: 50%;
    position: absolute;
    width: 0%;
    height: 2px;
    background-color: #122088;
    transition-timing-function: cubic-bezier(0.25, 0.8, 0.25, 1);
    transition-duration: 400ms;
    transition-property: width, left;
  }
`;

export const ButtonStyled = styled.button`
  background-color: var(--secondary-500);
  padding: 4px 12px;
  color: var(--neutral);
  border-radius: 10px;
`;

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const route = useRouter();

  const handleSignOut = () => {
    try {
      Cookies.remove("userToken");
      route.push("/");
    } catch (error) {
      console.error("Error signing out: ", error);
    }
  };

  return (
    <header className="bg-transparent">
      <nav
        aria-label="Global"
        className="mx-auto flex items-center justify-between p-4 lg:px-8"
      >
        <div className="flex lg:flex-1">
          <a
            href="#"
            className="-m-1.5 p-1.5 flex items-center justify-between gap-2"
          >
            <img
              alt="Your Company"
              src="/images/logo.png"
              className="h-8 w-auto"
            />
            <Logo>Evenfy</Logo>
          </a>
        </div>
        <div className="hidden lg:flex lg:gap-x-12">
          <StyledLink href="/home">Home</StyledLink>
          <StyledLink href="/date">Calendario</StyledLink>
          <StyledLink href="/user/event">Eventos</StyledLink>
          <ButtonStyled onClick={handleSignOut}>
            Salir <span aria-hidden="true">&rarr;</span>
          </ButtonStyled>
        </div>
        <div className="flex lg:hidden">
          <button
            type="button"
            onClick={() => setMobileMenuOpen(true)}
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
          >
            <span className="sr-only">Open main menu</span>
            <FiMenu aria-hidden="true" className="h-6 w-6" />
          </button>
        </div>
      </nav>
      <Dialog
        open={mobileMenuOpen}
        onClose={setMobileMenuOpen}
        className="lg:hidden"
      >
        <div className="fixed inset-0 z-10" />
        <DialogPanel className="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
          <div className="flex items-center justify-between">
            <a href="#" className="-m-1.5 p-1.5">
              <span className="sr-only">Evenfy</span>
              <img
                alt="Your Company"
                src="/images/logo.png"
                className="h-8 w-auto"
              />
            </a>
            <button
              type="button"
              onClick={() => setMobileMenuOpen(false)}
              className="-m-2.5 rounded-md p-2.5 text-gray-700"
            >
              <span className="sr-only">Close menu</span>
              <FiX aria-hidden="true" className="h-6 w-6" />
            </button>
          </div>
          <div className="mt-6 flow-root">
            <div className="-my-6 divide-y divide-gray-500/10">
              <div className="space-y-2 py-6">
                <a
                  href="/home"
                  className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                >
                  Home
                </a>
                <a
                  href="/date"
                  className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                >
                  Calendario
                </a>
                <a
                  href="/user/event"
                  className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                >
                  Eventos
                </a>
              </div>
              <div className="py-6" onClick={handleSignOut}>
                <a
                  href="#"
                  className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                >
                  Salir
                </a>
              </div>
            </div>
          </div>
        </DialogPanel>
      </Dialog>
    </header>
  );
};

export default Navbar;

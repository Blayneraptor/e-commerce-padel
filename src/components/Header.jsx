import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import logo from "../assets/logoblayne.svg";
import aboutusImg from "../assets/aboutus.png"; // Imagen de About Us

// Importa las imágenes para el dropdown
import iniciacionImg from "../assets/iniciacion.png";
import intermedioImg from "../assets/intermedio.png";
import avanzadoImg from "../assets/avanzado.png";
import controlImg from "../assets/control.png";
import potenciaImg from "../assets/potencia.png";

// Importa las imágenes para el submenu de MARCAS, incluyendo una imagen para el enlace principal
import babolatImg from "../assets/iniciacion.png";
import adidasImg from "../assets/intermedio.png";
import bullpadelImg from "../assets/avanzado.png";
import headImg from "../assets/control.png";
import noxImg from "../assets/potencia.png";
import marcasImg from "../assets/potencia.png"; // Imagen para el enlace MARCAS

function Header() {
  const location = useLocation();
  const isAbout = location.pathname === "/sobre-nosotros";
  const [navVisible, setNavVisible] = useState(false);

  useEffect(() => {
    if (
      location.pathname !== "/" ||
      sessionStorage.getItem("navShown") === "true"
    ) {
      setNavVisible(true);
    } else {
      const timer = setTimeout(() => {
        setNavVisible(true);
        sessionStorage.setItem("navShown", "true");
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [location.pathname]);

  return (
    <header className="relative h-screen overflow-x-hidden">
      {/* Contenedor de background */}
      <div
        className="absolute top-0 left-0 w-screen h-screen overflow-hidden z-10 flex items-center justify-center"
        style={{
          filter: "blur(0px)",
          opacity: 1,
          transform: "translate(0px, 0px)",
        }}
        data-zanim-xs='{"delay":0.4,"animation":"zoom-out"}'
      >
        {isAbout ? (
          <img
            className="block"
            src={aboutusImg}
            alt="Sobre Nosotros"
            style={{
              width: "100vw",
              height: "100vh",
              objectFit: "cover",
            }}
          />
        ) : (
          <iframe
            className="block"
            style={{
              width: "100vw",
              height: "100vh",
              transform: "scale(1.2)",
              transformOrigin: "50% 50%",
            }}
            src="https://www.youtube.com/embed/mPgQqRzhNrA?autoplay=1&disablekb=1&controls=0&modestbranding=1&loop=1&playlist=mPgQqRzhNrA&fs=0&enablejsapi=1&start=0&end=50&mute=1&showinfo=0&rel=0&playsinline=1&vq=hd2160"
            title="Wilson Padel Promo video"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          ></iframe>
        )}
      </div>

      {/* Navbar con transición */}
      <nav
        className={`fixed top-0 left-0 w-full z-20 px-4 py-1 flex justify-between items-center bg-black bg-opacity-20 backdrop-filter backdrop-blur-lg transition-opacity duration-1000 ${
          navVisible ? "opacity-100" : "opacity-0"
        }`}
      >
        <a className="text-3xl font-bold leading-none" href="/">
          <div className="flex items-center">
            <img className="h-10 mr-2" alt="logo" src={logo} />
            <span className="text-xl text-gray-800">Blayne</span>
          </div>
        </a>
        <div className="lg:hidden">
          <button className="navbar-burger flex items-center text-blue-600 p-3">
            <svg
              className="block h-4 w-4 fill-current"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <title>Mobile menu</title>
              <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"></path>
            </svg>
          </button>
        </div>
        <ul className="hidden absolute top-1/2 left-1/2 transform -translate-y-1/2 -translate-x-1/2 lg:flex lg:mx-auto lg:items-center lg:w-auto lg:space-x-6">
          <li>
            <a
              className="text-sm text-gray-200 hover:text-gray-500 font-bold"
              href="/"
            >
              Inicio
            </a>
          </li>
          <li className="text-gray-300">
            {/* Separador */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              stroke="currentColor"
              className="w-4 h-4 current-fill"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 5v0m0 7v0m0 7v0"
              />
            </svg>
          </li>
          <li>
            <a
              className="text-sm text-gray-200 font-bold"
              href="/sobre-nosotros"
            >
              Sobre nosotros
            </a>
          </li>
          <li className="text-gray-300">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              stroke="currentColor"
              className="w-4 h-4 current-fill"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 5v0m0 7v0m0 7v0"
              />
            </svg>
          </li>
          {/* Menú de Palas de padel con dropdown */}
          <li className="relative group">
            <a
              className="text-sm text-gray-200 hover:text-gray-500 font-bold"
              href="/palas-de-padel"
            >
              Palas de padel
            </a>
            {/* Dropdown de primer nivel con menús más grandes y con imágenes */}
            <ul className="absolute left-0 mt-2 w-72 bg-black bg-opacity-50 rounded-md shadow-lg py-6 opacity-0 invisible group-hover:visible group-hover:opacity-100 transition-all duration-300">
              <li>
                <a
                  href="/palas-de-padel/iniciacion"
                  className="flex items-center gap-4 px-8 py-4 text-xl text-gray-200 hover:text-gray-500 hover:bg-gray-800 transition-colors duration-300"
                >
                  <img
                    src={iniciacionImg}
                    alt="Iniciacion"
                    className="w-10 h-10"
                  />
                  <span className="flex-1 text-center">INICIACION</span>
                </a>
              </li>
              <li>
                <a
                  href="/palas-de-padel/intermedio"
                  className="flex items-center gap-4 px-8 py-4 text-xl text-gray-200 hover:text-gray-500 hover:bg-gray-800 transition-colors duration-300"
                >
                  <img
                    src={intermedioImg}
                    alt="Intermedio"
                    className="w-10 h-10"
                  />
                  <span className="flex-1 text-center">INTERMEDIO</span>
                </a>
              </li>
              <li>
                <a
                  href="/palas-de-padel/avanzado"
                  className="flex items-center gap-4 px-8 py-4 text-xl text-gray-200 hover:text-gray-500 hover:bg-gray-800 transition-colors duration-300"
                >
                  <img src={avanzadoImg} alt="Avanzado" className="w-10 h-10" />
                  <span className="flex-1 text-center">AVANZADO</span>
                </a>
              </li>
              <li>
                <a
                  href="/palas-de-padel/control"
                  className="flex items-center gap-4 px-8 py-4 text-xl text-gray-200 hover:text-gray-500 hover:bg-gray-800 transition-colors duration-300"
                >
                  <img src={controlImg} alt="Control" className="w-10 h-10" />
                  <span className="flex-1 text-center">CONTROL</span>
                </a>
              </li>
              <li>
                <a
                  href="/palas-de-padel/potencia"
                  className="flex items-center gap-4 px-8 py-4 text-xl text-gray-200 hover:text-gray-500 hover:bg-gray-800 transition-colors duration-300"
                >
                  <img src={potenciaImg} alt="Potencia" className="w-10 h-10" />
                  <span className="flex-1 text-center">POTENCIA</span>
                </a>
              </li>
              {/* Submenu de MARCAS */}
              <li className="relative">
                <a
                  href="/palas-de-padel/marcas"
                  className="flex items-center gap-4 px-8 py-4 text-xl text-gray-200 hover:text-gray-500 hover:bg-gray-800 transition-colors duration-300"
                >
                  <img src={marcasImg} alt="Marcas" className="w-10 h-10" />
                  <span className="flex-1 text-center">MARCAS</span>
                </a>
                <ul className="absolute left-full top-4 w-56 bg-black bg-opacity-50 rounded-md shadow-lg py-4 opacity-0 invisible group-hover:visible group-hover:opacity-100 transform scale-95 group-hover:scale-100 transition-all duration-300 ease-in-out">
                  <li>
                    <a
                      href="/palas-de-padel/marcas/babolat"
                      className="flex items-center gap-2 px-4 py-2 text-lg text-gray-200 hover:text-gray-500 hover:bg-gray-800 transition-colors duration-300"
                    >
                      <img src={babolatImg} alt="Babolat" className="w-8 h-8" />
                      BABOLAT
                    </a>
                  </li>
                  <li>
                    <a
                      href="/palas-de-padel/marcas/adidas"
                      className="flex items-center gap-2 px-4 py-2 text-lg text-gray-200 hover:text-gray-500 hover:bg-gray-800 transition-colors duration-300"
                    >
                      <img src={adidasImg} alt="Adidas" className="w-8 h-8" />
                      ADIDAS
                    </a>
                  </li>
                  <li>
                    <a
                      href="/palas-de-padel/marcas/bullpadel"
                      className="flex items-center gap-2 px-4 py-2 text-lg text-gray-200 hover:text-gray-500 hover:bg-gray-800 transition-colors duration-300"
                    >
                      <img
                        src={bullpadelImg}
                        alt="Bullpadel"
                        className="w-8 h-8"
                      />
                      BULLPADEL
                    </a>
                  </li>
                  <li>
                    <a
                      href="/palas-de-padel/marcas/head"
                      className="flex items-center gap-2 px-4 py-2 text-lg text-gray-200 hover:text-gray-500 hover:bg-gray-800 transition-colors duration-300"
                    >
                      <img src={headImg} alt="Head" className="w-8 h-8" />
                      HEAD
                    </a>
                  </li>
                  <li>
                    <a
                      href="/palas-de-padel/marcas/nox"
                      className="flex items-center gap-2 px-4 py-2 text-lg text-gray-200 hover:text-gray-500 hover:bg-gray-800 transition-colors duration-300"
                    >
                      <img src={noxImg} alt="Nox" className="w-8 h-8" />
                      NOX
                    </a>
                  </li>
                </ul>
              </li>
            </ul>
          </li>
          <li className="text-gray-300">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              stroke="currentColor"
              className="w-4 h-4 current-fill"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 5v0m0 7v0m0 7v0"
              />
            </svg>
          </li>
          <li>
            <a
              className="text-sm text-gray-200 hover:text-gray-500 font-bold"
              href="/accesorios"
            >
              Accesorios
            </a>
          </li>
          <li className="text-gray-300">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              stroke="currentColor"
              className="w-4 h-4 current-fill"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 5v0m0 7v0m0 7v0"
              />
            </svg>
          </li>
          <li>
            <a
              className="text-sm text-gray-200 hover:text-gray-500 font-bold"
              href="#"
            >
              Carrito
            </a>
          </li>
        </ul>
        <a
          className="hidden lg:inline-block lg:ml-auto lg:mr-3 py-2 px-6 text-sm font-bold text-gray-100 font-mono rounded-md transition-all duration-150 ease-in-out hover:scale-125 active:scale-95"
          href="#"
        >
          Accede
        </a>
        <a
          className="hidden lg:inline-block py-2 px-6 text-sm font-bold text-white font-mono rounded-md transition-all duration-150 ease-in-out hover:scale-125 active:scale-95"
          href="#"
        >
          Regístrate
        </a>
      </nav>
    </header>
  );
}

export default Header;

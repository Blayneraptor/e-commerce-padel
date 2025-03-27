import React, { useState, useEffect } from "react";
import logo from "../assets/logoblayne.svg"; // Importar el logo desde assets

function Header() {
  const [navVisible, setNavVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setNavVisible(true);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);
  

  return (
    <header className="relative h-screen overflow-x-hidden">
      {/* Contenedor del video en posición absoluta centrado */}
      <div
        className="absolute top-0 left-0 w-screen h-screen overflow-hidden z-10 flex items-center justify-center"
        style={{
          filter: "blur(0px)",
          opacity: 1,
          transform: "translate(0px, 0px)"
        }}
        data-zanim-xs='{"delay":0.4,"animation":"zoom-out"}'
      >
        <iframe
          className="block"
          style={{
            width: "100vw", // Ocupa exactamente el ancho del viewport
            height: "100vh", // Altura completa de la ventana
            transform: "scale(1.2)", // Zoom 1.2
            transformOrigin: "50% 50%"
          }}
          src="https://www.youtube.com/embed/mPgQqRzhNrA?autoplay=1&disablekb=1&controls=0&modestbranding=1&loop=1&playlist=mPgQqRzhNrA&fs=0&enablejsapi=1&start=0&end=50&mute=1&showinfo=0&rel=0&playsinline=1&vq=hd2160"
          title="Wilson Padel Promo video"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
        ></iframe>
      </div>

      {/* Navbar con efecto blur fijo y animación de aparición */}
      <nav
        className={`fixed top-0 left-0 w-full z-20 px-4 py-1 flex justify-between items-center bg-black bg-opacity-20 backdrop-filter backdrop-blur-lg transition-opacity duration-1000 ${
          navVisible ? "opacity-100" : "opacity-0"
        }`}
      >
        <a className="text-3xl font-bold leading-none" href="#">
          <div className="text-3xl font-bold leading-none flex items-center">
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
            <a className="text-sm text-gray-200 hover:text-gray-500 font-bold" href="#">
              Inicio
            </a>
          </li>
          <li className="text-gray-300">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" className="w-4 h-4 current-fill" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 5v0m0 7v0m0 7v0m0-13a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"/>
            </svg>
          </li>
          <li>
            <a className="text-sm text-gray-200 font-bold" href="#">
              Sobre nosotros
            </a>
          </li>
          <li className="text-gray-300">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" className="w-4 h-4 current-fill" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 5v0m0 7v0m0 7v0m0-13a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"/>
            </svg>
          </li>
          <li>
            <a className="text-sm text-gray-200 hover:text-gray-500 font-bold" href="#productos">
              Palas de padel
            </a>
          </li>
          <li className="text-gray-300">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" className="w-4 h-4 current-fill" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 5v0m0 7v0m0 7v0m0-13a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"/>
            </svg>
          </li>
          <li>
            <a className="text-sm text-gray-200 hover:text-gray-500 font-bold" href="#">
              Pricing
            </a>
          </li>
          <li className="text-gray-300">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" className="w-4 h-4 current-fill" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 5v0m0 7v0m0 7v0m0-13a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"/>
            </svg>
          </li>
          <li>
            <a className="text-sm text-gray-200 hover:text-gray-500 font-bold" href="#">
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
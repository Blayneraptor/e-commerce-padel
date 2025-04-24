import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import logo from "../assets/logopadel.svg";
import aboutusImg from "../assets/aboutus.png";
import pala from "../assets/pala.png";
import { useCart } from "../contexts/CartContext"; // Importamos el contexto del carrito

// Importa las imágenes para el dropdown
import iniciacionImg from "../assets/iniciacion.png";
import intermedioImg from "../assets/intermedio.png";
import avanzadoImg from "../assets/avanzado.png";
import controlImg from "../assets/control.png";
import potenciaImg from "../assets/potencia.png";
import marcasImg from "../assets/potencia.png";
import accesorioImg from "../assets/accesorios.png";

import productos from "../data/productos.json";

function Header() {
  const location = useLocation();
  const navigate = useNavigate();
  const isAbout = location.pathname === "/sobre-nosotros";
  const isHome = location.pathname === "/";
  const [navVisible, setNavVisible] = useState(false);
  const [welcomeVisible, setWelcomeVisible] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState("login");

  // Obtener datos del carrito
  const { getCartItemCount, toggleCart } = useCart();
  const cartItemCount = getCartItemCount();
  const [cartBadgeAnimate, setCartBadgeAnimate] = useState(false);

  // Efecto para animar el badge cuando cambia la cantidad de items
  useEffect(() => {
    if (cartItemCount > 0) {
      setCartBadgeAnimate(true);
      const timer = setTimeout(() => setCartBadgeAnimate(false), 500);
      return () => clearTimeout(timer);
    }
  }, [cartItemCount]);

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

  // Efecto para la animación de fade-in del mensaje de bienvenida
  useEffect(() => {
    if (isHome) {
      const welcomeTimer = setTimeout(() => {
        setWelcomeVisible(true);
      }, 1000); // Retraso de 1 segundo para que aparezca después de cargar la página
      return () => clearTimeout(welcomeTimer);
    }
  }, [isHome]);

  // Define mapping between menu labels and product.tipo values
  const tipoMap = {
    Iniciación: "Principiante",
    Intermedio: "Equilibrada",
    Avanzado: "Ofensiva",
    Control: "Defensiva",
    Potencia: "Potencia",
    Marcas: null, // no tipo filter for brands
  };

  const tipoMapAcc = {
    Pelotas: "Pelotas",
    Overgrip: "Overgrip",
    Bolsas: "Bolsas",
    Protector: "Protector",
    Muñequeras: "Muñequeras",
    Camisetas: "Ropa",
  };

  // Lista de marcas únicas para submenu
  const marcas = Array.from(new Set(productos.map((p) => p.marca)));

  return (
    <header
      className={`relative ${isHome ? "h-screen" : "h-auto"} overflow-x-hidden`}
    >
      {modalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center"
          onClick={() => setModalOpen(false)}
        >
          <div className="absolute inset-0 bg-black bg-opacity-70 transition-opacity duration-300"></div>
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-white rounded-lg shadow-xl z-10 w-11/12 max-w-md p-6 transform transition-all duration-500"
          >
            <button
              onClick={() => setModalOpen(false)}
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-800 transition-colors"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
            <h2 className="text-2xl font-bold mb-4">
              {modalMode === "login" ? "Accede a tu cuenta" : "Regístrate"}
            </h2>
            <form className="flex flex-col space-y-4">
              {modalMode === "register" && (
                <input
                  type="text"
                  placeholder="Nombre"
                  className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                />
              )}
              <input
                type="email"
                placeholder="Correo electrónico"
                className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              />
              <input
                type="password"
                placeholder="Contraseña"
                className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              />
              <button
                type="submit"
                className="bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg transition-colors duration-300"
              >
                {modalMode === "login" ? "Acceder" : "Registrarme"}
              </button>
            </form>
            <div className="mt-4 text-sm text-center">
              {modalMode === "login" ? (
                <span>
                  ¿No tienes una cuenta?{" "}
                  <button
                    onClick={() => setModalMode("register")}
                    className="text-blue-600 hover:underline"
                  >
                    Regístrate
                  </button>
                </span>
              ) : (
                <span>
                  ¿Ya tienes cuenta?{" "}
                  <button
                    onClick={() => setModalMode("login")}
                    className="text-blue-600 hover:underline"
                  >
                    Inicia sesión
                  </button>
                </span>
              )}
            </div>
          </div>
        </div>
      )}
      {/* Contenedor de background con overlay para evitar clics - Solo mostrar en la página de inicio */}
      {isHome && (
        <div
          className="absolute top-0 left-0 w-screen h-screen overflow-hidden z-10 flex items-center justify-center"
          style={{
            filter: "blur(0px)",
            opacity: 1,
            transform: "translate(0px, 0px)",
          }}
          data-zanim-xs='{"delay":0.4,"animation":"zoom-out"}'
        >
          <div className="relative w-full h-full">
            <iframe
               className="block scale-[2] sm:scale-[1.5] -translate-y-36 sm:translate-y-0"

               style={{
                 width: "100vw",
                 height: "100vh",
                 transformOrigin: "50% 50%",
               }}
              src="https://www.youtube.com/embed/YpaKFnYQ0Y4?start=0&end=32&loop=1&playlist=YpaKFnYQ0Y4&autoplay=1&disablekb=1&controls=0&modestbranding=1&loop=1&playlist=YpaKFnYQ0Y4&fs=0&enablejsapi=1&start=0&end=50&mute=1&showinfo=0&rel=0&playsinline=1&vq=hd2160&hd=1&iv_load_policy=3&high_quality=1"
              title="Smash Padel  - Cinematic Video"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
              loading="eager"
            ></iframe>

            {/* Overlay transparente para bloquear cualquier interacción con el video */}
            <div
              className="absolute inset-0 z-10 cursor-default"
              onClick={(e) => e.preventDefault()}
              onContextMenu={(e) => e.preventDefault()}
              aria-hidden="true"
            ></div>

            {/* Mensaje de bienvenida en la parte inferior del video con fondo semitransparente y animación fade-in-up */}
            <div
              className={`absolute bottom-0 left-0 w-full z-20 transition-all duration-1000 ease-out transform ${
                welcomeVisible
                  ? "translate-y-0 opacity-100"
                  : "translate-y-16 opacity-0"
              }`}
            >
              <div className="bg-black bg-opacity-50 backdrop-filter backdrop-blur-sm p-8 md:p-10">
                <div className="container mx-auto">
                  <div className="flex flex-col md:flex-row items-center md:justify-between">
                    <div className="mb-6 md:mb-0 md:mr-8">
                      <h1 className="text-4xl md:text-5xl font-bold text-white mb-3">
                        Bienvenido al mundo del pádel
                      </h1>
                      <p className="text-lg text-gray-100 max-w-2xl">
                        Descubre nuestra selección de palas y accesorios premium
                        para llevar tu juego al siguiente nivel.
                      </p>
                    </div>
                    <div className="flex flex-col sm:flex-row gap-4">
                      <Link
                        to="/palas-de-padel"
                        onClick={(e) => {
                          e.preventDefault();
                          navigate("/palas-de-padel");
                          window.scrollTo({ top: 0, behavior: "smooth" });
                        }}
                        className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-lg transition duration-300"
                      >
                        Ver palas
                      </Link>
                      <Link
                        to="/accesorios"
                        onClick={(e) => {
                          e.preventDefault();
                          navigate("/accesorios");
                          window.scrollTo({ top: 0, behavior: "smooth" });
                        }}
                        className="bg-transparent border border-white text-white font-medium py-2 px-6 rounded-lg hover:bg-white hover:bg-opacity-10 transition duration-300"
                      >
                        Ver accesorios
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Navbar con transición - Versión modernizada */}
      <nav
        className={`fixed top-0 left-0 w-full z-30 px-6 py-3 flex justify-between items-center bg-black bg-opacity-75 backdrop-filter backdrop-blur-lg transition-all duration-700 ${
          navVisible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4"
        }`}
      >
        <a className="text-3xl font-bold leading-none group" href="/">
          <div className="flex items-center">
            <img
              className="h-12 mr-3 transition-transform duration-300 group-hover:rotate-6"
              alt="logo"
              src={logo}
            />
            <span className="text-2xl text-white font-semibold tracking-wider transition-all duration-300 group-hover:text-gray-300">
              Blayne
            </span>
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
        <ul className="hidden absolute top-1/2 left-1/2 transform -translate-y-1/2 -translate-x-1/2 lg:flex lg:mx-auto lg:items-center lg:w-auto lg:space-x-8">
          <li>
            <a
              className="text-sm text-gray-200 hover:text-white font-bold relative after:absolute after:bottom-[-5px] after:left-0 after:bg-white after:h-0.5 after:w-0 hover:after:w-full after:transition-all after:duration-300"
              href="/"
            >
              Inicio
            </a>
          </li>
          <li className="text-gray-500 opacity-50">•</li>
          <li>
            <a
              className="text-sm text-gray-200 hover:text-white font-bold relative after:absolute after:bottom-[-5px] after:left-0 after:bg-white after:h-0.5 after:w-0 hover:after:w-full after:transition-all after:duration-300"
              href="/sobre-nosotros"
            >
              Sobre nosotros
            </a>
          </li>
          <li className="text-gray-500 opacity-50">•</li>

          {/* Menú de Palas de padel con dropdown modernizado */}
          <li className="relative group">
            <a
              className="text-sm text-gray-200 hover:text-white font-bold flex items-center relative after:absolute after:bottom-[-5px] after:left-0 after:bg-white after:h-0.5 after:w-0 group-hover:after:w-full after:transition-all after:duration-300"
              href="/palas-de-padel"
            >
              Palas de padel
              <svg
                className="w-4 h-4 ml-1 transition-transform duration-300 group-hover:rotate-180"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M19 9l-7 7-7-7"
                ></path>
              </svg>
            </a>
            {/* Dropdown modernizado con animaciones mejoradas */}
            <div className="absolute left-1/2 transform -translate-x-1/2 pt-5 w-auto opacity-0 invisible group-hover:visible group-hover:opacity-100 transition-all duration-300 origin-top scale-95 group-hover:scale-100">
              <div className="bg-gradient-to-br from-gray-900 to-black p-2 rounded-xl shadow-xl border border-gray-700 backdrop-blur-lg">
                <ul className="flex justify-center space-x-3 p-3">
                  {[
                    { name: "Iniciación", img: iniciacionImg },
                    { name: "Intermedio", img: intermedioImg },
                    { name: "Avanzado", img: avanzadoImg },
                    { name: "Control", img: controlImg },
                    { name: "Potencia", img: potenciaImg },
                    { name: "Marcas", img: marcasImg },
                  ].map((item, index) =>
                    item.name === "Marcas" ? (
                      <li
                        key={item.name}
                        className="relative group transition-transform duration-500 hover:-translate-y-1"
                        style={{ animationDelay: `${index * 50}ms` }}
                      >
                        <div className="flex flex-col items-center gap-2 px-5 py-3 rounded-lg hover:bg-white/10 transition-all duration-300 cursor-pointer">
                          <div className="relative">
                            <div className="w-14 h-14 rounded-full overflow-hidden bg-gradient-to-br from-gray-800 to-gray-900 p-1">
                              <img
                                src={marcasImg}
                                alt="Marcas"
                                className="w-full h-full rounded-full object-cover transition-transform duration-500 group-hover:scale-110"
                              />
                            </div>
                            <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-blue-500 to-purple-600 opacity-0 group-hover:opacity-30 blur-md transition-opacity duration-300"></div>
                          </div>
                          <span className="font-medium text-gray-200 group-hover:text-white transition-colors duration-300">
                            {item.name}
                          </span>
                          <svg
                            className="w-4 h-4 ml-1 transition-transform duration-300 group-hover:rotate-90"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M9 5l7 7-7 7"
                            />
                          </svg>
                        </div>
                        <div className="absolute left-full top-32 transform -translate-y-1/2 ml-2 w-40 bg-gradient-to-br from-gray-900 to-black p-3 rounded-xl shadow-xl border border-gray-700 backdrop-blur-lg invisible opacity-0 group-hover:visible group-hover:opacity-100 transition-all duration-300">
                          <ul className="space-y-2">
                            {marcas.map((marca) => (
                              <li
                                key={marca}
                                className="hover:translate-x-2 transition-transform duration-300"
                              >
                                <Link
                                  to={`/palas-de-padel?marca=${encodeURIComponent(
                                    marca
                                  )}`}
                                  className="text-gray-200 hover:text-white block"
                                >
                                  {marca}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </li>
                    ) : (
                      <li
                        key={item.name}
                        className="group/item relative transition-transform duration-500 hover:-translate-y-1"
                        style={{ animationDelay: `${index * 50}ms` }}
                      >
                        <Link
                          to={`/palas-de-padel?tipo=${tipoMap[item.name]}`}
                          className="flex flex-col items-center gap-2 px-5 py-3 rounded-lg hover:bg-white/10 transition-all duration-300"
                        >
                          <div className="relative">
                            <div className="w-14 h-14 rounded-full overflow-hidden bg-gradient-to-br from-gray-800 to-gray-900 p-1">
                              <img
                                src={item.img}
                                alt={item.name}
                                className="w-full h-full rounded-full object-cover transition-transform duration-500 group-hover/item:scale-110"
                              />
                            </div>
                            <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-blue-500 to-purple-600 opacity-0 group-hover/item:opacity-30 blur-md transition-opacity duration-300"></div>
                          </div>
                          <span className="font-medium text-gray-200 group-hover/item:text-white transition-colors duration-300">
                            {item.name}
                          </span>
                        </Link>
                      </li>
                    )
                  )}
                </ul>
              </div>
              <div className="absolute top-4 left-1/2 transform -translate-x-1/2 -translate-y-full w-4 h-4 rotate-45 bg-gray-900 border-t border-l border-gray-700"></div>
            </div>
          </li>

          <li className="text-gray-500 opacity-50">•</li>

          {/* Menú de Accesorios with link scroll fix */}
          <li className="relative group">
            <Link
              to="/accesorios"
              onClick={(e) => {
                e.preventDefault();
                navigate("/accesorios");
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
              className="text-sm text-gray-200 hover:text-white font-bold flex items-center relative after:absolute after:bottom-[-5px] after:left-0 after:bg-white after:h-0.5 after:w-0 hover:after:w-full after:transition-all after:duration-300"
            >
              Accesorios
              <svg
                className="w-4 h-4 ml-1 transition-transform duration-300 group-hover:rotate-180"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M19 9l-7 7-7-7"
                ></path>
              </svg>
            </Link>
            {/* Dropdown modernizado con animaciones mejoradas */}
            <div className="absolute left-1/2 transform -translate-x-1/2 pt-5 w-[380px] opacity-0 invisible group-hover:visible group-hover:opacity-100 transition-all duration-300 origin-top scale-95 group-hover:scale-100">
              <div className="bg-gradient-to-br from-gray-900 to-black p-3 rounded-xl shadow-xl border border-gray-700 backdrop-blur-lg">
                <div className="grid grid-cols-3 gap-3">
                  {[
                    "Pelotas",
                    "Overgrip",
                    "Bolsas",
                    "Protector",
                    "Muñequeras",
                    "Camisetas",
                  ].map((name, index) => (
                    <button
                      key={name}
                      onClick={(e) => {
                        e.preventDefault();
                        const query = `?tipo=${tipoMapAcc[name]}`;
                        // Always navigate to filter, even if same, to ensure scroll handling
                        navigate(`/accesorios${query}`);
                        // Scroll to the products list
                        const el = document.getElementById("productos-lista");
                        if (el) el.scrollIntoView({ behavior: "smooth" });
                      }}
                      className="group/item flex flex-col items-center gap-2 px-3 py-2 rounded-lg hover:bg-white/10 transition-all duration-300"
                    >
                      <div className="relative">
                        <div className="w-12 h-12 rounded-full overflow-hidden bg-gradient-to-br from-gray-800 to-gray-900 p-1">
                          <img
                            src={accesorioImg}
                            alt={name}
                            className="w-full h-full rounded-full object-cover transition-transform duration-500 group-hover/item:scale-110"
                          />
                        </div>
                        <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-green-500 to-teal-600 opacity-0 group-hover/item:opacity-30 blur-md transition-opacity duration-300"></div>
                      </div>
                      <span className="mt-1 text-sm font-medium text-gray-200 group-hover/item:text-white transition-colors duration-300">
                        {name}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
              <div className="absolute top-4 left-1/2 transform -translate-x-1/2 -translate-y-full w-4 h-4 rotate-45 bg-gray-900 border-t border-l border-gray-700"></div>
            </div>
          </li>

          <li className="text-gray-500 opacity-50">•</li>
          <li className="relative">
            {/* Enlace al carrito con contador de productos */}
            <Link
              to="/carrito"
              className="text-sm text-gray-200 hover:text-white font-bold relative flex items-center after:absolute after:bottom-[-5px] after:left-0 after:bg-white after:h-0.5 after:w-0 hover:after:w-full after:transition-all after:duration-300 group"
              onClick={(e) => {
                e.preventDefault();
                toggleCart();
              }}
            >
              <div className="relative">
                Carrito
                {/* Badge con contador de productos */}
                {cartItemCount > 0 && (
                  <span
                    className={`absolute -top-3 -right-6 flex items-center justify-center w-5 h-5 text-xs font-bold text-white bg-blue-600 rounded-full transition-all duration-300 ${
                      cartBadgeAnimate ? "animate-ping-once scale-125" : ""
                    }`}
                  >
                    {cartItemCount}
                  </span>
                )}
              </div>
            </Link>
          </li>
        </ul>
        <div className="hidden lg:flex lg:items-center space-x-4">
          <button
            type="button"
            onClick={() => {
              setModalMode("login");
              setModalOpen(true);
            }}
            className="py-2 px-4 text-sm font-medium text-white bg-transparent border border-white/30 rounded-lg transition-all duration-300 hover:bg-white hover:text-black hover:border-white"
          >
            Accede
          </button>
          <button
            type="button"
            onClick={() => {
              setModalMode("register");
              setModalOpen(true);
            }}
            className="py-2 px-4 text-sm font-medium text-black bg-white rounded-lg transition-all duration-300 hover:bg-opacity-80 hover:shadow-glow"
          >
            Regístrate
          </button>
        </div>
      </nav>
    </header>
  );
}

export default Header;

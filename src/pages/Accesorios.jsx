import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import accesorios from "../data/accesorios.json";
import accesoriospadel from "../assets/accesoriospadel.png";
import flechaIcon from '../assets/flecha.png';
import useInView from "../hooks/useInView";

// Componente con animación al aparecer en el viewport
const AnimateOnScroll = ({ children, animation = "fade-up", delay = 0, duration = 800, className = "", ...props }) => {
  const [ref, isVisible] = useInView({ threshold: 0.1 });
  
  const animations = {
    'fade-up': 'opacity-0 translate-y-10',
    'fade-down': 'opacity-0 -translate-y-10',
    'fade-left': 'opacity-0 translate-x-10',
    'fade-right': 'opacity-0 -translate-x-10',
    'zoom-in': 'opacity-0 scale-95',
    'zoom-out': 'opacity-0 scale-105',
  };

  return (
    <div
      ref={ref}
      className={`transition-all transform ${className} ${isVisible ? 'opacity-100 translate-x-0 translate-y-0 scale-100' : animations[animation]}`}
      style={{ 
        transitionDuration: `${duration}ms`,
        transitionDelay: `${delay}ms`,
      }}
      {...props}
    >
      {children}
    </div>
  );
};

const Accesorios = () => {
  const location = useLocation();

  // Estados para filtros y búsqueda
  const [filtroTipo, setFiltroTipo] = useState("Todos");
  const [ordenPrecio, setOrdenPrecio] = useState("desc");
  const [busqueda, setBusqueda] = useState("");
  const [paginaActual, setPaginaActual] = useState(1);
  const [accesoriosVisibles, setAccesoriosVisibles] = useState([]);
  const [bannerVisible, setBannerVisible] = useState(false);
  
  const accesoriosPorPagina = 20;
  const totalPaginas = Math.ceil(accesorios.length / accesoriosPorPagina);

  // Efecto para la animación del banner
  useEffect(() => {
    const timer = setTimeout(() => {
      setBannerVisible(true);
    }, 300);
    return () => clearTimeout(timer);
  }, []);

  // Leer parámetro tipo de la URL y aplicar filtro
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const tipoParam = params.get('tipo');
    if (tipoParam) {
      setFiltroTipo(tipoParam);
      setPaginaActual(1);
    }
  }, [location.search]);

  // Filtra los accesorios según el tipo y la búsqueda
  const filtrarAccesorios = () => {
    let filtrados = accesorios.filter((accesorio) => {
      const tipoCondicion =
        filtroTipo === "Todos" || accesorio.tipo === filtroTipo;
      const busquedaCondicion = accesorio.nombre
        .toLowerCase()
        .includes(busqueda.toLowerCase());
      return tipoCondicion && busquedaCondicion;
    });
    
    // Ordena según el precio
    filtrados.sort((a, b) =>
      ordenPrecio === "asc" ? a.precio - b.precio : b.precio - a.precio
    );
    
    return filtrados;
  };

  // Actualizar accesorios visibles cuando cambian los filtros o la página
  useEffect(() => {
    const accesoriosFiltered = filtrarAccesorios();
    const inicio = (paginaActual - 1) * accesoriosPorPagina;
    const fin = inicio + accesoriosPorPagina;
    setAccesoriosVisibles(accesoriosFiltered.slice(inicio, fin));
  }, [filtroTipo, ordenPrecio, busqueda, paginaActual]);

  // Función para cambiar de página
  const cambiarPagina = (nuevaPagina) => {
    setPaginaActual(nuevaPagina);
    // Scroll al inicio de los productos
    document.getElementById("productos-lista").scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* Banner hero similar al de AboutUs */}
      <div className="relative h-screen w-full flex items-center justify-center">
        <img 
          src={accesoriospadel} 
          alt="Accesorios de Pádel" 
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ease-in-out ${bannerVisible ? 'opacity-100' : 'opacity-80'}`}
        />
        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div 
            className={`text-center text-white transition-all duration-1000 transform ${
              bannerVisible ? 'translate-y-0 opacity-100' : 'translate-y-16 opacity-0'
            }`}
          >
            <h1 className="text-5xl font-bold mb-6 tracking-wide">Accesorios de Pádel</h1>
            <p className="text-xl max-w-2xl mx-auto mb-12">Complementa tu juego con los mejores accesorios para pádel de las marcas más reconocidas.</p>
            
            {/* Flecha animada hacia abajo */}
            <div 
              className="cursor-pointer animate-bounce mx-auto"
              onClick={() => document.getElementById("productos").scrollIntoView({ behavior: "smooth" })}
            >
              <svg 
                className="w-10 h-10 text-white opacity-80 hover:opacity-100 transition-opacity" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24" 
                xmlns="http://www.w3.org/2000/svg"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth="2" 
                  d="M19 14l-7 7m0 0l-7-7m7 7V3"
                >
                </path>
              </svg>
            </div>
          </div>
        </div>
      </div>

      <div id="productos" className="container mx-auto p-8 md:p-12 bg-gray-50 flex-grow">
        <AnimateOnScroll animation="fade-up" duration={1000}>
          <div className="flex flex-col md:flex-row justify-between items-center mb-10 space-y-4 md:space-y-0">
            <div>
              <h2 className="text-3xl font-bold text-gray-800">Explora Nuestros Accesorios</h2>
              <div className="w-24 h-1 bg-blue-600 mt-2"></div>
            </div>

            {/* Filtros y búsqueda con diseño mejorado */}
            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative">
                <select
                  value={filtroTipo}
                  onChange={(e) => {
                    setFiltroTipo(e.target.value);
                    setPaginaActual(1);
                  }}
                  className="appearance-none bg-white pl-4 pr-10 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-700"
                >
                  <option value="Todos">Todos los tipos</option>
                  <option value="Pelotas">Pelotas</option>
                  <option value="Overgrip">Overgrip</option>
                  <option value="Bolsas">Bolsas</option>
                  <option value="Protector">Protector</option>
                  <option value="Muñequeras">Muñequeras</option>
                  <option value="Ropa">Camisetas</option>
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                  <svg className="w-5 h-5 text-gray-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 011.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd"></path>
                  </svg>
                </div>
              </div>
              
              <div className="relative">
                <select
                  value={ordenPrecio}
                  onChange={(e) => setOrdenPrecio(e.target.value)}
                  className="appearance-none bg-white pl-4 pr-10 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-700"
                >
                  <option value="desc">Precio: Mayor a Menor</option>
                  <option value="asc">Precio: Menor a Mayor</option>
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                  <svg className="w-5 h-5 text-gray-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 011.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd"></path>
                  </svg>
                </div>
              </div>
              
              <div className="relative">
                <input
                  type="text"
                  placeholder="Buscar accesorio..."
                  value={busqueda}
                  onChange={(e) => {
                    setBusqueda(e.target.value);
                    setPaginaActual(1);
                  }}
                  className="pl-4 pr-10 py-2 w-full border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-700"
                />
                <div className="absolute inset-y-0 right-0 flex items-center px-3">
                  <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </AnimateOnScroll>

        {/* Lista de accesorios con animaciones */}
        <div id="productos-lista" className="mx-auto py-8 px-4 sm:px-6 w-full max-w-7xl bg-white rounded-xl shadow-sm">
          <div className="mx-auto">
            {/* Resultados encontrados */}
            <AnimateOnScroll animation="fade-up" className="mb-6 text-sm text-gray-500">
              {filtrarAccesorios().length} resultados encontrados
            </AnimateOnScroll>
            
            {/* Grid de accesorios */}
            <div className="mt-6">
              <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8">
                {accesoriosVisibles.map((accesorio, index) => (
                  <AnimateOnScroll 
                    key={`${accesorio.id}-${index}`} 
                    animation="zoom-in" 
                    delay={index % 4 * 100}
                    className="group relative"
                  >
                    <Link 
                      to={`/accesorios/${accesorio.id}`}
                      className="block h-full overflow-hidden rounded-xl bg-white shadow-sm transition-all duration-300 hover:shadow-lg border border-gray-100"
                    >
                      {/* Imagen */}
                      <div className="aspect-square overflow-hidden bg-gray-50 p-4">
                        <img
                          src={accesorio.img}
                          alt={accesorio.nombre}
                          className="h-full w-full object-contain object-center transition-transform duration-500 group-hover:scale-105"
                        />
                      </div>
                      
                      {/* Detalles */}
                      <div className="p-4 bg-white border-t border-gray-100">
                        <h3 className="text-sm text-gray-700 font-medium mb-1">{accesorio.nombre}</h3>
                        <p className="text-base font-bold text-gray-900">{accesorio.precio}€</p>
                        
                        <div className="mt-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          <div className="text-xs inline-flex items-center font-medium bg-blue-600 text-white px-3 py-1 rounded-full">
                            Ver detalles
                            <svg className="ml-1 w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                            </svg>
                          </div>
                        </div>
                      </div>
                    </Link>
                  </AnimateOnScroll>
                ))}
              </ul>
            </div>
            
            {/* Paginación */}
            <AnimateOnScroll animation="fade-up" className="mt-12 flex justify-center">
              <nav className="flex items-center space-x-1">
                <button
                  onClick={() => paginaActual > 1 && cambiarPagina(paginaActual - 1)}
                  disabled={paginaActual === 1}
                  className={`p-2 rounded-full ${
                    paginaActual === 1
                      ? 'text-gray-400 cursor-not-allowed'
                      : 'text-blue-600 hover:bg-blue-50 hover:text-blue-800'
                  }`}
                >
                  <span className="sr-only">Anterior</span>
                  <img src={flechaIcon} alt="Anterior" className="h-4 w-4 transform -scale-x-100" />
                </button>
                
                {[...Array(Math.min(3, totalPaginas))].map((_, i) => {
                  // Mostrar siempre 3 páginas o menos si hay menos de 3 páginas
                  let pageNum;
                  if (paginaActual === 1) {
                    pageNum = i + 1;
                  } else if (paginaActual === totalPaginas) {
                    pageNum = totalPaginas - 2 + i;
                  } else {
                    pageNum = paginaActual - 1 + i;
                  }
                  
                  // Asegurarse de que los números de página están dentro del rango
                  if (pageNum > 0 && pageNum <= totalPaginas) {
                    return (
                      <button
                        key={pageNum}
                        onClick={() => cambiarPagina(pageNum)}
                        className={`px-3 py-1 rounded-md ${
                          paginaActual === pageNum
                            ? 'bg-blue-600 text-white'
                            : 'text-gray-700 hover:bg-gray-100'
                        }`}
                      >
                        {pageNum}
                      </button>
                    );
                  }
                  return null;
                })}
                
                <button
                  onClick={() => paginaActual < totalPaginas && cambiarPagina(paginaActual + 1)}
                  disabled={paginaActual === totalPaginas}
                  className={`p-2 rounded-full ${
                    paginaActual === totalPaginas
                      ? 'text-gray-400 cursor-not-allowed'
                      : 'text-blue-600 hover:bg-blue-50 hover:text-blue-800'
                  }`}
                >
                  <span className="sr-only">Siguiente</span>
                  <img src={flechaIcon} alt="Siguiente" className="h-4 w-4" />
                </button>
              </nav>
            </AnimateOnScroll>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Accesorios;

import React from "react";
import { Link, useNavigate } from "react-router-dom";
import palas from "../data/productos.json";
import accesorios from "../data/accesorios.json";
import iniciacionImg from "../assets/iniciacion.png";
import intermedioImg from "../assets/intermedio.png";
import avanzadoImg from "../assets/avanzado.png";
import controlImg from "../assets/control.png";
import potenciaImg from "../assets/potencia.png";
import todasImg from "../assets/todas.png";
import palaImg from "../assets/pala.png";
import accesorioImg from "../assets/accesorios.png";
import nox from "../assets/nox.png";
import adidas from "../assets/adidas.png";
import siux from "../assets/siux.png";
import wilson from "../assets/wilson.png";
import babolat from "../assets/babolat.png";
import bullpadel from "../assets/bullpadel.png";
import head from "../assets/head.png";
import varlion from "../assets/varlion.png";
import blackcrown from "../assets/blackcrown.png";
import dunlop from "../assets/Dunlop.png";
import starvie from "../assets/starvie.png";
import bgAccesorios from '../assets/bgaccesorios.png';
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

const ProductPage = () => {
  const navigate = useNavigate();

  const imageMapping = {
    INICIACION: iniciacionImg,
    INTERMEDIO: intermedioImg,
    AVANZADO: avanzadoImg,
    CONTROL: controlImg,
    POTENCIA: potenciaImg,
    TODAS: todasImg,
  };

  // Mapeo de categorías a parámetros tipo en la página de palas
  const tipoMap = {
    INICIACION: 'Principiante',
    INTERMEDIO: 'Equilibrada',
    AVANZADO: 'Ofensiva',
    CONTROL: 'Defensiva',
    POTENCIA: 'Ofensiva',
    TODAS: null,
  };

  // Mostrar solo 3 palas y 3 accesorios destacados
  const palasFeatured = palas.slice(0, 3);
  const accesoriosFeatured = accesorios.slice(0, 3);

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
     {/* Carrusel de marcas a ancho completo */}
<AnimateOnScroll
  animation="fade-up"
  duration={1000}
  className="w-full overflow-hidden relative z-20 py-8 bg-white border-y border-gray-200 mt-screen"
>
  <h2 className="text-xl font-semibold text-center text-gray-700 mb-6">Nuestras marcas</h2>
  
  <div className="flex w-max animate-scroll-right">
    {[
      nox, adidas, siux, babolat, bullpadel, head, wilson, varlion, blackcrown, dunlop, starvie,
      nox, adidas, siux, babolat, bullpadel, head, wilson, varlion, blackcrown, dunlop, starvie
    ].map((logo, index) => (
      <div
        key={index}
        className="flex-shrink-0 mx-6 opacity-80 hover:opacity-100 transition-opacity w-32 h-24"
      >
        <img src={logo} alt="Logo" className="w-full h-full object-contain" />
      </div>
    ))}
  </div>
</AnimateOnScroll>


      {/* Contenedor principal */}
      <div className="container mx-auto p-4 md:p-6 flex-grow">
        {/* Categorías con diseño mejorado */}
        <section className="mb-16 mt-8">
          <AnimateOnScroll animation="fade-up" className="flex flex-col items-center mb-10">
            <h2 className="text-3xl font-bold text-gray-800">Explora por categoría</h2>
            <div className="w-24 h-1 bg-blue-600 mt-2 mb-2"></div>
            <p className="text-gray-600 text-center max-w-2xl">Encuentra la pala perfecta para tu nivel y estilo de juego</p>
          </AnimateOnScroll>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 md:gap-6">
            {[
              "INICIACION",
              "INTERMEDIO",
              "AVANZADO",
              "CONTROL",
              "POTENCIA",
              "TODAS",
            ].map((title, index) => (
              <AnimateOnScroll 
                key={title} 
                animation="fade-up" 
                delay={index * 100} // Efecto escalonado por cada elemento
                className="group flex flex-col items-center transition-transform transform hover:-translate-y-1 duration-300"
              >
                <Link 
                  to={`/palas-de-padel${tipoMap[title] ? `?tipo=${tipoMap[title]}` : ''}`}
                >
                  <div className="w-full aspect-square overflow-hidden rounded-full border-2 border-gray-200 shadow-md flex items-center justify-center bg-gray-100 group-hover:border-blue-500 group-hover:shadow-lg transition-all">
                    <div className="w-5/6 h-5/6 rounded-full overflow-hidden">
                      <img
                        src={imageMapping[title]}
                        alt={title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                    </div>
                  </div>
                  <span className="mt-3 text-lg font-bold text-gray-700 group-hover:text-blue-600 transition-colors">{title}</span>
                </Link>
              </AnimateOnScroll>
            ))}
          </div>
        </section>

        {/* Palas destacadas */}
        <section className="mb-16">
          <AnimateOnScroll animation="fade-up" className="flex justify-between items-end mb-8">
            <div>
              <h2 className="text-2xl font-bold text-gray-800">Palas destacadas</h2>
              <div className="w-16 h-1 bg-blue-600 mt-2"></div>
            </div>
            <Link 
              to="/palas-de-padel" 
              className="text-blue-600 hover:text-blue-800 font-medium flex items-center group"
            >
              Ver todas
              <svg className="w-5 h-5 ml-1 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
              </svg>
            </Link>
          </AnimateOnScroll>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {palasFeatured.map((pala, index) => (
              <AnimateOnScroll key={pala.id} animation="zoom-in" delay={index * 150}>
                <Link to={`/palas-de-padel/${pala.id}`} className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow border border-gray-100 flex flex-col">
                  <div className="relative overflow-hidden bg-white p-4 flex justify-center">
                    <img src={pala.img} alt={pala.nombre} className="w-auto h-48 object-contain transition-transform duration-500 group-hover:scale-105" />
                    {pala.descuento && <div className="absolute top-4 left-4 bg-red-600 text-white text-sm font-bold py-1 px-3 rounded-full">-{pala.descuento}%</div>}
                  </div>
                  <div className="p-5 flex flex-col flex-grow bg-gray-50">
                    <h3 className="text-lg font-semibold text-gray-800 mb-1">{pala.nombre}</h3>
                    <p className="text-sm text-gray-500 mb-4">{pala.descripcion?.substring(0, 70)}...</p>
                    <div className="flex items-center justify-between mt-auto">
                      <span className="text-xl font-bold text-gray-800">{pala.precio_actual}€</span>
                      <span className="text-blue-600 text-sm font-medium">Ver detalles</span>
                    </div>
                  </div>
                </Link>
              </AnimateOnScroll>
            ))}
          </div>
        </section>

        {/* Banner promocional */}
        <AnimateOnScroll animation="fade-up" className="mb-16">
          
          <div
            className="rounded-xl overflow-hidden shadow-lg bg-cover bg-center"
            style={{ backgroundImage: `url(${bgAccesorios})`,}}
          >
            
            <div className="flex flex-col md:flex-row items-center">
              <div className="p-8 md:w-1/2">
                <h2 className="text-3xl font-bold text-white mb-4">Equípate como un profesional</h2>
                <p className="text-blue-100 mb-6">Descubre nuestra gama completa de accesorios para complementar tu equipo.</p>
                <Link 
                  to="/accesorios" 
                  onClick={e => { e.preventDefault(); navigate('/accesorios'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                  className="inline-block bg-white text-blue-600 font-bold py-3 px-6 rounded-lg hover:bg-opacity-90 transition-colors"
                >
                  Explorar accesorios
                </Link>
              </div>
            </div>
          </div>
        </AnimateOnScroll>

        {/* Accesorios destacados */}
        <section className="mb-16">
          <AnimateOnScroll animation="fade-up" className="flex justify-between items-end mb-8">
            <div>
              <h2 className="text-2xl font-bold text-gray-800">Accesorios destacados</h2>
              <div className="w-16 h-1 bg-blue-600 mt-2"></div>
            </div>
            <Link 
              to="/accesorios" 
              className="text-blue-600 hover:text-blue-800 font-medium flex items-center group"
            >
              Ver todos
              <svg className="w-5 h-5 ml-1 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
              </svg>
            </Link>
          </AnimateOnScroll>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {accesoriosFeatured.map((accesorio, index) => (
              <AnimateOnScroll key={accesorio.id} animation="fade-up" delay={index * 150}>
                <Link to={`/accesorios/${accesorio.id}`} className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow border border-gray-100 flex flex-col">
                  <div className="h-48 overflow-hidden bg-white p-4 flex items-center justify-center">
                    <img src={accesorio.img} alt={accesorio.nombre} className="w-auto h-40 object-contain transition-transform duration-300 group-hover:scale-105" />
                  </div>
                  <div className="p-4 flex flex-col flex-grow bg-gray-50">
                    <h3 className="text-base font-semibold text-gray-800 mb-2">{accesorio.nombre}</h3>
                    <div className="flex items-center justify-between mt-2">
                      <span className="text-lg font-bold text-gray-800">{accesorio.precio_actual}€</span>
                      <span className="text-blue-600 text-sm font-medium">Ver detalles</span>
                    </div>
                  </div>
                </Link>
              </AnimateOnScroll>
            ))}
          </div>
        </section>

        {/* Sección de suscripción al newsletter */}
        <AnimateOnScroll animation="fade-up" className="mb-16 bg-gray-100 rounded-xl p-8">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-2xl font-bold text-gray-800 mb-3">¿Quieres estar al día?</h2>
            <p className="text-gray-600 mb-6">Suscríbete a nuestro newsletter para recibir noticias, ofertas exclusivas y consejos sobre el mundo del pádel</p>
            
            <div className="flex flex-col sm:flex-row gap-3">
              <input 
                type="email" 
                placeholder="Tu correo electrónico" 
                className="flex-grow px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-lg transition-colors">
                Suscribirme
              </button>
            </div>
            <p className="text-xs text-gray-500 mt-3">Al suscribirte aceptas nuestra política de privacidad.</p>
          </div>
        </AnimateOnScroll>
      </div>
    </div>
  );
};

export default ProductPage;
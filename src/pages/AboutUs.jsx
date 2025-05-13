import React, { useRef, useState, useEffect } from "react";
import aboutusImg from "../assets/aboutus.png";
import bgBolas from "../assets/bgbolas.png";

const AboutUs = () => {
  const contentRef = useRef(null);

  const scrollToContent = () => {
    if (contentRef.current) {
      contentRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  // Banner animation visibility
  const [bannerVisible, setBannerVisible] = useState(false);
  useEffect(() => {
    const timer = setTimeout(() => setBannerVisible(true), 300);
    return () => clearTimeout(timer);
  }, []);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [contactName, setContactName] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [contactMessage, setContactMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const subject = `Contacto de ${contactName}`;
    const body = `Nombre: ${contactName}\nEmail: ${contactEmail}\nMensaje: ${contactMessage}`;
    window.location.href = `mailto:info@blaynepadel.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    setIsModalOpen(false);
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Banner con flecha animada */}
      <div className="relative h-screen w-full flex items-center justify-center">
        <img 
          src={aboutusImg} 
          alt="Sobre Nosotros" 
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ease-in-out ${bannerVisible ? 'opacity-100' : 'opacity-80'}`}
        />
        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className={`text-center text-white transition-all duration-1000 transform ${bannerVisible ? 'translate-y-0 opacity-100' : 'translate-y-16 opacity-0'}`}>
            <h1 className="text-5xl font-bold mb-6 tracking-wide">Nuestra Historia</h1>
            <p className="text-xl max-w-2xl mx-auto mb-12">Descubre cómo nació nuestra pasión por el mundo del pádel y nuestro compromiso con la excelencia deportiva.</p>
            
            {/* Flecha animada hacia abajo */}
            <div 
              className="cursor-pointer animate-bounce mx-auto"
              onClick={scrollToContent}
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

      {/* Contenido principal con diseño mejorado */}
      <div 
        ref={contentRef} 
        className="bg-gradient-to-b from-gray-50 to-white py-12 px-4 sm:px-6 lg:px-8"
      >
        <div className="max-w-6xl mx-auto">
          {/* Sección de estadísticas */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 text-center mb-12">
            <div>
              <h4 className="text-3xl font-bold text-blue-600">1500+</h4>
              <p className="text-gray-600">Productos</p>
            </div>
            <div>
              <h4 className="text-3xl font-bold text-blue-600">30000+</h4>
              <p className="text-gray-600">Clientes satisfechos</p>
            </div>
            <div>
              <h4 className="text-3xl font-bold text-blue-600">20+</h4>
              <p className="text-gray-600">Marcas aliadas</p>
            </div>
          </div>

          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-800 mb-6">Blayne Padel Shop</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-600 mx-auto"></div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
            <div className="bg-white p-8 rounded-xl shadow-md transform hover:-translate-y-1 transition-transform duration-300">
              <h3 className="text-2xl font-semibold mb-4 text-gray-800">Nuestra Misión</h3>
              <p className="text-gray-600 leading-relaxed">
                En Blayne Padel nos dedicamos a ofrecer productos de la más alta calidad para los amantes del pádel. Nacimos en 2018 de la mano de jugadores profesionales con una visión clara: acercar la excelencia deportiva a todos los niveles. Seleccionamos cuidadosamente cada pala, accesorio y prenda para garantizar el máximo rendimiento en la pista.
              </p>
            </div>
            
            <div className="bg-white p-8 rounded-xl shadow-md transform hover:-translate-y-1 transition-transform duration-300">
              <h3 className="text-2xl font-semibold mb-4 text-gray-800">Compromiso de Calidad</h3>
              <p className="text-gray-600 leading-relaxed">
                Trabajamos directamente con las mejores marcas del sector para ofrecerte productos con garantía de satisfacción. Nuestro equipo prueba personalmente cada modelo que incorporamos al catálogo, asegurando que cumple con nuestros estándares de durabilidad, diseño y rendimiento. No vendemos productos que no usaríamos nosotros mismos en la pista.
              </p>
            </div>
          </div>
          
          <div className="bg-blue-50 p-8 rounded-xl shadow-lg mb-16">
            <h3 className="text-2xl font-semibold mb-4 text-center text-gray-800">Nuestros Valores</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="flex flex-col items-center p-4">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                  <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path>
                  </svg>
                </div>
                <h4 className="font-medium text-lg text-gray-800 mb-2">Confianza</h4>
                <p className="text-gray-600 text-center">Construimos relaciones sólidas con nuestros clientes basadas en la honestidad y la transparencia.</p>
              </div>
              
              <div className="flex flex-col items-center p-4">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                  <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                  </svg>
                </div>
                <h4 className="font-medium text-lg text-gray-800 mb-2">Innovación</h4>
                <p className="text-gray-600 text-center">Estamos siempre a la vanguardia, buscando las últimas tecnologías y tendencias en el mundo del pádel.</p>
              </div>
              
              <div className="flex flex-col items-center p-4">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                  <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path>
                  </svg>
                </div>
                <h4 className="font-medium text-lg text-gray-800 mb-2">Comunidad</h4>
                <p className="text-gray-600 text-center">Fomentamos la creación de una gran familia de padelistas, apoyando eventos locales y promocionando este deporte.</p>
              </div>
            </div>
          </div>
          
          <div className="text-center mb-10">
            <h3 className="text-2xl font-semibold mb-6 text-gray-800">Nuestro Equipo</h3>
            <p className="text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Detrás de Blayne hay un equipo apasionado de jugadores, entrenadores y especialistas en material deportivo. Nos une la pasión por el pádel y el compromiso de ayudarte a encontrar exactamente lo que necesitas para mejorar tu juego y disfrutar al máximo de este maravilloso deporte.
            </p>
          </div>
          
          {/* Contact section background updated to use bgbolas.png */}
          <div className="relative p-8 rounded-xl text-white text-center overflow-hidden">
            {/* Background image layer */}
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: `url(${bgBolas})` }}
            />
            {/* Overlay with transparency and blur */}
            <div className="absolute inset-0 bg-black bg-opacity-20 backdrop-filter backdrop-blur-sm" />
            {/* Content above layers */}
            <div className="relative z-10">
             <h3 className="text-2xl font-bold mb-4">¿Tienes alguna pregunta?</h3>
             <p className="mb-6">Estamos aquí para ayudarte. No dudes en ponerte en contacto con nosotros.</p>
             <button 
               onClick={() => setIsModalOpen(true)}
               className="bg-white text-blue-600 font-medium px-6 py-3 rounded-lg hover:bg-blue-50 transition-colors duration-300"
             >
               Contáctanos
             </button>
            </div>
          </div>
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50" onClick={() => setIsModalOpen(false)}>
          <div
            className="bg-white rounded-xl w-11/12 max-w-md p-6 relative" onClick={e => e.stopPropagation()}
          >
            <button onClick={() => setIsModalOpen(false)} className="absolute top-4 right-4 text-gray-500 hover:text-gray-700">&times;</button>
            <h2 className="text-2xl font-semibold mb-4">Contáctanos</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-gray-700">Nombre</label>
                <input type="text" value={contactName} onChange={(e) => setContactName(e.target.value)} required className="w-full border border-gray-300 rounded px-3 py-2" />
              </div>
              <div>
                <label className="block text-gray-700">Email</label>
                <input type="email" value={contactEmail} onChange={(e) => setContactEmail(e.target.value)} required className="w-full border border-gray-300 rounded px-3 py-2" />
              </div>
              <div>
                <label className="block text-gray-700">Mensaje</label>
                <textarea value={contactMessage} onChange={(e) => setContactMessage(e.target.value)} required rows="4" className="w-full border border-gray-300 rounded px-3 py-2" />
              </div>
              <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">Enviar mensaje</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AboutUs;

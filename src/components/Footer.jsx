import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  const year = new Date().getFullYear();
  const [modalType, setModalType] = useState(null);

  // Map modal types to illustrative images
  const modalImages = {
    shipping: 'https://via.placeholder.com/80?text=Env&iacute;o',
    legal: 'https://via.placeholder.com/80?text=Legal',
    terms: 'https://via.placeholder.com/80?text=T&eacute;rminos',
    privacy: 'https://via.placeholder.com/80?text=Privacidad',
    cookies: 'https://via.placeholder.com/80?text=Cookies',
    returns: 'https://via.placeholder.com/80?text=Devoluciones',
    transport: 'https://via.placeholder.com/80?text=Pagos'
  };

  const modals = {
    shipping: {
      title: 'Política de Envíos',
      content: (
        <>
          <p>Envío estándar (24-48h): 5€</p>
          <p>Envío exprés (24h): 8€</p>
          <p>Envío gratuito en compras superiores a 100€.</p>
          <p>Procesamos pedidos de L-V. Plazos pueden ampliarse en zonas remotas.</p>
        </>
      )
    },
    legal: {
      title: 'Aviso Legal',
      content: (
        <p>Este sitio web es propiedad de Jose P. Couso. La información aquí contenida es meramente informativa y no compromete legalmente a la empresa.</p>
      )
    },
    terms: {
      title: 'Términos del Servicio',
      content: (
        <p>Al utilizar este sitio acepta nuestros términos. Nos reservamos el derecho de modificar precios, productos y condiciones sin previo aviso.</p>
      )
    },
    privacy: {
      title: 'Política de Privacidad',
      content: (
        <p>Respetamos tu privacidad. No compartimos datos personales con terceros. Consulta nuestra documentación para más detalles.</p>
      )
    },
    cookies: {
      title: 'Política de Cookies',
      content: (
        <p>Usamos cookies para mejorar la experiencia. Puedes gestionar su uso desde la configuración de tu navegador.</p>
      )
    },
    returns: {
      title: 'Cambios y Devoluciones',
      content: (
        <p>Aceptamos devoluciones en 14 días. Los gastos de envío de devolución corren por cuenta del cliente, salvo defecto de fábrica.</p>
      )
    },
    transport: {
      title: 'Transporte y Pagos',
      content: (
        <p>Aceptamos tarjetas, PayPal y transferencias. Elige opción al finalizar compra. Garantizamos envíos seguros y seguimiento en tiempo real.</p>
      )
    }
  };

  return (
    <footer className="bg-gradient-to-r from-gray-900 via-gray-800 to-black text-gray-300 py-4">
      <div className="container mx-auto px-8 py-4 grid grid-cols-1 md:grid-cols-5 gap-4">
        <div>
          <h3 className="text-white text-lg font-semibold mb-2">Blayne Padel Shop</h3>
          <p className="text-sm">Desde principiantes hasta profesionales confían en nuestra selección de palas y accesorios de alta calidad</p>
        </div>
        <div>
          <h4 className="text-white font-medium mb-2">Enlaces</h4>
          <ul className="space-y-1 text-sm">
            <li><Link to="/" onClick={() => window.scrollTo({top:0,behavior:'smooth'})} className="hover:text-white">Inicio</Link></li>
            <li><Link to="/palas-de-padel" onClick={() => window.scrollTo({top:0,behavior:'smooth'})} className="hover:text-white">Palas de Pádel</Link></li>
            <li><Link to="/accesorios" onClick={() => window.scrollTo({top:0,behavior:'smooth'})} className="hover:text-white">Accesorios</Link></li>
            <li><Link to="/sobre-nosotros" onClick={() => window.scrollTo({top:0,behavior:'smooth'})} className="hover:text-white">Sobre Nosotros</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="text-white font-medium mb-2">Información</h4>
          <ul className="space-y-1 text-sm">
            {Object.keys(modals).map(key => (
              <li key={key}>
                <button onClick={() => setModalType(key)} className="hover:text-white focus:outline-none transition-colors duration-200">{modals[key].title}</button>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h4 className="text-white font-medium mb-2">Soporte</h4>
          <ul className="space-y-1 text-sm">
            <li><a href="mailto:info@blaynepadel.com" className="hover:text-white">info@blaynepadel.com</a></li>
            <li><a href="tel:+34123456789" className="hover:text-white">+34 123 456 789</a></li>
          </ul>
        </div>
        <div>
          <h4 className="text-white font-medium mb-2">Síguenos</h4>
          <div className="flex space-x-3">
            <a href="#" className="hover:text-white" aria-label="Instagram">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M7.75 2h8.5A5.75 5.75 0 0122 7.75v8.5A5.75 5.75 0 0116.25 22h-8.5A5.75 5.75 0 012 16.25v-8.5A5.75 5.75 0 017.75 2zm0 1.5A4.25 4.25 0 003.5 7.75v8.5A4.25 4.25 0 007.75 20.5h8.5a4.25 4.25 0 004.25-4.25v-8.5A4.25 4.25 0 0016.25 3.5h-8.5z" />
                <path d="M12 7a5 5 0 100 10 5 5 0 000-10zm0 1.5a3.5 3.5 0 110 7 3.5 3.5 0 010-7zm5.25-.75a1.25 1.25 0 100 2.5 1.25 1.25 0 000-2.5z" />
              </svg>
            </a>
            <a href="#" className="hover:text-white" aria-label="Facebook">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M22 12a10 10 0 10-11.5 9.9v-7h-2v-2.9h2v-2.2c0-2 1.2-3.1 3-3.1.9 0 1.8.1 1.8.1v2h-1c-1 0-1.3.6-1.3 1.3v1.9h2.3l-.4 2.9h-1.9v7A10 10 0 0022 12z" />
              </svg>
            </a>
            <a href="#" className="hover:text-white" aria-label="Twitter">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8 19c7.5 0 11.6-6.2 11.6-11.6 0-.2 0-.4 0-.6A8.4 8.4 0 0022 5.9a8.3 8.3 0 01-2.4.7 4.2 4.2 0 001.8-2.3 8.4 8.4 0 01-2.6 1A4.2 4.2 0 0015.5 4c-2.3 0-4.2 1.9-4.2 4.2 0 .3 0 .7.1 1A11.9 11.9 0 013 5.1a4.2 4.2 0 001.3 5.6 4.1 4.1 0 01-1.9-.5v.1c0 2 1.4 3.7 3.3 4.1a4.3 4.3 0 01-1.9.1 4.2 4.2 0 003.9 2.9A8.4 8.4 0 012 17.8a11.8 11.8 0 006.4 1.9" />
              </svg>
            </a>
          </div>
        </div>
      </div>
      <div className="border-t border-gray-700 mt-4 pt-2 pb-4 text-center text-xs">
        © {year} Jose P. Couso. Todos los derechos reservados.
      </div>
      {modalType && (
        <div onClick={() => setModalType(null)} className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 transition-opacity duration-300">
          <div onClick={e => e.stopPropagation()} className="bg-white rounded-lg shadow-xl max-w-md w-full p-6 transform transition-transform duration-200 scale-100">
            <h3 className="text-xl font-semibold mb-4 text-gray-800">{modals[modalType].title}</h3>
            {/* image for context */}
            <img src={modalImages[modalType]} alt={modals[modalType].title} className="w-20 h-20 mx-auto mb-4" />
            <div className="text-gray-700 mb-6 text-sm">
              {modals[modalType].content}
            </div>
            <div className="text-right">
              <button onClick={() => setModalType(null)} className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-500 transition-colors">
                Cerrar
              </button>
            </div>
          </div>
        </div>
      )}
    </footer>
  );
};

export default Footer;
import React from 'react';
import { Link } from 'react-router-dom';
import { HashLink } from 'react-router-hash-link';
import logopadel from '../assets/logopadel.svg';
import avisoImg from '../assets/aviso.png';
import cambiosImg from '../assets/cambios.png';
import cookiesImg from '../assets/cookies.png';
import enviosImg from '../assets/envios.png';
import privacidadImg from '../assets/privacidad.png';
import serviciosImg from '../assets/servicios.png';
import transporteImg from '../assets/transporte.png';

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-gradient-to-r from-gray-900 via-gray-800 to-black text-gray-300 py-4">
        
      <div className="container mx-auto grid grid-cols-2 md:grid-cols-6 gap-4 md:gap-20 px-4 md:px-16">
        {/* New logo-only first column */}
        <div className="flex items-center justify-center">
          <img src={logopadel} alt="Logo Padel" className="h-32 w-32 sm:h-12 sm:w-12 md:h-32 md:w-64" />
        </div>
        <div>
            
          <div className="flex items-center mb-2">
            
            <h3 className="text-white text-base sm:text-lg font-semibold">BLAYNE PADEL SHOP</h3>
          </div>
          <p className="text-xs sm:text-sm">Desde principiantes hasta profesionales confían en nuestra selección de palas y accesorios de alta calidad</p>
        </div>
        <div>
          <h4 className="text-white text-base sm:text-lg font-medium mb-2">Enlaces</h4>
          <ul className="space-y-1 text-sm">
            <li><Link to="/" onClick={() => window.scrollTo({top:0,behavior:'smooth'})} className="hover:text-white">Inicio</Link></li>
            <li><Link to="/palas-de-padel" onClick={() => window.scrollTo({top:0,behavior:'smooth'})} className="hover:text-white">Palas de Pádel</Link></li>
            <li><Link to="/accesorios" onClick={() => window.scrollTo({top:0,behavior:'smooth'})} className="hover:text-white">Accesorios</Link></li>
            <li><Link to="/sobre-nosotros" onClick={() => window.scrollTo({top:0,behavior:'smooth'})} className="hover:text-white">Sobre Nosotros</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="text-white text-base sm:text-lg font-medium mb-2">Información</h4>
          <ul className="space-y-1 text-sm">
            <li><HashLink smooth to="/politicas#shipping" scroll={el => el.scrollIntoView({ behavior: 'smooth', block: 'center' })} className="hover:text-white">Política de Envíos</HashLink></li>
            <li><HashLink smooth to="/politicas#legal" scroll={el => el.scrollIntoView({ behavior: 'smooth', block: 'center' })} className="hover:text-white">Aviso Legal</HashLink></li>
            <li><HashLink smooth to="/politicas#terms" scroll={el => el.scrollIntoView({ behavior: 'smooth', block: 'center' })} className="hover:text-white">Términos del Servicio</HashLink></li>
            <li><HashLink smooth to="/politicas#privacy" scroll={el => el.scrollIntoView({ behavior: 'smooth', block: 'center' })} className="hover:text-white">Política de Privacidad</HashLink></li>
            <li><HashLink smooth to="/politicas#cookies" scroll={el => el.scrollIntoView({ behavior: 'smooth', block: 'center' })} className="hover:text-white">Política de Cookies</HashLink></li>
            <li><HashLink smooth to="/politicas#returns" scroll={el => el.scrollIntoView({ behavior: 'smooth', block: 'center' })} className="hover:text-white">Cambios y Devoluciones</HashLink></li>
            <li><HashLink smooth to="/politicas#transport" scroll={el => el.scrollIntoView({ behavior: 'smooth', block: 'center' })} className="hover:text-white">Transporte y Pagos</HashLink></li>
          </ul>
        </div>
        <div>
          <h4 className="text-white text-base sm:text-lg font-medium mb-2">Soporte</h4>
          <ul className="space-y-1 text-sm">
            <li><a href="mailto:info@blaynepadel.com" className="hover:text-white">info@blaynepadel.com</a></li>
            <li><a href="tel:+34123456789" className="hover:text-white">+34 123 456 789</a></li>
          </ul>
        </div>
        <div>
          <h4 className="text-white text-base sm:text-lg font-medium mb-2">Síguenos</h4>
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
      <div className="border-t border-gray-700 mt-4 pt-2 pb-0 text-center text-xs">
        © {year} Jose P. Couso. Todos los derechos reservados.
      </div>
    </footer>
  );
};

export default Footer;
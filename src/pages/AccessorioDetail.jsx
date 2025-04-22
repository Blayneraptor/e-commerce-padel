import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import accesorios from "../data/accesorios.json";
import useInView from "../hooks/useInView";
import { useCart } from "../contexts/CartContext";

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

const AccessorioDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [accesorio, setAccesorio] = useState(null);
  const [loading, setLoading] = useState(true);
  const [cantidad, setCantidad] = useState(1);
  const [activeTab, setActiveTab] = useState('descripcion');
  const [isProductVisible, setIsProductVisible] = useState(false);
  const [accesoriosRelacionados, setAccesoriosRelacionados] = useState([]);
  const { addToCart } = useCart();
  const [addedToCart, setAddedToCart] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    setLoading(true);

    const foundAccesorio = accesorios.find(a => a.id.toString() === id);
    
    if (foundAccesorio) {
      setAccesorio(foundAccesorio);
      
      const related = accesorios
        .filter(a => a.id !== foundAccesorio.id && a.tipo === foundAccesorio.tipo)
        .slice(0, 4);
      
      setAccesoriosRelacionados(related);
      
      setTimeout(() => {
        setIsProductVisible(true);
      }, 100);
    }
    
    setLoading(false);
  }, [id]);

  const handleCantidad = (accion) => {
    if (accion === "incrementar") {
      setCantidad(prev => prev + 1);
    } else if (accion === "decrementar" && cantidad > 1) {
      setCantidad(prev => prev - 1);
    }
  };

  const handleAddToCart = () => {
    if (accesorio) {
      addToCart(accesorio, cantidad);
      setAddedToCart(true);
      setTimeout(() => {
        setAddedToCart(false);
      }, 1500);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-600 border-opacity-75"></div>
      </div>
    );
  }

  if (!accesorio) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-gray-50">
        <div className="text-center p-8 max-w-md">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Producto no encontrado</h2>
          <p className="text-gray-600 mb-8">Lo sentimos, el accesorio que buscas no existe o ha sido eliminado.</p>
          <button 
            onClick={() => navigate('/accesorios')}
            className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-lg transition-colors"
          >
            Volver a todos los accesorios
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen pt-16">
      <AnimateOnScroll animation="fade-down" className="container mx-auto px-4 pt-6 pb-2">
        <div className="text-sm text-gray-500">
          <Link to="/" className="hover:text-blue-600 transition-colors">Inicio</Link>
          <span className="mx-1">/</span>
          <Link to="/accesorios" className="hover:text-blue-600 transition-colors">Accesorios</Link>
          <span className="mx-1">/</span>
          <span className="font-medium text-gray-800">{accesorio.nombre}</span>
        </div>
      </AnimateOnScroll>

      <div className="container mx-auto px-4 py-8">
        <div 
          className={`transition-all duration-1000 transform ${
            isProductVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-6">
              <div className="col-span-1">
                <div className="space-y-4">
                  <div className="relative bg-gray-100 rounded-lg overflow-hidden p-8 flex items-center justify-center">
                    <img 
                      src={accesorio.img} 
                      alt={accesorio.nombre}
                      className="max-h-[400px] object-contain transform transition-transform duration-500 hover:scale-105"
                    />
                  </div>
                </div>
              </div>
              
              <div className="col-span-1 space-y-6">
                <div>
                  <div className="flex items-center mb-1">
                    <span className="text-sm font-semibold bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full">
                      {accesorio.tipo}
                    </span>
                    <span className="ml-2 text-sm text-gray-500">
                      Ref: {accesorio.id}
                    </span>
                  </div>
                  
                  <h1 className="text-3xl font-bold text-gray-900 mb-1">{accesorio.nombre}</h1>
                  
                  <div className="flex items-center mb-4">
                    <div className="flex text-yellow-400 mr-2">
                      {[...Array(5)].map((_, i) => (
                        <svg key={i} className={`w-5 h-5 ${i < 4 ? 'text-yellow-400' : 'text-gray-300'}`} fill="currentColor" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.799-2.034c-.784-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                        </svg>
                      ))}
                    </div>
                    <span className="text-sm text-gray-500">
                      8 opiniones
                    </span>
                  </div>
                  
                  <div className="mt-4">
                    <p className="text-3xl font-bold text-gray-900">{accesorio.precio}€</p>
                  </div>
                  
                  <div className="mt-2">
                    <span className="text-sm font-medium text-gray-700">
                      IVA incluido
                    </span>
                    <div className="mt-1 flex items-center">
                      <div className="w-3 h-3 rounded-full bg-green-500 mr-2"></div>
                      <span className="text-sm text-green-600">
                        En stock
                      </span>
                    </div>
                  </div>
                  
                  <div className="mt-6">
                    <p className="text-gray-700">
                      Este {accesorio.tipo.toLowerCase()} de alta calidad está diseñado para mejorar tu experiencia de juego. 
                      Fabricado con materiales duraderos que garantizan un rendimiento óptimo en la pista.
                    </p>
                  </div>
                  
                  <div className="mt-8 space-y-4">
                    <div className="flex items-center">
                      <span className="text-gray-700 mr-4">Cantidad:</span>
                      <div className="flex items-center border border-gray-300 rounded-lg">
                        <button 
                          onClick={() => handleCantidad("decrementar")}
                          disabled={cantidad === 1}
                          className="px-3 py-1 disabled:opacity-50 hover:bg-gray-100 transition-colors text-gray-600"
                        >
                          -
                        </button>
                        <div className="px-4 py-1 border-x border-gray-300 min-w-[40px] text-center">
                          {cantidad}
                        </div>
                        <button 
                          onClick={() => handleCantidad("incrementar")}
                          className="px-3 py-1 hover:bg-gray-100 transition-colors text-gray-600"
                        >
                          +
                        </button>
                      </div>
                    </div>
                    
                    <div className="flex flex-col sm:flex-row gap-4">
                      <button 
                        onClick={handleAddToCart}
                        className={`flex-1 text-white font-medium py-3 px-6 rounded-lg transition-all duration-300 flex items-center justify-center
                          ${addedToCart ? 'bg-green-600' : 'bg-blue-600 hover:bg-blue-700'}`}
                        disabled={addedToCart}
                      >
                        {addedToCart ? (
                          <>
                            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                            </svg>
                            Añadido
                          </>
                        ) : (
                          <>
                            <svg className="mr-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"></path>
                            </svg>
                            Añadir al carrito
                          </>
                        )}
                      </button>
                      
                      <button className="flex-none bg-gray-100 hover:bg-gray-200 text-gray-800 font-medium py-3 px-6 rounded-lg transition-colors flex items-center justify-center">
                        <svg className="mr-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path>
                        </svg>
                        Favorito
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="border-t border-gray-200 mt-4">
              <div className="flex border-b border-gray-200">
                <button 
                  onClick={() => setActiveTab('descripcion')}
                  className={`px-6 py-3 font-medium text-sm focus:outline-none ${
                    activeTab === 'descripcion' 
                      ? 'border-b-2 border-blue-600 text-blue-600' 
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  Descripción
                </button>
                <button 
                  onClick={() => setActiveTab('caracteristicas')}
                  className={`px-6 py-3 font-medium text-sm focus:outline-none ${
                    activeTab === 'caracteristicas' 
                      ? 'border-b-2 border-blue-600 text-blue-600' 
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  Características
                </button>
                <button 
                  onClick={() => setActiveTab('opiniones')}
                  className={`px-6 py-3 font-medium text-sm focus:outline-none ${
                    activeTab === 'opiniones' 
                      ? 'border-b-2 border-blue-600 text-blue-600' 
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  Opiniones
                </button>
              </div>
              
              <div className="p-6">
                {activeTab === 'descripcion' && (
                  <div className="prose max-w-none">
                    <h3 className="text-lg font-medium text-gray-900">{accesorio.nombre}</h3>
                    <p>
                      Este {accesorio.tipo.toLowerCase()} de alta calidad está diseñado específicamente para jugadores de pádel. 
                      Con un diseño ergonómico y materiales duraderos, este producto te ayudará a mejorar tu rendimiento en la pista.
                    </p>
                    <p>
                      Fabricado con los mejores materiales, este {accesorio.tipo.toLowerCase()} ofrece durabilidad y comodidad durante el juego.
                      Su diseño optimizado garantiza un uso prolongado sin deterioro en la calidad.
                    </p>
                    <ul>
                      <li>Material de alta calidad</li>
                      <li>Diseño ergonómico</li>
                      <li>Durabilidad garantizada</li>
                      <li>Ideal para uso frecuente</li>
                    </ul>
                  </div>
                )}
                
                {activeTab === 'caracteristicas' && (
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium text-gray-900">Especificaciones técnicas</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <h4 className="font-medium text-gray-800">Tipo</h4>
                        <p className="text-gray-600">{accesorio.tipo}</p>
                      </div>
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <h4 className="font-medium text-gray-800">Material</h4>
                        <p className="text-gray-600">Alta calidad</p>
                      </div>
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <h4 className="font-medium text-gray-800">Color</h4>
                        <p className="text-gray-600">Negro / Multicolor</p>
                      </div>
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <h4 className="font-medium text-gray-800">Garantía</h4>
                        <p className="text-gray-600">1 año</p>
                      </div>
                    </div>
                  </div>
                )}
                
                {activeTab === 'opiniones' && (
                  <div className="space-y-6">
                    <h3 className="text-lg font-medium text-gray-900">Opiniones de clientes</h3>
                    <div className="space-y-4">
                      <div className="border-b border-gray-200 pb-4">
                        <div className="flex items-center mb-2">
                          <div className="flex text-yellow-400">
                            {[...Array(5)].map((_, i) => (
                              <svg key={i} className={`w-4 h-4 ${i < 5 ? 'text-yellow-400' : 'text-gray-300'}`} fill="currentColor" viewBox="0 0 20 20">
                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.799-2.034c-.784-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                              </svg>
                            ))}
                          </div>
                          <h4 className="ml-2 font-medium text-gray-800">¡Excelente producto!</h4>
                        </div>
                        <p className="text-gray-600">Muy buena calidad, lo recomendaría a cualquier jugador de pádel.</p>
                        <p className="text-gray-500 text-sm mt-1">Ana G. - 10/03/2025</p>
                      </div>
                      <div className="border-b border-gray-200 pb-4">
                        <div className="flex items-center mb-2">
                          <div className="flex text-yellow-400">
                            {[...Array(5)].map((_, i) => (
                              <svg key={i} className={`w-4 h-4 ${i < 4 ? 'text-yellow-400' : 'text-gray-300'}`} fill="currentColor" viewBox="0 0 20 20">
                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.799-2.034c-.784-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                              </svg>
                            ))}
                          </div>
                          <h4 className="ml-2 font-medium text-gray-800">Muy buen producto</h4>
                        </div>
                        <p className="text-gray-600">Buena relación calidad-precio. Cumple con lo esperado.</p>
                        <p className="text-gray-500 text-sm mt-1">Carlos M. - 22/02/2025</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
          
          {accesoriosRelacionados.length > 0 && (
            <AnimateOnScroll className="mt-12" animation="fade-up">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Productos relacionados</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {accesoriosRelacionados.map((item, index) => (
                  <AnimateOnScroll 
                    key={item.id} 
                    className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow border border-gray-100"
                    animation="fade-up"
                    delay={index * 100}
                  >
                    <Link to={`/accesorios/${item.id}`} className="block">
                      <div className="p-4 bg-gray-50 flex items-center justify-center">
                        <img 
                          src={item.img} 
                          alt={item.nombre}
                          className="h-40 w-40 object-contain hover:scale-105 transition-transform"
                        />
                      </div>
                      <div className="p-4">
                        <h3 className="font-medium text-gray-800">{item.nombre}</h3>
                        <p className="text-sm text-gray-500 mb-2">{item.tipo}</p>
                        <p className="text-lg font-bold text-gray-900">{item.precio}€</p>
                      </div>
                    </Link>
                  </AnimateOnScroll>
                ))}
              </div>
            </AnimateOnScroll>
          )}
        </div>
      </div>
    </div>
  );
};

export default AccessorioDetail;
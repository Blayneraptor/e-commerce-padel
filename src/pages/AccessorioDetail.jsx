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
  const [selectedImage, setSelectedImage] = useState(0);
  const [pageLoaded, setPageLoaded] = useState(false);

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
    setPageLoaded(true);
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

  // Características del accesorio para mostrar (reemplaza la definición actual)
  const caracteristicas = [
    { icon: "💪", name: "Potencia", value: accesorio.potencia || 8 },
    { icon: "🎯", name: "Control", value: accesorio.control  || 7 },
    { icon: "🔄", name: "Spin", value: accesorio.spin || 8 },
    { icon: "⚡", name: "Velocidad", value: accesorio.velocidad || 7 },
    { icon: "💎", name: "Durabilidad", value: accesorio.durabilidad || 9 },
    { icon: "🏆", name: "Nivel", value: accesorio.nivel || "Avanzado" },
  ];

  // Calcular precio anterior si hay descuento
  const precioAnterior = accesorio.descuento
    ? ((accesorio.precio * 100) / (100 - accesorio.descuento)).toFixed(2)
    : null;

  return (
    <div className="bg-gray-50 min-h-screen pt-16">
      {/* Migas de pan */}
      <div className="container mx-auto px-4 pt-6 pb-2">
        <div className="text-sm text-gray-500">
          <Link to="/" className="hover:text-blue-600 transition-colors">Inicio</Link>
          <span className="mx-1">/</span>
          <Link to="/accesorios" className="hover:text-blue-600 transition-colors">Accesorios</Link>
          <span className="mx-1">/</span>
          <span className="font-medium text-gray-800">{accesorio.nombre}</span>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className={`transition-opacity duration-500 ${pageLoaded ? 'opacity-100' : 'opacity-0'}`}>
          <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 p-6">
              {/* Galería de imágenes */}
              <div className="col-span-1 md:col-span-1 lg:col-span-2">
                <div className="space-y-4">
                  <div className="relative bg-gray-100 rounded-lg overflow-hidden p-8 flex items-center justify-center">
                    <img
                      src={accesorio.img}
                      alt={accesorio.nombre}
                      className="max-h-[500px] object-contain transform transition-transform duration-500 hover:scale-105"
                    />
                    {accesorio.descuento && (
                      <div className="absolute top-4 left-4">
                        <div className="bg-red-600 text-white text-sm font-bold px-3 py-1 rounded-full">
                          -{accesorio.descuento}%
                        </div>
                      </div>
                    )}
                    {accesorio.nuevo && (
                      <div className="absolute top-4 right-4">
                        <div className="bg-green-500 text-white text-sm font-bold px-3 py-1 rounded-full">
                          Nuevo
                        </div>
                      </div>
                    )}
                  </div>
                  <div className="flex space-x-2 overflow-x-auto pb-2">
                    {[0,1,2].map(i => (
                      <button
                        key={i}
                        onClick={() => setSelectedImage(i)}
                        className={`flex-shrink-0 border-2 rounded-md w-20 h-20 flex items-center justify-center ${selectedImage===i?'border-blue-500':'border-gray-200'}`}>
                        <img src={accesorio.img} alt={`${accesorio.nombre} - vista ${i+1}`} className="max-h-full max-w-full object-contain" />
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Información del accesorio */}
              <div className="col-span-1 md:col-span-1 lg:col-span-3 space-y-6">
                <div>
                  <div className="flex items-center mb-1">
                    <span className="text-sm font-semibold bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full">
                      {accesorio.tipo || "Premium"}
                    </span>
                    <span className="ml-2 text-sm text-gray-500">Ref: {accesorio.id}</span>
                  </div>
                  <h1 className="text-3xl font-bold text-gray-900 mb-1">{accesorio.nombre}</h1>

                  <div className="flex items-center mb-4">
                    <div className="mt-4 flex items-end">
                      <p className="text-3xl font-bold text-gray-900">{accesorio.precio}€</p>
                      {precioAnterior && <p className="ml-3 text-lg font-medium text-gray-500 line-through">{precioAnterior}€</p>}
                      {accesorio.descuento && <p className="ml-3 text-lg font-medium text-red-600">{accesorio.descuento}% dto.</p>}
                    </div>
                  </div>

                  <span className="text-sm font-medium text-gray-700">IVA incluido</span>

                  <div className="mt-6 flex flex-wrap gap-2">
                    {caracteristicas.map(c => (
                      <div key={c.name} className="flex items-center bg-gray-100 px-3 py-1.5 rounded-full text-sm">
                        <span className="mr-1.5">{c.icon}</span>
                        <span className="font-medium text-gray-800">{c.name}:</span>
                        <span className="ml-1 text-gray-700">
                          {typeof c.value==='number'?<div className="inline-flex ml-1"><span className="flex">{[...Array(10)].map((_,i)=><span key={i} className={`w-2 h-2 rounded-full mx-px ${i<c.value?'bg-blue-600':'bg-gray-300'}`}></span>)}</span></div>:c.value}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* Cantidad y añadir al carrito */}
                  <div className="mt-8 space-y-4">
                    <div className="flex items-center">
                      <span className="text-gray-700 mr-4">Cantidad:</span>
                      <div className="flex items-center border border-gray-300 rounded-lg">
                        <button onClick={()=>handleCantidad('decrementar')} disabled={cantidad===1} className="px-3 text-gray-600 hover:bg-gray-100 transition">-</button>
                        <span className="px-4 py-1 border-x border-gray-300">{cantidad}</span>
                        <button onClick={()=>handleCantidad('incrementar')} className="px-3 text-gray-600 hover:bg-gray-100 transition">+</button>
                      </div>
                    </div>
                    <div className="flex flex-col sm:flex-row gap-4">
                      <button onClick={handleAddToCart} className={`flex-1 text-white font-medium py-3 px-6 rounded-lg transition-all duration-300 flex items-center justify-center ${addedToCart?'bg-green-600':'bg-blue-600 hover:bg-blue-700'}`}>{addedToCart?'Añadido':'Añadir al carrito'}</button>
                      <button className="flex-none bg-gray-100 hover:bg-gray-200 text-gray-800 font-medium py-3 px-6 rounded-lg transition-colors flex items-center justify-center">
                        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>
                        Favorito
                      </button>
                    </div>
                  </div>
                  {/* Opciones adicionales */}
                  <div className="mt-8 space-y-3 border-t pt-6 border-gray-200">
                    <div className="flex items-start">
                      <svg className="flex-shrink-0 w-5 h-5 text-green-600 mr-3 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" /></svg>
                      <div><span className="text-sm text-gray-700">Envío gratis</span> <span className="text-sm text-gray-500">para pedidos superiores a 50€</span></div>
                    </div>
                    <div className="flex items-start">
                      <svg className="flex-shrink-0 w-5 h-5 text-green-600 mr-3 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" /></svg>
                      <div><span className="text-sm text-gray-700">Devolución gratuita</span> <span className="text-sm text-gray-500">durante 30 días</span></div>
                    </div>
                    <div className="flex items-start">
                      <svg className="flex-shrink-0 w-5 h-5 text-green-600 mr-3 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
                      <div><span className="text-sm text-gray-700">Pago seguro</span> <span className="text-sm text-gray-500">con encriptación SSL</span></div>
                    </div>
                  </div>
                 </div>
               </div>
             </div>

             {/* Tabs - Descripción, Características, Opiniones */}
            <div className="border-t border-gray-200 mt-8">
              <div className="flex overflow-x-auto whitespace-nowrap scrollbar-hide">
                <button onClick={() => setActiveTab('descripcion')} className={`px-8 py-4 border-b-2 font-medium text-sm transition-colors ${activeTab==='descripcion'?'border-blue-600 text-blue-600':'border-transparent text-gray-500 hover:text-gray-700'}`}>Descripción</button>
                <button onClick={() => setActiveTab('caracteristicas')} className={`px-8 py-4 border-b-2 font-medium text-sm transition-colors ${activeTab==='caracteristicas'?'border-blue-600 text-blue-600':'border-transparent text-gray-500 hover:text-gray-700'}`}>Características</button>
                <button onClick={() => setActiveTab('opiniones')} className={`px-8 py-4 border-b-2 font-medium text-sm transition-colors ${activeTab==='opiniones'?'border-blue-600 text-blue-600':'border-transparent text-gray-500 hover:text-gray-700'}`}>Opiniones</button>
              </div>
              <div className="p-6">
                {/* Descripción */}
                {activeTab==='descripcion' && (
                  <div className="prose max-w-none">
                    <p>
                      {accesorio.descripcion || `${['Bolsas','Muñequeras','Camisetas','Pelotas','Ropa'].includes(accesorio.tipo) ? 'La' : 'El'} ${accesorio.nombre} de marca ${accesorio.marca} es un accesorio de pádel de alta calidad, ideal para mejorar tu experiencia en la pista.`}
                    </p>
                  </div>
                )}
                {/* Características */}
                {activeTab==='caracteristicas' && (
                  <div className="space-y-4">
                    <ul className="space-y-2">
                      <li className="flex"><span className="w-40 font-medium text-gray-600">Marca:</span><span className="ml-2 text-gray-800">{accesorio.marca}</span></li>
                      <li className="flex"><span className="w-40 font-medium text-gray-600">Tipo:</span><span className="ml-2 text-gray-800">{accesorio.tipo}</span></li>
                      <li className="flex"><span className="w-40 font-medium text-gray-600">Precio:</span><span className="ml-2 text-gray-800">{accesorio.precio}€</span></li>
                      {accesorio.descuento && <li className="flex"><span className="w-40 font-medium text-gray-600">Descuento:</span><span className="ml-2 text-gray-800">-{accesorio.descuento}%</span></li>}
                    </ul>
                  </div>
                )}
                {/* Opiniones */}
                {activeTab === 'opiniones' && (
                  <div>
                    <div className="flex items-center mb-6">
                      <div className="flex text-yellow-400 mr-3">
                        {[...Array(5)].map((_, i) => (
                          <svg key={i} className={`w-6 h-6 ${i < (accesorio.rating || 4) ? 'text-yellow-400' : 'text-gray-300'}`} fill="currentColor" viewBox="0 0 20 20">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.799-2.034c-.784-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        ))}
                      </div>
                      <span className="text-xl font-bold text-gray-900">{accesorio.rating || 4.5}</span>
                      <span className="mx-2 text-gray-500">•</span>
                      <span className="text-gray-500">{accesorio.opiniones || 0} opiniones</span>
                    </div>
                    <div className="mb-8">
                      <div className="space-y-1.5 mb-6">
                        {[5, 4, 3, 2, 1].map((star) => {
                          const percentage = star === 5 ? 65 : star === 4 ? 20 : star === 3 ? 10 : star === 2 ? 3 : 2;
                          return (
                            <div key={star} className="flex items-center">
                              <span className="w-4 text-gray-600 font-medium">{star}</span>
                              <div className="flex items-center ml-2 mr-2">
                                <svg className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.799-2.034c-.784-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                </svg>
                              </div>
                              <div className="flex-grow">
                                <div className="h-2 bg-gray-200 rounded-full">
                                  <div className="h-full bg-yellow-400 rounded-full" style={{ width: `${percentage}%` }} />
                                </div>
                              </div>
                              <span className="w-10 text-right text-gray-500 text-sm">{percentage}%</span>
                            </div>
                          );
                        })}
                      </div>
                      <button className="bg-gray-100 hover:bg-gray-200 text-gray-800 font-medium py-2 px-6 rounded-lg transition-colors text-sm">
                        Escribir opinión
                      </button>
                    </div>
                    <div className="space-y-8">
                      { [
                        { name: 'Carlos M.', rating: 5, date: '10/04/2025', comment: 'Excelente calidad y muy cómodo de usar.' },
                        { name: 'Laura G.', rating: 4, date: '12/04/2025', comment: 'Buen accesorio, cumple con mis expectativas.' },
                      ].map((review, index) => (
                        <div key={index} className="border-b border-gray-200 pb-6 last:border-0 last:pb-0">
                          <div className="flex justify-between mb-2">
                            <div className="flex items-center">
                              <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-semibold mr-3">
                                {review.name.charAt(0)}
                              </div>
                              <div>
                                <h4 className="font-medium text-gray-800">{review.name}</h4>
                                <div className="flex items-center text-sm text-gray-500">
                                  <span className="mr-2">{review.date}</span>
                                  <div className="flex text-yellow-400">
                                    {[...Array(5)].map((_, i) => (
                                      <svg key={i} className={`w-4 h-4 ${i < review.rating ? 'text-yellow-400' : 'text-gray-300'}`} fill="currentColor" viewBox="0 0 20 20">
                                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.799-2.034c-.784-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                      </svg>
                                    ))}
                                  </div>
                                </div>
                              </div>
                            </div>
                            <button className="text-gray-500 hover:text-blue-600">
                              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 12h.01M12 12h.01M19 12h.01" />
                              </svg>
                            </button>
                          </div>
                          <p className="text-gray-700 text-sm">{review.comment}</p>
                          <div className="mt-3 flex items-center space-x-3">
                            <button className="text-sm text-gray-500 hover:text-blue-600 flex items-center">
                              <svg className="flex-shrink-0 w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                  d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20
                                  m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9
                                  m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5"
                                />
                              </svg>
                              Útil (3)
                            </button>
                            <button className="text-sm text-gray-500 hover:text-blue-600">Responder</button>
                          </div>
                        </div>
                      ))}
                      <div className="mt-6 flex justify-center">
                        <button className="text-sm text-blue-600 hover:text-blue-800 font-medium">Ver más opiniones</button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Productos relacionados */}
        {accesoriosRelacionados.length>0 && (
          <div className="p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Productos Relacionados</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {accesoriosRelacionados.map(item=>(
                <div key={item.id} className="group bg-white rounded-xl overflow-hidden shadow-sm border border-gray-100">
                  <Link to={`/accesorios/${item.id}`}>
                    <div className="aspect-square overflow-hidden bg-gray-50 p-4 flex items-center justify-center">
                      <img src={item.img} alt={item.nombre} className="w-full h-full object-contain transition-transform duration-300 group-hover:scale-105" />
                    </div>
                    <div className="p-4">
                      <h3 className="text-sm font-medium text-gray-700 mb-1">{item.nombre}</h3>
                      <p className="text-base font-bold text-gray-900">{item.precio}€</p>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AccessorioDetail;
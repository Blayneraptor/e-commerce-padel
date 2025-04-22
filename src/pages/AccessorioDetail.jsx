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

  // Características para mostrar en pestaña
  const caracteristicas = [
    { name: 'Tipo', value: accesorio.tipo },
    { name: 'Precio', value: `${accesorio.precio}€` }
  ];

  return (
    <div className="bg-gray-50 min-h-screen pt-16">
      {/* Breadcrumbs */}
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
        <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-6">
            {/* Image */}
            <div className="bg-gray-100 rounded-lg overflow-hidden p-8 flex items-center justify-center">
              <img src={accesorio.img} alt={accesorio.nombre} className="max-h-[400px] object-contain" />
            </div>

            {/* Info */}
            <div className="space-y-6">
              <div>
                <div className="flex items-center mb-1">
                  <span className="text-sm font-semibold bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full">{accesorio.tipo}</span>
                  <span className="ml-2 text-sm text-gray-500">Ref: {accesorio.id}</span>
                </div>
                <h1 className="text-3xl font-bold text-gray-900 mb-1">{accesorio.nombre}</h1>
              </div>
              <div>
                <p className="text-3xl font-bold text-gray-900">{accesorio.precio}€</p>
                <p className="text-sm font-medium text-gray-700 mt-1">IVA incluido</p>
              </div>
              <div className="flex items-center space-x-4">
                <div className="flex items-center border border-gray-300 rounded-lg">
                  <button onClick={() => handleCantidad('decrementar')} disabled={cantidad===1} className="px-3 py-1 disabled:opacity-50 hover:bg-gray-100">-</button>
                  <span className="px-4 py-1 border-x border-gray-300 min-w-[40px] text-center">{cantidad}</span>
                  <button onClick={() => handleCantidad('incrementar')} className="px-3 py-1 hover:bg-gray-100">+</button>
                </div>
                <button onClick={handleAddToCart} disabled={addedToCart} className={`bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-lg transition ${addedToCart?'bg-green-600':''}`}> 
                  {addedToCart ? 'Añadido' : 'Añadir al carrito'}
                </button>
                <button className="bg-gray-100 hover:bg-gray-200 text-gray-800 font-medium py-3 px-6 rounded-lg">Favorito</button>
              </div>
            </div>
          </div>

          {/* Tabs */}
          <div className="border-t border-gray-200 mt-8">
            <div className="flex">
              <button onClick={() => setActiveTab('descripcion')} className={`px-8 py-4 border-b-2 font-medium text-sm transition-colors ${activeTab==='descripcion'?'border-blue-600 text-blue-600':'border-transparent text-gray-500 hover:text-gray-700'}`}>Descripción</button>
              <button onClick={() => setActiveTab('caracteristicas')} className={`px-8 py-4 border-b-2 font-medium text-sm transition-colors ${activeTab==='caracteristicas'?'border-blue-600 text-blue-600':'border-transparent text-gray-500 hover:text-gray-700'}`}>Características</button>
              <button onClick={() => setActiveTab('opiniones')} className={`px-8 py-4 border-b-2 font-medium text-sm transition-colors ${activeTab==='opiniones'?'border-blue-600 text-blue-600':'border-transparent text-gray-500 hover:text-gray-700'}`}>Opiniones</button>
            </div>
            <div className="p-6">
              {activeTab==='descripcion' && <div className="prose max-w-none"><p>{accesorio.descripcion|| 'Sin descripción disponible.'}</p></div>}
              {activeTab==='caracteristicas' && <div className="space-y-4"><ul className="space-y-2">{caracteristicas.map(c=><li key={c.name} className="flex"><span className="w-40 font-medium text-gray-600">{c.name}:</span><span className="ml-2 text-gray-800">{c.value}</span></li>)}</ul></div>}
              {activeTab==='opiniones' && <div className="space-y-4"><p className="text-gray-500">Sin opiniones aún.</p></div>}
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
    </div>
  );
};

export default AccessorioDetail;
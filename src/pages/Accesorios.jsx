import React, { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import accesorios from "../data/accesorios.json";
import pelotas from "../data/pelotas.json";
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
  const [lastViewedAccesorio, setLastViewedAccesorio] = useState(null);
  const accesorioRefs = useRef({});
  // Referencia para rastrear el primer montaje
  const firstMount = useRef(true);
  
  const accesoriosPorPagina = 20;

  // Añadir manejo de especificaciones y limpieza de datos
  const limpiarAtributos = (atributos) => {
    const atributosLimpios = {};
    for (const [clave, valor] of Object.entries(atributos)) {
      if (valor && valor.toLowerCase() !== "unknown" && valor.toLowerCase() !== "none") {
        atributosLimpios[clave] = valor;
      }
    }
    return atributosLimpios;
  };

  // Asignar tipo a cada producto basado en sus atributos
  const procesarProductos = () => {
    // Asignar tipo a los productos basado en atributos
    return [...accesorios, ...pelotas].map(producto => {
      let tipo = "Otro";
      
      // Si es una pelota, le asignamos el tipo "Pelotas"
      if (producto.atributos && producto.atributos["Producto"] === "Pelotas") {
        tipo = "Pelotas";
      }
      // Si es un accesorio, procesamos su tipo específico
      else if (producto.atributos && producto.atributos["Producto"] === "Accesorios") {
        // Verificamos si tiene un tipo de accesorio específico
        if (producto.atributos["Accesorios para Palas y Pelotas"] === "Protectores De Palas") {
          tipo = "Protectores De Palas";
        } else if (producto.atributos["Accesorios para Palas y Pelotas"] === "Overgrips") {
          tipo = "Overgrips";
        } else if (producto.atributos["Accesorios Textil"] === "Muñequeras") {
          tipo = "Muñequeras";
        } else if (producto.atributos["Accesorios Textil"] === "Gorras Y Viseras") {
          tipo = "Gorras Y Viseras";
        } else if (producto.atributos["Accesorios Entrenamiento"] === "Material Club Padel") {
          tipo = "Material Club Padel";
        } else if (producto.atributos["Accesorios Entrenamiento"] === "Prevención Y Lesiones") {
          tipo = "Prevención Y Lesiones";
        }
      }
      
      // Guardar los atributos originales y el tipo asignado
      return {
        ...producto,
        tipo: tipo,
        atributosOriginales: { ...producto.atributos } // Mantener una copia de los atributos originales
      };
    });
  };

  // Procesar los productos una vez al cargar el componente
  const todosLosProductos = procesarProductos();

  // Modificar la función de filtrado para trabajar con los tipos asignados
  const filtrarAccesorios = () => {
    let filtrados = todosLosProductos.filter((item) => {
      // Para "Accesorios Entrenamiento" mostrar todos los productos que tengan ese atributo
      if (filtroTipo === "Accesorios Entrenamiento") {
        return item.atributosOriginales && 
               item.atributosOriginales["Accesorios Entrenamiento"] && 
               item.nombre.toLowerCase().includes(busqueda.toLowerCase());
      }
      
      // Para "Overgrips" incluir todos los que tengan este valor específico
      if (filtroTipo === "Overgrips") {
        return item.atributosOriginales && 
               item.atributosOriginales["Accesorios para Palas y Pelotas"] === "Overgrips" &&
               item.nombre.toLowerCase().includes(busqueda.toLowerCase());
      }

      // Para "Protectores De Palas" incluir todos los que tengan este valor específico
      if (filtroTipo === "Protectores De Palas") {
        return item.atributosOriginales && 
               item.atributosOriginales["Accesorios para Palas y Pelotas"] === "Protectores De Palas" &&
               item.nombre.toLowerCase().includes(busqueda.toLowerCase());
      }

      // Para "Muñequeras" y "Gorras Y Viseras" filtrar por estos valores específicos
      if (filtroTipo === "Muñequeras" || filtroTipo === "Gorras Y Viseras") {
        return item.atributosOriginales && 
               item.atributosOriginales["Accesorios Textil"] === filtroTipo &&
               item.nombre.toLowerCase().includes(busqueda.toLowerCase());
      }
      
      // Para otros tipos, filtrar como antes
      const tipoCondicion = filtroTipo === "Todos" || item.tipo === filtroTipo;
      const busquedaCondicion = item.nombre.toLowerCase().includes(busqueda.toLowerCase());
      return tipoCondicion && busquedaCondicion;
    });

    // Ordenar por precio - usar precio_actual en vez de precio
    filtrados.sort((a, b) =>
      ordenPrecio === "asc" ? a.precio_actual - b.precio_actual : b.precio_actual - a.precio_actual
    );

    return filtrados;
  };

  // Obtener categorías únicas para filtrar
  const categorias = Array.from(
    new Set([
      ...todosLosProductos.map(item => item.tipo),
      "Accesorios Entrenamiento" // Añadimos manualmente esta categoría
    ])
  ).sort();

  // Efecto para la animación del banner
  useEffect(() => {
    const timer = setTimeout(() => {
      setBannerVisible(true);
    }, 300);
    return () => clearTimeout(timer);
  }, []);

  // Recuperar la página guardada, filtros, y el último accesorio visto cuando el componente se monta
  useEffect(() => {
    // Recuperar la página guardada
    const savedPage = localStorage.getItem('accesoriosPage');
    if (savedPage) {
      setPaginaActual(parseInt(savedPage));
    }
    
    // Recuperar los filtros guardados
    const savedFiltroTipo = localStorage.getItem('accesoriosFiltroTipo');
    if (savedFiltroTipo) {
      setFiltroTipo(savedFiltroTipo);
    }
    
    const savedOrdenPrecio = localStorage.getItem('accesoriosOrdenPrecio');
    if (savedOrdenPrecio) {
      setOrdenPrecio(savedOrdenPrecio);
    }
    
    const savedBusqueda = localStorage.getItem('accesoriosBusqueda');
    if (savedBusqueda) {
      setBusqueda(savedBusqueda);
    }
    
    // Recuperar el accesorio visto por última vez
    const savedAccesorioId = localStorage.getItem('lastViewedAccesorioProduct');
    if (savedAccesorioId) {
      setLastViewedAccesorio(savedAccesorioId);
    }
    
    // Limpiar el localStorage después de usarlo
    localStorage.removeItem('accesoriosPage');
    localStorage.removeItem('accesoriosFiltroTipo');
    localStorage.removeItem('accesoriosOrdenPrecio');
    localStorage.removeItem('accesoriosBusqueda');
    localStorage.removeItem('lastViewedAccesorioProduct');
  }, []);

  // Leer parámetro tipo de la URL y aplicar filtro
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const tipoParam = params.get('tipo');
    
    // Solo actualizar desde URL si estamos en la primera carga y hay parámetros
    if (firstMount.current && tipoParam) {
      setFiltroTipo(tipoParam);
      // Marcar que ya no estamos en el primer montaje
      firstMount.current = false;
      // Solo reseteamos la página a 1 en la primera carga con parámetros
      setPaginaActual(1);
    }
  }, [location.search]);

  // Efecto para desplazarse al accesorio visto por última vez
  useEffect(() => {
    // Solo proceder si tenemos un accesorio para mostrar
    if (lastViewedAccesorio) {
      // Buscar el producto en todos los accesorios filtrados
      const todosLosAccesoriosFiltrados = filtrarAccesorios();
      const accesorioIndex = todosLosAccesoriosFiltrados.findIndex(p => p.id === lastViewedAccesorio);
      
      // Si encontramos el accesorio en los accesorios filtrados
      if (accesorioIndex !== -1) {
        // Calcular en qué página debería estar
        const paginaDelAccesorio = Math.floor(accesorioIndex / accesoriosPorPagina) + 1;
        
        // Si no está en la página actual, cambiar a esa página
        if (paginaDelAccesorio !== paginaActual) {
          console.log(`Producto encontrado en página ${paginaDelAccesorio}, cambiando desde página ${paginaActual}`);
          setPaginaActual(paginaDelAccesorio);
          return; // Salir y esperar a que el cambio de página actualice accesoriosVisibles
        }

        // Si está en la página actual, asegurarnos de que los accesorios estén cargados
        if (accesoriosVisibles.length > 0) {
          // Verificar si el accesorio está en los accesorios visibles
          const accesorioEncontrado = accesoriosVisibles.find(p => p.id === lastViewedAccesorio);
          if (!accesorioEncontrado) {
            console.log("Accesorio no encontrado en la página actual aunque debería estar. Recargando...");
            return; // Esperar a la siguiente actualización
          }
          
          // Si llegamos aquí, el accesorio está en los accesorios visibles
          setTimeout(() => {
            const accesorioElement = accesorioRefs.current[lastViewedAccesorio];
            if (accesorioElement) {
              console.log("Desplazándose al accesorio:", lastViewedAccesorio);
              
              // Scroll a la sección de productos primero
              const productosListaElement = document.getElementById("productos-lista");
              if (productosListaElement) {
                productosListaElement.scrollIntoView({ behavior: 'smooth' });
                
                // Luego scroll al producto específico
                setTimeout(() => {
                  accesorioElement.scrollIntoView({ 
                    behavior: 'smooth', 
                    block: 'center'
                  });
                  
                  // Destacar el accesorio de forma más visible
                  accesorioElement.style.transition = "all 0.5s ease";
                  accesorioElement.classList.add('ring-4', 'ring-blue-500', 'ring-offset-2', 'shadow-lg');
                  
                  // Animar para llamar la atención y luego quitar el estilo
                  setTimeout(() => {
                    accesorioElement.classList.remove('ring-4', 'ring-blue-500', 'ring-offset-2', 'shadow-lg');
                  }, 3000); // Mantener el resaltado por 3 segundos
                }, 300);
              }
            } else {
              console.log("Elemento de accesorio no encontrado en el DOM:", lastViewedAccesorio);
            }
            
            // Limpiar después de desplazarse
            setLastViewedAccesorio(null);
          }, 500);
        }
      } else {
        console.log("Accesorio no encontrado con los filtros actuales:", lastViewedAccesorio);
        setLastViewedAccesorio(null);
      }
    }
  }, [lastViewedAccesorio, accesoriosVisibles, paginaActual, accesoriosPorPagina]);

  // Efecto para desplazarse al primer elemento cuando cambia el filtro
  useEffect(() => {
    if (accesoriosVisibles.length > 0) {
      // Solo hacemos scroll al primer elemento cuando cambia el filtro de tipo
      // Y SOLO si no hay un producto específico que ver (lastViewedAccesorio)
      // Y SOLO si no estamos volviendo de una página de detalles
      const volviendoDeDetalles = localStorage.getItem('lastViewedAccesorioProduct') !== null;
      
      if (filtroTipo !== "Todos" && !lastViewedAccesorio && !volviendoDeDetalles) {
        // Esperar a que la UI se actualice
        setTimeout(() => {
          const productosListaElement = document.getElementById("productos-lista");
          if (productosListaElement) {
            productosListaElement.scrollIntoView({ behavior: 'smooth' });
            
            // Opcional: Destacar el primer elemento brevemente
            const primerProductoElement = accesorioRefs.current[accesoriosVisibles[0]?.id];
            if (primerProductoElement) {
              primerProductoElement.classList.add('ring-2', 'ring-blue-500', 'ring-offset-2');
              setTimeout(() => {
                primerProductoElement.classList.remove('ring-2', 'ring-blue-500', 'ring-offset-2');
              }, 2000);
            }
          }
        }, 300);
      }
    }
  }, [filtroTipo, accesoriosVisibles, lastViewedAccesorio]);

  // Dynamic page count based on filtered results
  const filteredCount = filtrarAccesorios().length;
  const paginas = Math.ceil(filteredCount / accesoriosPorPagina);

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

  // Función para guardar la página actual, el filtro y el ID del accesorio antes de navegar a los detalles
  const handleAccesorioClick = (accesorioId) => {
    // Guardar la página actual
    localStorage.setItem('accesoriosPage', paginaActual.toString());
    
    // Guardar el filtro actual
    localStorage.setItem('accesoriosFiltroTipo', filtroTipo);
    localStorage.setItem('accesoriosOrdenPrecio', ordenPrecio);
    
    // Si hay búsqueda, también la guardamos
    if (busqueda) {
      localStorage.setItem('accesoriosBusqueda', busqueda);
    }
    
    // Guardar el ID del producto visualizado
    localStorage.setItem('lastViewedAccesorioProduct', accesorioId);
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
                  <option value="Todos">Todos los productos</option>
                  {categorias.map((categoria) => (
                    <option key={categoria} value={categoria}>
                      {categoria}
                    </option>
                  ))}
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                  <svg className="w-5 h-5 text-gray-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 011.414 1.414l-4 4a1 1-1.414 0l-4-4a1 1-1.414z" clipRule="evenodd"></path>
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
                    <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 011.414 1.414l-4 4a1 1-1.414 0l-4-4a1 1-1.414z" clipRule="evenodd"></path>
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
                      ref={el => accesorioRefs.current[accesorio.id] = el}
                      to={`/accesorios/${accesorio.id}`}
                      onClick={() => handleAccesorioClick(accesorio.id)}
                      className="block h-full overflow-hidden rounded-xl bg-white shadow-sm transition-all duration-300 hover:shadow-lg border border-gray-100"
                    >
                      {/* Imagen */}
                      <div className="aspect-square overflow-hidden bg-gray-50 p-4">
                        <img
                          src={accesorio.img.startsWith('/assets') ? accesorio.img : `/assets${accesorio.img}`}
                          alt={accesorio.nombre}
                          className="h-full w-full object-contain object-center transition-transform duration-500 group-hover:scale-105"
                        />
                      </div>
                      
                      {/* Detalles */}
                      <div className="p-4 bg-white border-t border-gray-100">
                        <h3 className="text-sm text-gray-700 font-medium mb-1">{accesorio.nombre}</h3>
                        <div className="flex items-center">
                          <p className="text-base font-bold text-gray-900">{accesorio.precio_actual}€</p>
                          {accesorio.precio_antiguo && (
                            <p className="ml-2 text-sm line-through text-gray-500">{accesorio.precio_antiguo}€</p>
                          )}
                        </div>
                        
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
            {paginas > 1 && (
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
                
                {/* Primera página */}
                {paginaActual > 3 && (
                  <>
                    <button
                      onClick={() => cambiarPagina(1)}
                      className="px-3 py-1 rounded-md text-gray-700 hover:bg-gray-100"
                    >
                      1
                    </button>
                    <span className="px-2 text-gray-700">...</span>
                  </>
                )}
                
                {/* Páginas alrededor de la página actual */}
                {Array.from({ length: paginas }).map((_, index) => {
                  const pageNumber = index + 1;
                  
                  // Mostrar máximo 3 páginas alrededor de la página actual
                  let visibleRange = 1; // 1 página a cada lado
                  
                  const shouldShowPage = 
                    // Páginas iniciales (siempre mostrar 1-3 si estamos en esas páginas)
                    (paginaActual <= 3 && pageNumber <= 3) ||
                    // Páginas finales (siempre mostrar las últimas 3 si estamos en esas páginas)
                    (paginaActual >= paginas - 2 && pageNumber >= paginas - 2) ||
                    // Páginas en el rango visible alrededor de la actual
                    (pageNumber >= paginaActual - visibleRange && pageNumber <= paginaActual + visibleRange);
                  
                  // No mostrar la primera o última página aquí si ya se muestra por separado
                  if ((pageNumber === 1 && paginaActual > 3) || 
                      (pageNumber === paginas && paginaActual < paginas - 2)) {
                    return null;
                  }
                  
                  return shouldShowPage ? (
                    <button
                      key={pageNumber}
                      onClick={() => cambiarPagina(pageNumber)}
                      className={`px-3 py-1 rounded-md ${
                        paginaActual === pageNumber
                          ? 'bg-blue-600 text-white'
                          : 'text-gray-700 hover:bg-gray-100'
                      }`}
                    >
                      {pageNumber}
                    </button>
                  ) : null;
                })}
                
                {/* Última página */}
                {paginaActual < paginas - 2 && (
                  <>
                    <span className="px-2 text-gray-700">...</span>
                    <button
                      onClick={() => cambiarPagina(paginas)}
                      className="px-3 py-1 rounded-md text-gray-700 hover:bg-gray-100"
                    >
                      {paginas}
                    </button>
                  </>
                )}
                
                <button
                  onClick={() => paginaActual < paginas && cambiarPagina(paginaActual + 1)}
                  disabled={paginaActual === paginas}
                  className={`p-2 rounded-full ${
                    paginaActual === paginas
                      ? 'text-gray-400 cursor-not-allowed'
                      : 'text-blue-600 hover:bg-blue-50 hover:text-blue-800'
                  }`}
                >
                  <span className="sr-only">Siguiente</span>
                  <img src={flechaIcon} alt="Siguiente" className="h-4 w-4" />
                </button>
              </nav>
            </AnimateOnScroll>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Accesorios;

import React, { useState } from "react";

// Datos de ejemplo (puedes sustituirlo por una API o datos reales)
const productos = [
  { id: 1, nombre: "Pala Power", tipo: "Ofensiva", precio: 150, img: "https://via.placeholder.com/150" },
  { id: 2, nombre: "Pala Control", tipo: "Defensiva", precio: 120, img: "https://via.placeholder.com/150" },
  { id: 3, nombre: "Pala All Round", tipo: "Equilibrada", precio: 130, img: "https://via.placeholder.com/150" },
  { id: 4, nombre: "Pala Pro", tipo: "Ofensiva", precio: 180, img: "https://via.placeholder.com/150" },
  { id: 5, nombre: "Pala Novata", tipo: "Principiante", precio: 80, img: "https://via.placeholder.com/150" },
  { id: 6, nombre: "Pala Avanzada", tipo: "Defensiva", precio: 170, img: "https://via.placeholder.com/150" },
  // Nuevos productos
  { id: 7, nombre: "Pala Elite", tipo: "Equilibrada", precio: 200, img: "https://via.placeholder.com/150" },
  { id: 8, nombre: "Pala Titan", tipo: "Ofensiva", precio: 220, img: "https://via.placeholder.com/150" },
  { id: 9, nombre: "Pala Mach", tipo: "Defensiva", precio: 140, img: "https://via.placeholder.com/150" },
  { id: 10, nombre: "Pala Ultra", tipo: "Ofensiva", precio: 210, img: "https://via.placeholder.com/150" },
  { id: 11, nombre: "Pala Rookie", tipo: "Principiante", precio: 90, img: "https://via.placeholder.com/150" },
  { id: 12, nombre: "Pala Master", tipo: "Equilibrada", precio: 195, img: "https://via.placeholder.com/150" },
];

const ProductPage = () => {
  // Estados para filtros
  const [filtroTipo, setFiltroTipo] = useState("Todos");
  const [filtroPrecio, setFiltroPrecio] = useState("Todos");
  const [busqueda, setBusqueda] = useState("");

  // Filtrar productos según tipo, precio y búsqueda
  const filtrarProductos = () => {
    return productos.filter((producto) => {
      const tipoCondicion = filtroTipo === "Todos" || producto.tipo === filtroTipo;
      const precioCondicion =
        filtroPrecio === "Todos" ||
        (filtroPrecio === "Menor de 150" ? producto.precio < 150 : producto.precio >= 150);
      const busquedaCondicion =
        producto.nombre.toLowerCase().includes(busqueda.toLowerCase());
      return tipoCondicion && precioCondicion && busquedaCondicion;
    });
  };

  return (
    <div id="productos" className="container mx-auto p-4">
      <div className="flex flex-col sm:flex-row justify-between items-center mb-6 space-y-4 sm:space-y-0">
        <h1 className="text-3xl font-bold text-gray-800">Productos de Padel</h1>
        {/* Filtros y búsqueda */}
        <div className="flex space-x-4">
          <select
            onChange={(e) => setFiltroTipo(e.target.value)}
            value={filtroTipo}
            className="p-2 border border-gray-300 rounded"
          >
            <option value="Todos">Todos los tipos</option>
            <option value="Ofensiva">Ofensiva</option>
            <option value="Defensiva">Defensiva</option>
            <option value="Equilibrada">Equilibrada</option>
            <option value="Principiante">Principiante</option>
          </select>
          <select
            onChange={(e) => setFiltroPrecio(e.target.value)}
            value={filtroPrecio}
            className="p-2 border border-gray-300 rounded"
          >
            <option value="Todos">Todos los precios</option>
            <option value="Menor de 150">Menor de 150</option>
            <option value="150 o más">150 o más</option>
          </select>
          {/* Campo de búsqueda */}
          <input
            type="text"
            placeholder="Buscar pala..."
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
            className="p-2 border border-gray-300 rounded"
          />
        </div>
      </div>
      {/* Lista de productos */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {filtrarProductos().map((producto) => (
          <div key={producto.id} className="bg-white p-4 rounded-lg shadow-lg">
            <img src={producto.img} alt={producto.nombre} className="w-full h-48 object-cover rounded-md mb-4" />
            <h3 className="text-xl font-semibold text-gray-700">{producto.nombre}</h3>
            <p className="text-gray-500">{producto.tipo}</p>
            <p className="text-lg font-bold text-blue-600">${producto.precio}</p>
            <button className="mt-4 w-full py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition">
              Añadir al carrito
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductPage;
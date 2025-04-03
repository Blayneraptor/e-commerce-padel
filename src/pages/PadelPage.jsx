import React, { useState } from "react";
import productos from "../data/productos.json";

const PadelPage = () => {
  // Estados para filtros y búsqueda
  const [filtroTipo, setFiltroTipo] = useState("Todos");
  const [ordenPrecio, setOrdenPrecio] = useState("desc"); // "desc": mayor a menor, "asc": menor a mayor
  const [busqueda, setBusqueda] = useState("");

  // Función para filtrar y ordenar los productos
  const filtrarProductos = () => {
    // Filtrar por tipo y búsqueda
    let filtrados = productos.filter((producto) => {
      const tipoCondicion = filtroTipo === "Todos" || producto.tipo === filtroTipo;
      const busquedaCondicion = producto.nombre.toLowerCase().includes(busqueda.toLowerCase());
      return tipoCondicion && busquedaCondicion;
    });

    // Ordena según el precio
    filtrados.sort((a, b) =>
      ordenPrecio === "asc" ? a.precio - b.precio : b.precio - a.precio
    );

    return filtrados;
  };

  return (
    <div id="productos" className="border p-4 flex flex-col items-center">
      <div className="flex flex-col sm:flex-row justify-between items-center mb-6 space-y-4 sm:space-y-0">
        <h1 className="text-3xl font-bold text-gray-800">Palas de Pádel</h1>
        {/* Filtros y búsqueda */}
        <div className="flex space-x-4">
          <select
            value={filtroTipo}
            onChange={(e) => setFiltroTipo(e.target.value)}
            className="p-2 border border-gray-300 rounded"
          >
            <option value="Todos">Todos los tipos</option>
            <option value="Ofensiva">Ofensiva</option>
            <option value="Defensiva">Defensiva</option>
            <option value="Equilibrada">Equilibrada</option>
            <option value="Principiante">Principiante</option>
          </select>
          <select
            value={ordenPrecio}
            onChange={(e) => setOrdenPrecio(e.target.value)}
            className="p-2 border border-gray-300 rounded"
          >
            <option value="desc">Mayor a Menor</option>
            <option value="asc">Menor a Mayor</option>
          </select>
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
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
        {filtrarProductos().map((producto) => (
          <div key={producto.id} className="bg-white p-4 rounded-lg shadow-lg">
            <img
              src={producto.img}
              alt={producto.nombre}
              className="w-full h-48 object-cover rounded-md mb-4"
            />
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

export default PadelPage;
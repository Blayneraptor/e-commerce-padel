import React, { useState } from "react";
import productos from "../data/productos.json";

const PadelPage = () => {
  // Estados para filtros y búsqueda
  const [filtroTipo, setFiltroTipo] = useState("Todos");
  const [ordenPrecio, setOrdenPrecio] = useState("desc"); // "desc": mayor a menor, "asc": menor a mayor
  const [busqueda, setBusqueda] = useState("");

  // Filtra las palas según el tipo y la búsqueda
  const filtrarProductos = () => {
    let filtrados = productos.filter((producto) => {
      const tipoCondicion =
        filtroTipo === "Todos" || producto.tipo === filtroTipo;
      const busquedaCondicion = producto.nombre
        .toLowerCase()
        .includes(busqueda.toLowerCase());
      return tipoCondicion && busquedaCondicion;
    });
    // Ordena según el precio
    filtrados.sort((a, b) =>
      ordenPrecio === "asc" ? a.precio - b.precio : b.precio - a.precio
    );
    return filtrados;
  };

  return (
    <div id="productos" className="container mx-auto p-12">
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
            <option value="desc">Precio: Mayor a Menor</option>
            <option value="asc">Precio: Menor a Mayor</option>
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
<div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3">
  {filtrarProductos().map((producto) => (
    <div key={producto.id} className="bg-white p-3 rounded-md shadow-md text-sm">
      <img
        src={producto.img}
        alt={producto.nombre}
        className="w-full h-max object-cover rounded-md mb-3"
      />
      <h3 className="text-lg font-semibold text-gray-700">{producto.nombre}</h3>
      <p className="text-gray-500">{producto.tipo}</p>
      <p className="text-md font-bold text-blue-600">${producto.precio}</p>
      <button className="mt-3 w-full py-1.5 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition text-sm">
        Añadir al carrito
      </button>
    </div>
  ))}
</div>

    </div>
  );
};

export default PadelPage;

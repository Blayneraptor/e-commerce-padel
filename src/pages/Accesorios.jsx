import React, { useState } from "react";
import accesorios from "../data/accesorios.json";

const Accesorios = () => {
  // Estados para filtros y búsqueda
  const [filtroTipo, setFiltroTipo] = useState("Todos");
  const [ordenPrecio, setOrdenPrecio] = useState("desc"); // "desc": mayor a menor, "asc": menor a mayor
  const [busqueda, setBusqueda] = useState("");

  // Filtra los accesorios según el tipo y la búsqueda
  const filtrarAccesorios = () => {
    let filtrados = accesorios.filter((accesorio) => {
      const tipoCondicion =
        filtroTipo === "Todos" || accesorio.tipo === filtroTipo;
      const busquedaCondicion = accesorio.nombre
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
    <div id="productos" className="container mx-auto p-4">
      <div className="flex flex-col sm:flex-row justify-between items-center mb-6 space-y-4 sm:space-y-0">
        <h1 className="text-3xl font-bold text-gray-800">
          Accesorios de Pádel
        </h1>
        {/* Filtros y búsqueda */}
        <div className="flex space-x-4">
          <select
            value={filtroTipo}
            onChange={(e) => setFiltroTipo(e.target.value)}
            className="p-2 border border-gray-300 rounded"
          >
            <option value="Todos">Todos los tipos</option>
            <option value="Pelotas">Pelotas</option>
            <option value="Overgrip">Overgrip</option>
            <option value="Muñequeras">Muñequeras</option>
            <option value="Bolsas">Bolsas</option>
            <option value="Protector">Protector</option>
            <option value="Ropa">Ropa</option>
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
            placeholder="Buscar accesorio..."
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
            className="p-2 border border-gray-300 rounded"
          />
        </div>
      </div>
      {/* Lista de accesorios */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {filtrarAccesorios().map((accesorio) => (
          <div
            key={accesorio.id}
            className="bg-white p-4 rounded-lg shadow-lg"
          >
            <img
              src={accesorio.img}
              alt={accesorio.nombre}
              className="w-full h-48 object-cover rounded-md mb-4"
            />
            <h3 className="text-xl font-semibold text-gray-700">
              {accesorio.nombre}
            </h3>
            <p className="text-gray-500">{accesorio.tipo}</p>
            <p className="text-lg font-bold text-blue-600">
              ${accesorio.precio}
            </p>
            <button className="mt-4 w-full py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition">
              Añadir al carrito
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Accesorios;
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
    <div id="productos" className="container mx-auto p-12">
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

      {/* Nueva estructura de lista de productos */}
      <div className="mx-auto py-8 px-4 sm:px-6 w-full max-w-7xl bg-white">
        <div className="mx-auto max-w-2xl lg:max-w-none">
          {/* :PRODUCT LIST */}
          <div className="mt-6">
            <ul className="grid grid-cols-4 gap-10">
              {filtrarAccesorios().map((accesorio) => (
                <li
                  key={accesorio.id}
                  className="col-span-full sm:col-span-2 lg:col-span-1 group shadow-sm rounded border border-gray-50 hover:shadow-md"
                >
                  <a
                    href={`/accesorios/${accesorio.id}`}
                    className="p-2 flex flex-col"
                  >
                    {/* ::Picture */}
                    <div className="aspect-w-1 aspect-h-1 w-full h-full overflow-hidden filter group-hover:brightness-110">
                      <img
                        src={accesorio.img}
                        alt={accesorio.nombre}
                        className="w-full h-full object-cover object-center"
                      />
                    </div>
                    {/* ::Product Details */}
                    <div className="mt-5 pt-4 pb-2 border-t-2 border-gray-100 flex flex-col items-center">
                      <h3 className="text-base text-gray-500 font-medium">
                        {accesorio.nombre}
                      </h3>
                      <p className="p-1.5 text-lg text-gray-700 font-semibold">
                        {accesorio.precio}€
                      </p>
                      {/* :BIG BUTTON 1 */}
                      <button className="group relative inline-flex items-center px-16 py-1 rounded shadow-lg outline-none bg-gray-200 text-md text-gray-900 font-medium transition-all duration-200 ease-out hover:text-gray-700 hover:from-transparent hover:to-transparent hover:shadow-none active:top-0.5 focus:outline-none">
                        {/* span::before */}
                        <span
                          className="absolute h-0 w-0.5 right-0 top-0 bg-gradient-to-br from-gray-500 via-white to-gray-500 transition-all duration-500 ease-out group-hover:h-full"
                          aria-hidden="true"
                        />
                        <span
                          className="absolute left-0 bottom-0 bg-gradient-to-br from-gray-500 via-white to-gray-500 transition-all duration-500 ease-out w-0.5 h-0 group-hover:h-full"
                          aria-hidden="true"
                        />
                        Añadir al carrito
                        {/* span::after */}
                        <span
                          className="absolute left-0 bottom-0 bg-gradient-to-br from-gray-500 via-white to-gray-500 transition-all duration-500 ease-out w-0 h-0.5 group-hover:w-full"
                          aria-hidden="true"
                        />
                        <span
                          className="absolute w-0 h-0.5 right-0 top-0 bg-gradient-to-br from-gray-500 via-white to-gray-500 transition-all duration-500 ease-out group-hover:w-full"
                          aria-hidden="true"
                        />
                      </button>
                    </div>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Accesorios;

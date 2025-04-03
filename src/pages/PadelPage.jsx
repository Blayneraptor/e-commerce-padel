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
      
      {/* Nueva estructura de lista de productos */}
      <div className="mx-auto py-8 px-4 sm:px-6 w-full max-w-7xl bg-white">
        <div className="mx-auto max-w-2xl lg:max-w-none">
      
          
          {/* :PRODUCT LIST */}
          <div className="mt-6">
            <ul className="grid grid-cols-4 gap-10">
              {filtrarProductos().map((producto) => (
                <li
                  key={producto.id}
                  className="col-span-full sm:col-span-2 lg:col-span-1 group shadow-sm rounded border border-gray-50 hover:shadow-md"
                >
                  <a
                    href={`/palas-de-padel/${producto.id}`}
                    className="p-2 flex flex-col"
                  >
                    {/* ::Picture */}
                    <div className="aspect-w-1 aspect-h-1 w-full h-full overflow-hidden filter group-hover:brightness-110">
                      <img
                        src={producto.img}
                        alt={producto.nombre}
                        className="w-full h-full object-cover object-center"
                      />
                    </div>
                    {/* ::Product Details */}
                    <div className="mt-5 pt-4 pb-2 border-t-2 border-gray-100 flex flex-col items-center">
                      <h3 className="text-base text-gray-500 font-medium">
                        {producto.nombre}
                      </h3>
                      <p className="text-lg text-gray-700 font-semibold">
                        {producto.precio}€
                      </p>
                      <button className="mt-4 py-1.5 w-full rounded-md bg-gray-200 text-sm text-gray-600 font-semibold tracking-wide hover:bg-gray-300 hover:text-gray-800">Añadir al carrito</button>
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

export default PadelPage;
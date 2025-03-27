import React from "react";
import palas from "../data/productos.json";
import accesorios from "../data/accesorios.json";
import DraggableCarousel from "../components/DraggableCarousel";

const ProductPage = () => {
  return (
    <div id="productos" className="container mx-auto p-4">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Catálogo General</h1>
      
      {/* Sección de Palas de Pádel */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-4">Palas de Pádel</h2>
        <DraggableCarousel>
          {palas.slice(0, 8).map((producto) => (
            <div
              key={producto.id}
              className="min-w-[250px] bg-white p-4 rounded-lg shadow-lg"
            >
              <img
                src={producto.img}
                alt={producto.nombre}
                className="w-full h-48 object-cover rounded-md mb-4"
              />
              <h3 className="text-xl font-semibold text-gray-700">
                {producto.nombre}
              </h3>
              <p className="text-gray-500">{producto.tipo}</p>
              <p className="text-lg font-bold text-blue-600">
                ${producto.precio}
              </p>
              <button className="mt-4 w-full py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition">
                Añadir al carrito
              </button>
            </div>
          ))}
        </DraggableCarousel>
      </section>
      
      {/* Sección de Accesorios */}
      <section>
        <h2 className="text-2xl font-bold mb-4">Accesorios</h2>
        <DraggableCarousel>
          {accesorios.slice(0, 12).map((producto) => (
            <div
              key={producto.id}
              className="min-w-[250px] bg-white p-4 rounded-lg shadow-lg"
            >
              <img
                src={producto.img}
                alt={producto.nombre}
                className="w-full h-48 object-cover rounded-md mb-4"
              />
              <h3 className="text-xl font-semibold text-gray-700">
                {producto.nombre}
              </h3>
              <p className="text-gray-500">{producto.tipo}</p>
              <p className="text-lg font-bold text-blue-600">
                ${producto.precio}
              </p>
              <button className="mt-4 w-full py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition">
                Añadir al carrito
              </button>
            </div>
          ))}
        </DraggableCarousel>
      </section>
    </div>
  );
};

export default ProductPage;
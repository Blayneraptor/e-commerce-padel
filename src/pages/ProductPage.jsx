import React from "react";
import palas from "../data/productos.json";
import accesorios from "../data/accesorios.json";
import iniciacionImg from "../assets/iniciacion.png";  // imagen para INICIACION
import intermedioImg from "../assets/intermedio.png";    // imagen para INTERMEDIO
import avanzadoImg from "../assets/avanzado.png";        // imagen para AVANZADO
import controlImg from "../assets/control.png";          // imagen para CONTROL
import potenciaImg from "../assets/potencia.png";        // imagen para POTENCIA
import todasImg from "../assets/todas.png";              // imagen para TODAS
import palaImg from "../assets/pala.png";                // nueva importación para imágenes de palas
import accesorioImg from "../assets/accesorios.png";      // nueva importación para imágenes de accesorios

const ProductPage = () => {
  const imageMapping = {
    INICIACION: iniciacionImg,
    INTERMEDIO: intermedioImg,
    AVANZADO: avanzadoImg,
    CONTROL: controlImg,
    POTENCIA: potenciaImg,
    TODAS: todasImg,
  };

  return (
    <div id="productos" className="container mx-auto p-4">
      <h1 className="text-3xl font-bold text-gray-800 mb-8 text-center">
        Catálogo General
      </h1>
  
      {/* Nuevo grid de 6 columnas con imágenes según título */}
      <section className="grid grid-cols-6 gap-4 justify-items-center mb-8">
        {["INICIACION", "INTERMEDIO", "AVANZADO", "CONTROL", "POTENCIA", "TODAS"].map(
          (title) => (
            <div key={title} className="flex flex-col items-center">
              <div className="w-48 h-48 rounded-full border flex items-center justify-center bg-gray-200">
                <img
                  src={imageMapping[title]}
                  alt={title}
                  className="w-48 h-48 rounded-full object-cover" // object-cover asegura la misma altura
                />
              </div>
              <span className="mt-2 text-xl font-bold">{title}</span>
            </div>
          )
        )}
      </section>

     {/* Sección de Palas de Pádel */}
<section className="mb-12">
  <h2 className="text-2xl font-bold mb-4 text-center">Palas de Pádel</h2>
  <div className="mt-6">
    <ul className="grid grid-cols-5 gap-10">
      {palas.slice(0, 5).map((pala) => (
        <li
          key={pala.id}
          className="col-span-full sm:col-span-2 lg:col-span-1 group shadow-sm rounded border border-gray-50 hover:shadow-md"
        >
          <a
            href={`/palas-de-padel/${pala.id}`}
            className="p-2 flex flex-col"
          >
            {/* ::Picture */}
            <div className="aspect-w-1 aspect-h-1 w-full h-full overflow-hidden filter group-hover:brightness-110">
              <img
                src={pala.img}  // Asegúrate de que el JSON tenga la ruta correcta, por ejemplo "/assets/pala.png"
                alt={pala.nombre}
                className="w-full h-full object-cover object-center"
              />
            </div>
            {/* ::Product Details */}
            <div className="mt-5 pt-4 pb-2 border-t-2 border-gray-100 flex flex-col items-center">
              <h3 className="text-base text-gray-500 font-medium">
                {pala.nombre}
              </h3>
              <p className="text-lg text-gray-700 font-semibold">
                {pala.precio}€
              </p>
              <button className="mt-4 py-1.5 w-full rounded-md bg-gray-200 text-sm text-gray-600 font-semibold tracking-wide hover:bg-gray-300 hover:text-gray-800">
                Añadir al carrito
              </button>
            </div>
          </a>
        </li>
      ))}
    </ul>
  </div>
</section>

      {/* Sección de Accesorios */}
      <section className="mb-12">
  <h2 className="text-2xl font-bold mb-4 text-center">Accesorios de Pádel</h2>
  <div className="mt-6">
    <ul className="grid grid-cols-5 gap-10">
      {accesorios.slice(0, 5).map((accesorio) => (
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
                src={accesorio.img}  // Asegúrate de que el JSON tenga la ruta correcta, por ejemplo "/assets/pala.png"
                alt={accesorio.nombre}
                className="w-full h-full object-cover object-center"
              />
            </div>
            {/* ::Product Details */}
            <div className="mt-5 pt-4 pb-2 border-t-2 border-gray-100 flex flex-col items-center">
              <h3 className="text-base text-gray-500 font-medium">
                {accesorio.nombre}
              </h3>
              <p className="text-lg text-gray-700 font-semibold">
                {accesorio.precio}€
              </p>
              <button className="mt-4 py-1.5 w-full rounded-md bg-gray-200 text-sm text-gray-600 font-semibold tracking-wide hover:bg-gray-300 hover:text-gray-800">
                Añadir al carrito
              </button>
            </div>
          </a>
        </li>
      ))}
    </ul>
  </div>
</section>
    </div>
  );
};

export default ProductPage;
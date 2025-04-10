import React from "react";
import palas from "../data/productos.json";
import accesorios from "../data/accesorios.json";
import iniciacionImg from "../assets/iniciacion.png"; // imagen para INICIACION
import intermedioImg from "../assets/intermedio.png"; // imagen para INTERMEDIO
import avanzadoImg from "../assets/avanzado.png"; // imagen para AVANZADO
import controlImg from "../assets/control.png"; // imagen para CONTROL
import potenciaImg from "../assets/potencia.png"; // imagen para POTENCIA
import todasImg from "../assets/todas.png"; // imagen para TODAS
import palaImg from "../assets/pala.png"; // nueva importación para imágenes de palas
import accesorioImg from "../assets/accesorios.png"; // nueva importación para imágenes de accesorios
import pala from "../assets/pala.png";

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
   {/* Carousel Section above the Catalog */}
<section className="w-full relative z-20 my-4 overflow-hidden">
  <div className="flex animate-scroll-right">
    {Array(10)
      .fill(0)
      .map((_, i) => (
        <div key={i} className="flex-shrink-0 mx-2">
          <img src={pala} alt="Pala" className="w-24 h-24 object-cover" />
        </div>
      ))}
  </div>
</section>

      <h1 className="text-3xl font-bold text-gray-800 mb-8 text-center">
        Catálogo General
      </h1>

      {/* Nuevo grid de 6 columnas con imágenes según título */}
      <section className="grid grid-cols-6 gap-4 justify-items-center mb-8">
        {[
          "INICIACION",
          "INTERMEDIO",
          "AVANZADO",
          "CONTROL",
          "POTENCIA",
          "TODAS",
        ].map((title) => (
          <div key={title} className="flex flex-col items-center">
            <div className="w-48 h-48 rounded-full border flex items-center justify-center bg-gray-200">
              <img
                src={imageMapping[title]}
                alt={title}
                className="w-48 h-48 rounded-full object-cover"
              />
            </div>
            <span className="mt-2 text-xl font-bold">{title}</span>
          </div>
        ))}
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
                      src={pala.img}
                      alt={pala.nombre}
                      className="w-full h-full object-cover object-center"
                    />
                  </div>
                  {/* ::Product Details */}
                  <div className="mt-5 pt-4 pb-2 border-t-2 border-gray-100 flex flex-col items-center">
                    <h3 className="text-base text-gray-500 font-medium">
                      {pala.nombre}
                    </h3>
                    <p className="p-1.5 text-lg text-gray-700 font-semibold">
                      {pala.precio}€
                    </p>
                    <button className="group relative inline-flex items-center px-16 py-1 rounded shadow-lg outline-none bg-gray-200 text-md text-gray-900 font-medium transition-all duration-200 ease-out hover:text-gray-700 hover:from-transparent hover:to-transparent hover:shadow-none active:top-0.5 focus:outline-none">
                      <span
                        className="absolute h-0 w-0.5 right-0 top-0 bg-gradient-to-br from-gray-500 via-white to-gray-500 transition-all duration-500 ease-out group-hover:h-full"
                        aria-hidden="true"
                      />
                      <span
                        className="absolute left-0 bottom-0 bg-gradient-to-br from-gray-500 via-white to-gray-500 transition-all duration-500 ease-out w-0.5 h-0 group-hover:h-full"
                        aria-hidden="true"
                      />
                      Añadir al carrito
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
      </section>

      {/* Sección de Accesorios */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-4 text-center">
          Accesorios de Pádel
        </h2>
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
                    <button className="group relative inline-flex items-center px-16 py-1 rounded shadow-lg outline-none bg-gray-200 text-md text-gray-900 font-medium transition-all duration-200 ease-out hover:text-gray-700 hover:from-transparent hover:to-transparent hover:shadow-none active:top-0.5 focus:outline-none">
                      <span
                        className="absolute h-0 w-0.5 right-0 top-0 bg-gradient-to-br from-gray-500 via-white to-gray-500 transition-all duration-500 ease-out group-hover:h-full"
                        aria-hidden="true"
                      />
                      <span
                        className="absolute left-0 bottom-0 bg-gradient-to-br from-gray-500 via-white to-gray-500 transition-all duration-500 ease-out w-0.5 h-0 group-hover:h-full"
                        aria-hidden="true"
                      />
                      Añadir al carrito
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
      </section>
    </div>
  );
};

export default ProductPage;
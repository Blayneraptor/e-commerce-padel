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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {palas.slice(0, 5).map((pala) => (
            <div key={pala.id} className="border p-2 flex flex-col items-center">
              <div className="w-48 h-48 flex items-center justify-center mb-2">
                <img
                  src={palaImg}
                  alt={pala.nombre}
                  className="max-w-full max-h-full"
                />
              </div>
              <h3 className="text-xl font-semibold text-center">{pala.nombre}</h3>
              <p className="text-gray-700 text-center">${pala.precio}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Sección de Accesorios */}
      <section>
        <h2 className="text-2xl font-bold mb-4 text-center">Accesorios</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {accesorios.slice(0, 5).map((accesorio) => (
            <div key={accesorio.id} className="border p-2 flex flex-col items-center">
              <div className="w-48 h-48 flex items-center justify-center mb-2">
                <img
                  src={accesorioImg}
                  alt={accesorio.nombre}
                  className="max-w-full max-h-full"
                />
              </div>
              <h3 className="text-xl font-semibold text-center">
                {accesorio.nombre}
              </h3>
              <p className="text-gray-700 text-center">${accesorio.precio}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default ProductPage;
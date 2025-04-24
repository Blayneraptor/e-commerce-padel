import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useCart } from "../contexts/CartContext";
import { motion } from "framer-motion";
import pagosImg from "../assets/pagos.png";

const CartPage = () => {
  const { cart, removeFromCart, updateQuantity, clearCart, getCartSubtotal } =
    useCart();

  const [showConfetti, setShowConfetti] = useState(false);
  const [removingItems, setRemovingItems] = useState(new Set());

  // Animación cuando se elimina un producto
  const handleRemoveWithAnimation = (productId) => {
    setRemovingItems((prev) => new Set(prev).add(productId));
    setTimeout(() => {
      removeFromCart(productId);
      setRemovingItems((prev) => {
        const newSet = new Set(prev);
        newSet.delete(productId);
        return newSet;
      });
    }, 300);
  };

  // Animación de confeti cuando el usuario añade algo al carrito
  useEffect(() => {
    const cartCount = cart.reduce((total, item) => total + item.quantity, 0);
    if (cartCount > 0) {
      setShowConfetti(true);
      const timer = setTimeout(() => setShowConfetti(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [cart.length]);

  // Función auxiliar para obtener el precio correcto del item
  const getItemPrice = (item) => {
    return item.price || item.precio || 0;
  };

  // Framer motion variants para las animaciones
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 300, damping: 24 },
    },
    exit: {
      y: -20,
      opacity: 0,
      scale: 0.8,
      transition: { duration: 0.3 },
    },
  };

  return (
    <div className="bg-gray-50 min-h-screen pt-24 pb-20">
      {/* Confeti animado cuando se añade un producto */}
      {showConfetti && (
        <div className="fixed inset-0 pointer-events-none z-50">
          <div className="absolute inset-0 overflow-hidden">
            {Array.from({ length: 100 }).map((_, index) => (
              <div
                key={index}
                className={`absolute animate-confetti rounded-md`}
                style={{
                  top: `-10px`,
                  left: `${Math.random() * 100}%`,
                  width: `${Math.random() * 10 + 5}px`,
                  height: `${Math.random() * 10 + 5}px`,
                  backgroundColor: `hsl(${Math.random() * 360}, 70%, 50%)`,
                  animation: `fall ${Math.random() * 3 + 2}s linear forwards`,
                  animationDelay: `${Math.random() * 3}s`,
                  transform: `rotate(${Math.random() * 360}deg)`,
                }}
              />
            ))}
          </div>
        </div>
      )}

      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Contenedor principal del carrito */}
          <motion.div
            className="md:w-3/4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-3xl font-extrabold text-gray-900 mb-8">
              Tu carrito de compra
            </h1>

            {cart.length === 0 ? (
              <motion.div
                className="bg-white rounded-2xl shadow-lg p-8 text-center"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
              >
                <div className="flex flex-col items-center justify-center py-12">
                  <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-6">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-12 w-12 text-gray-400"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                      />
                    </svg>
                  </div>
                  <h2 className="text-2xl font-semibold text-gray-800 mb-2">
                    ¡Tu carrito está vacío!
                  </h2>
                  <p className="text-gray-500 mb-8 max-w-md">
                    Parece que aún no has añadido ningún producto a tu carrito.
                    Explora nuestra selección de palas y accesorios premium.
                  </p>
                  <Link
                    to="/palas-de-padel"
                    className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-300"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 mr-2"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M14 5l7 7m0 0l-7 7m7-7H3"
                      />
                    </svg>
                    Explorar productos
                  </Link>
                </div>
              </motion.div>
            ) : (
              <>
                {/* Cabecera de la tabla */}
                <div className="hidden md:flex bg-white rounded-t-lg shadow-sm p-4 mb-1 font-medium text-gray-500 border-b">
                  <div className="w-2/5">Producto</div>
                  <div className="w-1/5 text-center">Precio</div>
                  <div className="w-1/5 text-center">Cantidad</div>
                  <div className="w-1/5 text-center">Total</div>
                </div>

                {/* Lista de productos */}
                <motion.div
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                  className="space-y-2"
                >
                  {cart.map((item) => (
                    <motion.div
                      key={item.id}
                      variants={itemVariants}
                      className={`bg-white rounded-lg shadow-sm overflow-hidden transition-all ${
                        removingItems.has(item.id)
                          ? "transform scale-95 opacity-50"
                          : ""
                      }`}
                    >
                      <div className="p-4 md:p-6 flex flex-col md:flex-row md:items-center">
                        {/* Imagen y nombre del producto - Mobile & Desktop */}
                        <div className="flex flex-grow md:w-2/5">
                          <div className="flex-shrink-0 w-20 h-20 md:w-24 md:h-24 bg-gray-100 rounded-lg overflow-hidden border">
                            <motion.img
                              src={item.img}
                              alt={item.nombre}
                              className="w-full h-full object-cover"
                              whileHover={{ scale: 1.1 }}
                              transition={{ duration: 0.3 }}
                            />
                          </div>
                          <div className="ml-4 flex flex-col justify-center">
                            <h3 className="text-base md:text-lg font-medium text-gray-900">
                              {item.nombre}
                            </h3>
                            <p className="mt-1 text-sm text-gray-500">
                              {item.tipo && `${item.tipo}`}
                              {item.marca && ` | ${item.marca}`}
                            </p>
                            {/* Solo visible en móvil */}
                            <p className="md:hidden mt-2 text-sm font-medium text-gray-900">
                              {getItemPrice(item).toFixed(2)} €
                            </p>
                          </div>
                        </div>

                        {/* Precio - Solo Desktop */}
                        <div className="hidden md:block w-1/5 text-center">
                          <span className="text-base font-medium text-gray-900">
                            {getItemPrice(item).toFixed(2)} €
                          </span>
                        </div>

                        {/* Selector de cantidad - Mobile & Desktop */}
                        <div className="mt-4 md:mt-0 md:w-1/5 flex justify-center">
                          <div className="flex items-center border border-gray-200 rounded-lg">
                            <button
                              onClick={() =>
                                updateQuantity(
                                  item.id,
                                  Math.max(1, item.quantity - 1)
                                )
                              }
                              className="px-3 py-1 text-gray-600 hover:text-blue-600 transition-colors duration-200"
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-4 w-4"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M20 12H4"
                                />
                              </svg>
                            </button>
                            <span className="w-10 text-center font-medium">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() =>
                                updateQuantity(item.id, item.quantity + 1)
                              }
                              className="px-3 py-1 text-gray-600 hover:text-blue-600 transition-colors duration-200"
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-4 w-4"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M12 4v16m8-8H4"
                                />
                              </svg>
                            </button>
                          </div>
                        </div>

                        {/* Total por producto - Mobile & Desktop */}
                        <div className="mt-4 md:mt-0 md:w-1/5 text-center">
                          <span className="text-base font-medium text-gray-900">
                            {(getItemPrice(item) * item.quantity).toFixed(2)} €
                          </span>
                        </div>

                        {/* Botón de eliminar - Mobile & Desktop */}
                        <div className="mt-4 md:mt-0 flex justify-end">
                          <button
                            onClick={() => handleRemoveWithAnimation(item.id)}
                            className="text-sm text-gray-500 hover:text-red-600 flex items-center transition-colors duration-200"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-4 w-4 mr-1"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                              />
                            </svg>
                            Eliminar
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </motion.div>

                {/* Botones de acción para el carrito */}
                <motion.div
                  className="flex justify-between mt-6"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                >
                  <Link
                    to="/palas-de-padel"
                    className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 transition-colors duration-200"
                    onClick={() => {
                      window.scrollTo({ top: 0, behavior: "smooth" });
                    }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 mr-2"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                    Seguir comprando
                  </Link>

                  <button
                    onClick={() => {
                      clearCart();
                      window.scrollTo({ top: 0, behavior: "smooth" });
                    }}
                    className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 transition-colors duration-200"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 mr-2"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                      />
                    </svg>
                    Vaciar carrito
                  </button>
                </motion.div>
              </>
            )}
          </motion.div>

          {/* Resumen del pedido */}
          {cart.length > 0 && (
            <motion.div
              className="md:w-1/4"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-24">
                <h2 className="text-xl font-semibold text-gray-900 mb-6">
                  Resumen del pedido
                </h2>

                <div className="space-y-4 mb-6">
                  <div className="flex justify-between border-b border-gray-200 pb-4">
                    <span className="text-gray-600">Subtotal</span>
                    <span className="font-medium">
                      {getCartSubtotal().toFixed(2)} €
                    </span>
                  </div>
                  <div className="flex justify-between border-b border-gray-200 pb-4">
                    <span className="text-gray-600">Envío</span>
                    <span className="font-medium text-green-600">Gratis</span>
                  </div>
                  <div className="flex justify-between pt-2">
                    <span className="font-semibold text-lg">Total</span>
                    <span className="font-bold text-xl">
                      {getCartSubtotal().toFixed(2)} €
                    </span>
                  </div>
                </div>

                {/* Animación para el botón de checkout */}
                <motion.div
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                >
                  <Link
                    to="/checkout"
                    onClick={() =>
                      window.scrollTo({ top: 0, behavior: "smooth" })
                    }
                    className="block w-full bg-blue-600 py-3 px-4 rounded-lg text-white font-medium text-center shadow-lg hover:bg-blue-700 transition-all duration-300 transform hover:shadow-xl"
                  >
                    Proceder al pago
                  </Link>
                </motion.div>

                {/* Métodos de pago */}
                <div className="mt-6">
                  <p className="text-sm text-gray-500 text-center mb-3">
                    Aceptamos los siguientes métodos de pago
                  </p>
                  <div className="flex justify-center">
                    <img
                      src={pagosImg}
                      alt="Métodos de pago"
                      className="h-12 object-contain"
                    />
                  </div>
                </div>

                {/* Garantía y seguridad */}
                <div className="mt-8 border-t border-gray-200 pt-6">
                  <div className="flex items-center mb-4">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 text-green-500 mr-2"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                      />
                    </svg>
                    <span className="text-sm font-medium text-gray-700">
                      Pago 100% seguro
                    </span>
                  </div>
                  <div className="flex items-center mb-4">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 text-green-500 mr-2"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                      />
                    </svg>
                    <span className="text-sm font-medium text-gray-700">
                      Devolución en 30 días
                    </span>
                  </div>
                  <div className="flex items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 text-green-500 mr-2"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                    <span className="text-sm font-medium text-gray-700">
                      Envío gratis a partir de 50€
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CartPage;

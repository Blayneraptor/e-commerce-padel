import React, { useState, useEffect } from 'react';
import { useCart } from '../contexts/CartContext';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

const Cart = () => {
  const { 
    cart, 
    removeFromCart, 
    updateQuantity, 
    clearCart, 
    getCartSubtotal, 
    isCartOpen, 
    toggleCart 
  } = useCart();

  // detect mobile view
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);
  return (
    <AnimatePresence>
      {isCartOpen && (
        <motion.div 
          key="cart-container" 
          className="fixed inset-0 z-50 overflow-hidden" 
          initial={{ opacity: 0 }} 
          animate={{ opacity: 1 }} 
          exit={{ opacity: 0 }} 
          transition={{ duration: 0.3 }}
        >
          {/* Overlay */}
          <motion.div 
            key="backdrop" 
            className="absolute inset-0 bg-black bg-opacity-50" 
            onClick={toggleCart} 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            exit={{ opacity: 0 }} 
            transition={{ duration: 0.3 }} 
          />
          
          {/* Cart panel */}
          <motion.div 
            key="panel" 
            className="fixed inset-y-0 right-0 max-w-md w-full bg-white shadow-xl flex flex-col" 
            initial={{ x: '100%' }} 
            animate={{ x: 0 }} 
            exit={{ x: '100%' }} 
            transition={{ type: 'tween', duration: 0.3 }}
          >
            <div className="flex items-center justify-between p-4 border-b">
              <h2 className="text-lg font-medium">Tu carrito</h2>
              <button 
                onClick={toggleCart} 
                className="text-gray-500 hover:text-gray-700"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-4">
              {cart.length === 0 ? (
                <div className="text-center py-8">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                  </svg>
                  <p className="mt-4 text-gray-500">Tu carrito está vacío</p>
                  <button 
                    onClick={toggleCart}
                    className="mt-4 text-blue-600 hover:text-blue-800"
                  >
                    Continuar comprando
                  </button>
                </div>
              ) : (
                <>
                  <ul className="divide-y divide-gray-200">
                    {cart.map(item => (
                      <li key={item.id} className="py-4 flex">
                        <div className="flex-shrink-0 w-16 h-16 border border-gray-200 rounded-md overflow-hidden">
                          <img 
                            src={item.img} 
                            alt={item.nombre} 
                            className="w-full h-full object-center object-cover"
                          />
                        </div>
                        <div className="ml-4 flex-1 flex flex-col">
                          <div>
                            <div className="flex justify-between">
                              <h3 className="text-sm font-medium">{item.nombre}</h3>
                              <p className="text-sm font-medium text-gray-900">
                                {(item.price || item.precio).toFixed(2)} €
                              </p>
                            </div>
                            <p className="mt-1 text-sm text-gray-500">{item.tipo}</p>
                          </div>
                          <div className="flex-1 flex items-end justify-between">
                            <div className="flex items-center">
                              <button 
                                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                className="text-gray-500 hover:text-gray-700 p-1"
                                disabled={item.quantity <= 1}
                              >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                                </svg>
                              </button>
                              <span className="mx-2 text-gray-700">{item.quantity}</span>
                              <button 
                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                className="text-gray-500 hover:text-gray-700 p-1"
                              >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                                </svg>
                              </button>
                            </div>
                            <button 
                              onClick={() => removeFromCart(item.id)}
                              className="text-red-500 hover:text-red-700 text-sm"
                            >
                              Eliminar
                            </button>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                </>
              )}
            </div>

            {cart.length > 0 && (
              <div className="border-t border-gray-200 p-4">
                <div className="flex justify-between text-base font-medium text-gray-900 mb-4">
                  <p>Subtotal</p>
                  <p>{getCartSubtotal().toFixed(2)} €</p>
                </div>
                <div className="flex flex-col space-y-2">
                  {isMobile ? (
                    <Link
                      to="/checkout"
                      className="w-full bg-blue-600 border border-transparent rounded-md py-2 px-4 text-center text-white font-medium hover:bg-blue-700"
                      onClick={toggleCart}
                    >
                      Proceder al pago
                    </Link>
                  ) : (
                    <Link
  to="/carrito"
  className="w-full bg-blue-600 border border-transparent rounded-md py-2 px-4 text-center text-white font-medium hover:bg-blue-700"
  onClick={() => {
    toggleCart();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }}
>
  Proceder al pago
</Link>

                    
                  )}
                  <button
                    onClick={clearCart}
                    className="w-full bg-white border border-gray-300 rounded-md py-2 px-4 text-center text-gray-700 font-medium hover:bg-gray-50"
                  >
                    Vaciar carrito
                  </button>
                  <button
                    onClick={toggleCart}
                    className="w-full bg-white text-blue-600 font-medium hover:text-blue-800"
                  >
                    Continuar comprando
                  </button>
                </div>
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Cart;
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';

const CheckoutPage = () => {
  const { cart, getCartSubtotal } = useCart();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aquí iría la lógica de procesar el pago
    alert('Procesando pago...');
  };

  return (
    <div className="container mx-auto p-8 min-h-screen">
      <h1 className="text-3xl font-bold mb-6">Finalizar Compra</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Formulario de datos */}
        <form onSubmit={handleSubmit} className="space-y-6 bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold">Datos de facturación</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Nombre completo</label>
              <input type="text" required placeholder="Escribe tu nombre completo" className="mt-1 block w-full bg-gray-100 border border-gray-300 rounded-md placeholder-gray-500 px-3 py-2" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Correo electrónico</label>
              <input type="email" required placeholder="Escribe tu email" className="mt-1 block w-full bg-gray-100 border border-gray-300 rounded-md placeholder-gray-500 px-3 py-2" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Dirección</label>
              <input type="text" required placeholder="Escribe tu dirección" className="mt-1 block w-full bg-gray-100 border border-gray-300 rounded-md placeholder-gray-500 px-3 py-2" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Ciudad</label>
                <input type="text" required placeholder="Escribe tu ciudad" className="mt-1 block w-full bg-gray-100 border border-gray-300 rounded-md placeholder-gray-500 px-3 py-2" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Código postal</label>
                <input type="text" required placeholder="Escribe tu CP" className="mt-1 block w-full bg-gray-100 border border-gray-300 rounded-md placeholder-gray-500 px-3 py-2" />
              </div>
            </div>
          </div>

          <h2 className="text-xl font-semibold mt-8">Detalles de pago</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Número de tarjeta</label>
              <input type="text" required placeholder="0000 0000 0000 0000" className="mt-1 block w-full bg-gray-100 border border-gray-300 rounded-md placeholder-gray-500 px-3 py-2" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Fecha expiración</label>
                <input type="text" required placeholder="MM/AA" className="mt-1 block w-full bg-gray-100 border border-gray-300 rounded-md placeholder-gray-500 px-3 py-2" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">CVC</label>
                <input type="text" required placeholder="123" className="mt-1 block w-full bg-gray-100 border border-gray-300 rounded-md placeholder-gray-500 px-3 py-2" />
              </div>
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-md hover:bg-blue-700 transition"
          >
            Pagar Ahora
          </button>
        </form>

        {/* Resumen del pedido */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Resumen del pedido</h2>
          <ul className="space-y-2 mb-4">
            {cart.map(item => (
              <li key={item.id} className="flex justify-between">
                <span>{item.nombre} x{item.quantity}</span>
                <span>{(item.precio * item.quantity).toFixed(2)} €</span>
              </li>
            ))}
          </ul>
          <div className="flex justify-between font-medium border-t pt-4">
            <span>Total:</span>
            <span>{getCartSubtotal().toFixed(2)} €</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
import { createContext, useState, useEffect, useContext } from 'react';

const CartContext = createContext();

export const useCart = () => {
  return useContext(CartContext);
};

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(() => {
    // Load from localStorage on initialization
    const savedCart = localStorage.getItem('cart');
    return savedCart ? JSON.parse(savedCart) : [];
  });
  
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Save to localStorage whenever cart changes
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  // Add an item to the cart
  const addToCart = (product, quantity = 1) => {
    setCart(prevCart => {
      // Normalizar el objeto para asegurar que tenga la propiedad 'price'
      const normalizedProduct = {
        ...product,
        // Usar precio_actual que es el campo correcto en el JSON
        price: product.precio_actual || product.price || product.precio || 0
      };
      
      const existingItem = prevCart.find(item => item.id === normalizedProduct.id);
      
      if (existingItem) {
        // Update quantity if item already exists
        return prevCart.map(item => 
          item.id === normalizedProduct.id 
            ? { ...item, quantity: item.quantity + quantity } 
            : item
        );
      } else {
        // Add new item with normalized price
        return [...prevCart, { ...normalizedProduct, quantity }];
      }
    });
  };

  // Remove an item from the cart
  const removeFromCart = (productId) => {
    setCart(prevCart => prevCart.filter(item => item.id !== productId));
  };

  // Update quantity of an item
  const updateQuantity = (productId, quantity) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }

    setCart(prevCart => 
      prevCart.map(item => 
        item.id === productId ? { ...item, quantity } : item
      )
    );
  };

  // Clear the entire cart
  const clearCart = () => {
    setCart([]);
  };

  // Toggle cart visibility
  const toggleCart = () => {
    setIsCartOpen(prev => !prev);
  };

  // Get total number of items in cart
  const getCartItemCount = () => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  };

  // Calculate cart subtotal
  const getCartSubtotal = () => {
    return cart.reduce((total, item) => {
      // Usar price (normalizado en addToCart) o buscar precio_actual
      const itemPrice = item.price || item.precio_actual || item.precio || 0;
      return total + (itemPrice * item.quantity);
    }, 0);
  };

  const value = {
    cart,
    isCartOpen,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    toggleCart,
    getCartItemCount,
    getCartSubtotal
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;
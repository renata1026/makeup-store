// Import required dependencies
import { createContext, useContext, useEffect, useState } from 'react';
// Create a cart context using createContext
const cartContext = createContext({});
// Export a CartProvider component that takes children as props
export const CartProvider = ({ children }) => {
  // Initialize cart state using useState
  const [cart, setCart] = useState([]);
  // Define a function to add products to the cart
  const addToCart = (product, amount) => {
    // Use setCart to update the cart state
    setCart((currentCart) => {
      // Find the index of the product in the cart
      const index = currentCart.findIndex((x) => x.product.id === product.id);
      const productCartInfo = {
        product,
        amount,
      };

      return index > -1
        ? [
            ...currentCart.slice(0, index),
            productCartInfo,
            ...currentCart.slice(index + 1),
          ]
        : [...currentCart, productCartInfo];
    });
  };

  // Define a function to remove products from the cart
  const removeFromCart = (product) => {
    // Use setCart to update the cart state
    setCart((currentCart) => {
      // Use filter to remove the product from the cart
      const updatedCart = currentCart.filter(
        (item) => item.product.id !== product.id
      );
      // Return a new array with the updated cart
      return updatedCart;
    });
  };

  // Use useEffect to save the cart to local storage whenever it changes
  useEffect(() => {
    const startingCart = localStorage.getItem('cart');
    if (startingCart) {
      setCart(JSON.parse(startingCart));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);
  // Render the cart context provider with the cart, addToCart, and removeFromCart values
  return (
    <cartContext.Provider value={{ cart, addToCart, removeFromCart }}>
      {children}
    </cartContext.Provider>
  );
};

export const useCart = () => useContext(cartContext);

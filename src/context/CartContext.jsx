import { createContext, useContext, useState } from 'react';

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);
  const [wishlistItems, setWishlistItems] = useState([]);

  const addToCart = (product, variant = null) => {
    setCartItems(prev => {
      const existing = prev.find(i => i.id === product.id && i.variant === variant);
      if (existing) return prev.map(i => i.id === product.id && i.variant === variant ? { ...i, qty: i.qty + 1 } : i);
      return [...prev, { ...product, qty: 1, variant }];
    });
  };

  const removeFromCart = (productId, variant = null) => {
    setCartItems(prev => prev.filter(i => !(i.id === productId && i.variant === variant)));
  };

  const updateQty = (productId, qty, variant = null) => {
    if (qty <= 0) return removeFromCart(productId, variant);
    setCartItems(prev => prev.map(i => i.id === productId && i.variant === variant ? { ...i, qty } : i));
  };

  const toggleWishlist = (product) => {
    setWishlistItems(prev =>
      prev.find(i => i.id === product.id)
        ? prev.filter(i => i.id !== product.id)
        : [...prev, product]
    );
  };

  const isInWishlist = (productId) => wishlistItems.some(i => i.id === productId);
  const isInCart = (productId) => cartItems.some(i => i.id === productId);

  const cartTotal = cartItems.reduce((sum, i) => sum + i.price * i.qty, 0);
  const cartCount = cartItems.reduce((sum, i) => sum + i.qty, 0);

  const clearCart = () => setCartItems([]);

  return (
    <CartContext.Provider value={{
      cartItems, wishlistItems, addToCart, removeFromCart, updateQty,
      toggleWishlist, isInWishlist, isInCart, cartTotal, cartCount, clearCart,
    }}>
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);

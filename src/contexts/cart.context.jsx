import { createContext, useEffect, useState } from "react";

const addCartItem = (cartItems, productToAdd) => {
  const cartItemsCopy = [...cartItems];
  const productInCartItem = cartItemsCopy.find((product) => product.id === productToAdd.id);
  if (productInCartItem){
    productInCartItem.quantity += 1;
  } else {
    cartItemsCopy.push({...productToAdd, quantity: 1});
  }
  return cartItemsCopy;
};


export const CartContext = createContext({
  isCartOpen: false,
  setIsCartOpen: () => null,
  cartItems: [],
  addItemToCart: () => null,
  getTotalCartItemsCount: () => null,
  cartItemCount: 0
});

export const CartProvider = ({ children }) => {
  const [ isCartOpen, setIsCartOpen ] = useState(false);
  const [ cartItems, setCartItems ] = useState([]);
  const [ cartItemsCount, setCartItemsCount ] = useState(0);

  useEffect(() => {
    setCartItemsCount(cartItems.reduce(
      (totalCount, currentProduct) => totalCount + currentProduct.quantity, 0));
  }, [cartItems]);

  const addItemToCart = (productToAdd) => {
    setCartItems(addCartItem(cartItems, productToAdd));
  }

  const value = { isCartOpen, setIsCartOpen, addItemToCart, cartItems, cartItemsCount }
  return (
    <CartContext.Provider value={value}>{children}</CartContext.Provider>
  )
}
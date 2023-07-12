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

const removeCartItem = (cartItems, productToRemove, completeRemoval = false) => {
  if (productToRemove.quantity === 1 || completeRemoval) {
    const filteredCart = cartItems.filter(cartItem => cartItem.id !== productToRemove.id);
    if(!filteredCart) return [];
    return filteredCart;
  }
  else {
    return cartItems.map(
      cartItem => cartItem.id === productToRemove.id ?
       {...cartItem, quantity: productToRemove.quantity -1} :
       cartItem
    );
  }
};


export const CartContext = createContext({
  isCartOpen: false,
  setIsCartOpen: () => null,
  cartItems: [],
  addItemToCart: () => null,
  getTotalCartItemsCount: () => null,
  cartItemCount: 0,
  removeItemFromCart: () => null,
  totalPrice: 0,
});

export const CartProvider = ({ children }) => {
  const [ isCartOpen, setIsCartOpen ] = useState(false);
  const [ cartItems, setCartItems ] = useState([]);
  const [ cartItemsCount, setCartItemsCount ] = useState(0);
  const [ totalPrice, setTotalPrice ] = useState(0);

  useEffect(() => {
    setCartItemsCount(cartItems.reduce(
      (totalCount, currentProduct) => totalCount + currentProduct.quantity, 0));
  }, [cartItems]);

  useEffect(() => {
    setTotalPrice(cartItems.reduce(
      (totalCount, currentProduct) => totalCount + currentProduct.quantity * currentProduct.price, 0));
  }, [cartItems]);

  const addItemToCart = (productToAdd) => {
    setCartItems(addCartItem(cartItems, productToAdd));
  };

  const removeItemFromCart = (productToRemove, completeRemoval) => {
    let updatedCartItems = removeCartItem(cartItems, productToRemove, completeRemoval);
    setCartItems(updatedCartItems);
  };

  const value = { 
    isCartOpen, 
    setIsCartOpen, 
    addItemToCart, 
    cartItems, 
    cartItemsCount, 
    removeItemFromCart,
    totalPrice
  };

  return (
    <CartContext.Provider value={value}>{children}</CartContext.Provider>
  )
}
import { createContext, useReducer } from "react";
import { createAction } from "../utils/reducer/reducer.utils";

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


export const CART_ACTION_TYPES = {
  SET_IS_CART_OPEN:  'SET_IS_CART_OPEN',
  SET_CART_ITEMS:  'SET_CART_ITEMS',
};

const INITIAL_STATE = {
  isCartOpen: false,
  cartItems: [],
  cartItemsCount: 0,
  totalPrice: 0,
};


const cartReducer = (state, action) => {
  const { type, payload } = action;

  switch(type){
    case CART_ACTION_TYPES.SET_IS_CART_OPEN:
      return {
        ...state,
        isCartOpen: payload
      };
    case CART_ACTION_TYPES.SET_CART_ITEMS:
      return {
        ...state,
        ...payload
      };
    default: 
      throw new Error(`Unhandled type ${type} in cartReducer`)
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
  const [ state, dispatch ] = useReducer(cartReducer, INITIAL_STATE);
  const { isCartOpen, cartItems, cartItemsCount, totalPrice } = state;

  const updateCartItemsReducer = (newCartItems) => {
    let newCartItemsCount = newCartItems.reduce(
      (totalCount, currentProduct) => totalCount + currentProduct.quantity, 0);
    let newTotalPrice = newCartItems.reduce(
      (totalCount, currentProduct) => totalCount + currentProduct.quantity * currentProduct.price, 0);

    dispatch(
      createAction(CART_ACTION_TYPES.SET_CART_ITEMS, {
        cartItems: newCartItems,
        cartItemsCount: newCartItemsCount,
        totalPrice: newTotalPrice
      })  
    );
  };

  const addItemToCart = (productToAdd) => {
    let newCartItems = addCartItem(cartItems, productToAdd);
    updateCartItemsReducer(newCartItems);
  };

  const removeItemFromCart = (productToRemove, completeRemoval) => {
    let newCartItems =removeCartItem(cartItems, productToRemove, completeRemoval);
    updateCartItemsReducer(newCartItems);
  };

  const setIsCartOpen = (isCartOpen) => {
    dispatch(
      createAction(CART_ACTION_TYPES.SET_IS_CART_OPEN, isCartOpen)
    );
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
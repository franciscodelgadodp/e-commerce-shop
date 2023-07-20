import { createAction } from "../../utils/reducer/reducer.utils";
import { CART_ACTION_TYPES } from "./cart.types";



// const addCartItem = (cartItems, productToAdd) => {
//   const cartItemsCopy = [...cartItems];
//   const productInCartItem = cartItemsCopy.find((product) => product.id === productToAdd.id);
//   if (productInCartItem){
//     productInCartItem.quantity += 1;
//   } else {
//     cartItemsCopy.push({...productToAdd, quantity: 1});
//   }
//   return cartItemsCopy;
// };

// const removeCartItem = (cartItems, productToRemove, completeRemoval = false) => {
//   if (productToRemove.quantity === 1 || completeRemoval) {
//     const filteredCart = cartItems.filter(cartItem => cartItem.id !== productToRemove.id);
//     if(!filteredCart) return [];
//     return filteredCart;
//   }
//   else {
//     return cartItems.map(
//       cartItem => cartItem.id === productToRemove.id ?
//         {...cartItem, quantity: productToRemove.quantity -1} :
//         cartItem
//     );
//   }
// };

// const setCartItems = (newCartItems) => 
//   createAction(CART_ACTION_TYPES.SET_CART_ITEMS, newCartItems);

// export const addItemToCart = (cartItems, productToAdd) => {
//   let newCartItems = addCartItem(cartItems, productToAdd);
//   return setCartItems(newCartItems);
// };

// export const removeItemFromCart = (cartItems, productToRemove, completeRemoval) => {
//   let newCartItems = removeCartItem(cartItems, productToRemove, completeRemoval);
//   return setCartItems(newCartItems);
// };

// export const setIsCartOpen = (isCartOpen) => 
//   createAction(CART_ACTION_TYPES.SET_IS_CART_OPEN, isCartOpen);
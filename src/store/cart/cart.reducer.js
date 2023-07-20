import { createSlice } from "@reduxjs/toolkit";


const INITIAL_STATE = {
  isCartOpen: false,
  cartItems: [],
};

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


export const cartSlice = createSlice({
  name: 'cart',
  initialState: INITIAL_STATE,
  reducers: {
    setIsCartOpen(state, action) {
      state.isCartOpen = action.payload;
    },
    addItemToCart(state, action) {
      state.cartItems = addCartItem(state.cartItems, action.payload);
    },
    removeItemFromCart(state, action) {
      const { productToRemove, completeRemoval } = action.payload;
      state.cartItems = removeCartItem(state.cartItems, productToRemove, completeRemoval);
    },
  }
});

export const {
  setIsCartOpen,
  addItemToCart,
  removeItemFromCart
} = cartSlice.actions;

export const cartReducer = cartSlice.reducer;

// export const cartReducerOld = (state = INITIAL_STATE, action = {}) => {
//   const { type, payload } = action;

//   switch(type){
//     case CART_ACTION_TYPES.SET_IS_CART_OPEN:
//       return {
//         ...state,
//         isCartOpen: payload
//       };
//     case CART_ACTION_TYPES.SET_CART_ITEMS:
//       return {
//         ...state,
//         cartItems: payload
//       };
//     default: 
//       return state;
//   }
// };
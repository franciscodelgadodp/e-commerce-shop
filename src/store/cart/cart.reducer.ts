import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { CartItem } from "./cart.types";
import { CategoryItem } from "../categories/categories.types";


export type CartState = {
  readonly isCartOpen: boolean;
  readonly cartItems: CartItem[]
};

export type RemoveItemFromCartPayload = { 
  productToRemove: CartItem;
  completeRemoval?: boolean;
};

const INITIAL_STATE: CartState = {
  isCartOpen: false,
  cartItems: [],
};

const addCartItem = (cartItems: CartItem[], productToAdd: CategoryItem): CartItem[] => {
  const cartItemsCopy = [...cartItems];
  const productInCartItem = cartItemsCopy.find((product) => product.id === productToAdd.id);
  if (productInCartItem){
    productInCartItem.quantity += 1;
  } else {
    cartItemsCopy.push({...productToAdd, quantity: 1});
  }
  return cartItemsCopy;
};

const removeCartItem = (cartItems: CartItem[], productToRemove: CartItem, completeRemoval: boolean = false): CartItem[] => {
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
    setIsCartOpen(state, action: PayloadAction<boolean>) {
      state.isCartOpen = action.payload;
    },
    addItemToCart(state, action: PayloadAction<CategoryItem>) {
      state.cartItems = addCartItem(state.cartItems, action.payload);
    },
    removeItemFromCart(state, action: PayloadAction<RemoveItemFromCartPayload>) {
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
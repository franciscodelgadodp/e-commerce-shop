import { createSelector } from "reselect";
import { CartItem } from "./cart.types";
import { RootState } from "../store";
import { CartState } from "./cart.reducer";

const selectCart = (state: RootState): CartState => state.cart;

export const selectCartItems = createSelector(
  [selectCart],
  (cartSlice) => cartSlice.cartItems
);

export const selectIsCartOpen = createSelector(
  [selectCart],
  (cartSlice) => cartSlice.isCartOpen
);

export const selectCartItemsCount = createSelector(
  [selectCartItems],
  (cartItems: CartItem[]) => cartItems.reduce(
    (totalCount, currentProduct) => totalCount + currentProduct.quantity, 0)
);

export const selectTotalPrice = createSelector(
  [selectCartItems],
  (cartItems: CartItem[]) => cartItems.reduce(
    (totalCount, currentProduct) => totalCount + currentProduct.quantity * currentProduct.price, 0)
);

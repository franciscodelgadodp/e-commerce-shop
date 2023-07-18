import { createSelector } from "reselect";

const selectCart = (state) => state.cart;

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
  (cartItems) => cartItems.reduce(
    (totalCount, currentProduct) => totalCount + currentProduct.quantity, 0)
);

export const selectTotalPrice = createSelector(
  [selectCartItems],
  (cartItems) => cartItems.reduce(
    (totalCount, currentProduct) => totalCount + currentProduct.quantity * currentProduct.price, 0)
);

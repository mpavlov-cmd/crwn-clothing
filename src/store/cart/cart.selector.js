import {createSelector} from "reselect";

export const selectCurrentCart = (state) => state.cart;

export const selectCartItems = createSelector(
    [selectCurrentCart],
    (cart) => cart.cartItems
);

export const selectIsCartOpen = createSelector(
    [selectCurrentCart],
    (cart) => cart.isCartOpen
)

export const selectCartCount = createSelector(
    [selectCartItems],
    (cartItems) => cartItems.reduce(
        (total, cartItem) => total + cartItem.quantity,
        0
    )
)

export const selectCartTotal = createSelector(
    [selectCartItems],
    (cartItems) => cartItems.reduce(
        (total, cartItem) => total + cartItem.quantity * cartItem.price,
        0
    )
)
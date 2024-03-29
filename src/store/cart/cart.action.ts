import {CART_ACTION_TYPES, CartItem} from "./cart.types";
import {ActionWithPayload, createAction, withMatcher} from "../../utils/reducer/reducer.utils";
import {CategoryItem} from "../categories/categories.types";


export type SetIsCartOpen = ActionWithPayload<CART_ACTION_TYPES.TRIGGER_CART_OPEN, boolean>;
export type SetCartItems = ActionWithPayload<CART_ACTION_TYPES.MODIFY_CART_CONTENTS, CartItem[]>;

export const setIsCartOpen = withMatcher(
    (bool: boolean): SetIsCartOpen => {
        return createAction(CART_ACTION_TYPES.TRIGGER_CART_OPEN, bool);
    }
);

export const setCartItems = withMatcher(
    (cartItems: CartItem[]): SetCartItems => createAction(CART_ACTION_TYPES.MODIFY_CART_CONTENTS, cartItems)
);

export const addItemToCart = (cartItems: CartItem[], cartItemsToAdd: CategoryItem) => {
    const newCartItems = addCartItem(cartItems, cartItemsToAdd);
    return setCartItems(newCartItems);
};

export const removeItemToCart = (cartItems: CartItem[], cartItemToRemove: CartItem) => {
    const newCartItems = removeCartItem(cartItems, cartItemToRemove);
    return setCartItems(newCartItems);
};

export const clearItemFromCart = (cartItems: CartItem[], cartItemToClear: CartItem) => {
    const newCartItems = clearCartItem(cartItems, cartItemToClear);
    return setCartItems(newCartItems);
};

// Service methods
const addCartItem = (cartItems: CartItem[], productToAdd: CategoryItem): CartItem[]  => {
    const existingCartItem = cartItems.find(
        (cartItem) => cartItem.id === productToAdd.id
    );

    if (existingCartItem) {
        return cartItems.map((cartItem) =>
            cartItem.id === productToAdd.id
                ? { ...cartItem, quantity: cartItem.quantity + 1 }
                : cartItem
        );
    }

    return [...cartItems, { ...productToAdd, quantity: 1 }];
};

const removeCartItem = (cartItems: CartItem[], cartItemToRemove: CartItem): CartItem[] => {
    // find the cart item to remove
    const existingCartItem = cartItems.find(
        (cartItem) => cartItem.id === cartItemToRemove.id
    );

    // check if quantity is equal to 1, if it is remove that item from the cart
    if (existingCartItem && existingCartItem.quantity === 1) {
        return cartItems.filter((cartItem) => cartItem.id !== cartItemToRemove.id);
    }

    // return cart items with matching cart item with reduced quantity
    return cartItems.map((cartItem) =>
        cartItem.id === cartItemToRemove.id
            ? { ...cartItem, quantity: cartItem.quantity - 1 }
            : cartItem
    );
};

const clearCartItem = (cartItems: CartItem[], cartItemToClear: CartItem): CartItem[] =>
    cartItems.filter((cartItem) => cartItem.id !== cartItemToClear.id);
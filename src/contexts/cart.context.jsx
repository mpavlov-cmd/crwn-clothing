import {createContext, useReducer} from "react";

/*
    CartItem
    id,
    name,
    price,
    imageUrl
    quantity
 */
export class Cart {

    _cartProducts = new Map();
    _cartStateControl = () => {};

    constructor(cartItemsArray, cartStateControl) {
        cartItemsArray.forEach((product) => {
            this._cartProducts.set(product.id, product)
        })
        this._cartStateControl = cartStateControl;
    }

    addItem(product) {
        const existingProduct = this._cartProducts.get(product.id);
        if (existingProduct) {
            existingProduct.quantity = existingProduct.quantity + 1;
        } else {
            product.quantity = 1;
            this._cartProducts.set(product.id, product);
        }
        this._cartStateControl(this.countItems());
    }

    removeItem(id) {
        const cartItem = this._cartProducts.get(id);
        if (!cartItem) {
            return;
        }

        if (cartItem.quantity > 1) {
            cartItem.quantity--;
        } else {
            this._cartProducts.delete(id);
        }

        this._cartStateControl(this.countItems());
    }

    clearItem(id) {
        const cartItem = this._cartProducts.get(id);
        if (!cartItem) {
            return;
        }

        this._cartProducts.delete(id);
        this._cartStateControl(this.countItems());
    }

    listItems() {
        return Array.from(this._cartProducts, ([_, value]) => (value))
    }

    countItems() {
        return this.listItems().reduce((acc, item) => {
            return item.quantity && acc + item.quantity;
        }, 0)
    }

    total() {
        return this.listItems().reduce((acc, item) => {
            return acc + item.quantity * item.price;
        }, 0)
    }
}

export const CART_ACTION_TYPES = {
    TRIGGER_CART_OPEN: 'TRIGGER_CART_OPEN',
    MODIFY_CART_CONTENTS: 'MODIFY_CART_CONTENTS',
    CHANGE_CARD_INDEX: 'CHANGE_CARD_INDEX'
}

const INITIAL_STATE = {
    isCartOpen: false,
    cart: new Cart([], (int) => int),
    cartIndex: 0
}

// Reducer should just update state, but do not perform any business logic
const cartReducer = (state, action) => {

    console.log(action);
    const {type, payload} = action;

    switch (type) {
        case CART_ACTION_TYPES.TRIGGER_CART_OPEN:
            return {
                ...state,
                isCartOpen: payload
            }
        case CART_ACTION_TYPES.MODIFY_CART_CONTENTS:
            return {
                ...state,
                cart: payload
            }
        // Private action
        case CART_ACTION_TYPES.CHANGE_CARD_INDEX:
            return {
                ...state,
                cartIndex: payload
            }
        default:
            throw new Error(`Unhandled type ${type} in cartReducer`);
    }
}

export const CartContext = createContext({
    isCartOpen: false,
    setIsCartOpen: () => {},
    cart: new Cart([], () => {}),
    setCart: () => null
});

export const CartProvider = ({children}) => {

    const [state, dispatch] = useReducer(cartReducer, INITIAL_STATE, () => {
        const forceRenderCart = (numItems) => {
            dispatch({
                type: CART_ACTION_TYPES.CHANGE_CARD_INDEX,
                payload: numItems
            })
        }
        return {
            isCartOpen: false,
            cart: new Cart([], forceRenderCart),
            cartIndex: 0
        }
    });

    const {isCartOpen, cart} = state;

    const setIsCartOpen = (boolean) => {
        dispatch({
            type: CART_ACTION_TYPES.TRIGGER_CART_OPEN,
            payload: boolean
        })
    }

    const setCart = (cart) => {
        dispatch({
            type: CART_ACTION_TYPES.MODIFY_CART_CONTENTS,
            payload: cart
        })
    }

    const value = {isCartOpen, setIsCartOpen, cart, setCart};

    return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

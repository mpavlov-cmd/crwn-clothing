import {createContext, useState} from "react";

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
        this._cartProducts.delete(id);
        this._cartStateControl(this.countItems());
    }

    listItems() {
        return Array.from(this._cartProducts, ([_, value]) => (value))
    }

    countItems() {
        let count = 0;
        this._cartProducts.forEach((item) => {
            const quantity = item.quantity;
            if (quantity) {
                count = count + quantity;
            }
        })
        return count;
    }
}

export const CartContext = createContext({
    isCartOpen: false,
    setIsCartOpen: () => {},
    cart: new Cart([], () => {}),
    setCart: () => null
});

export const CartProvider = ({children}) => {

    const [,setCartState] = useState(0);
    const defaultCart = new Cart([], setCartState);

    const [isCartOpen, setIsCartOpen] = useState(false);
    const [cart, setCart] = useState(defaultCart);
    const value = {isCartOpen, setIsCartOpen, cart, setCart};

    return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

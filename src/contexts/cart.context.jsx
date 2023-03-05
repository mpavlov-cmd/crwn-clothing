import {createContext, useState, useEffect} from "react";

class Cart {

    _cartProducts = new Map();

    constructor(cartItemsArray) {
        cartItemsArray.forEach((product) => {
            this._cartProducts.set(product.id, product)
        })
    }

    addItem(product) {
        this._cartProducts.set(product.id, product);
    }

    removeItem(id) {
        this._cartProducts.delete(id);
    }

    listItems() {
        return Array.from(this._cartProducts, ([_, value]) => (value))
    }

    countItems() {
        return this._cartProducts.size;
    }
}

const cartInstance = new Cart([]);
export const CartContext = createContext({
    isCartOpen: false,
    setIsCartOpen: () => {},
    cart: cartInstance,
    setCart: () => null
});

export const CartProvider = ({children}) => {

    const [cart, setCart] = useState(cartInstance);
    const [isCartOpen, setIsCartOpen] = useState(false);
    const value = {isCartOpen, setIsCartOpen, cart, setCart};

    useEffect(() => {
        const emptyCart = new Cart([]);
        setCart(emptyCart);
    }, [])

    return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

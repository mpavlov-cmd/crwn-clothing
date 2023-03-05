import {createContext, useEffect, useState} from "react";
import SHOP_DATA from '../shop-data.json';

class ProductStore {

    _products = new Map();
    _productsArray;

    constructor(products) {
        this._productsArray = products;
        products.forEach((product) => {
            this._products.set(product.id, product)
        })
    }

    getProductById(id) {
        return this._products.get(id);
    }

    getProductsArray() {
        return [...this._productsArray];
    }
}

const productStoreInstance = new ProductStore([]);
export const ProductsContext = createContext({
    products: productStoreInstance,
    setProducts: () => null
});

export const ProductsProvider = ({children}) => {

    const [products, setProducts] = useState(productStoreInstance);
    const value = {products, setProducts};

    useEffect(() => {
            const fetchedProducts = new ProductStore(SHOP_DATA);
            setProducts(fetchedProducts);
    }, [])

    return <ProductsContext.Provider value={value}>{children}</ProductsContext.Provider>
}
import {createContext, useEffect, useState} from "react";
import {fireStoreRepo} from "../utils/firebase/firebase.utils";

export class ProductStore {

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

class CategoryStore {

    _categories = new Map();

    constructor(categoriesObject) {
        for (const [key, value] of Object.entries(categoriesObject)) {
            this._categories.set(key, new ProductStore(value))
        }

        // console.log(this);
    }

    getCategoryByName(name) {
        const productStore = this._categories.get(name);
        console.log("No category found with name: " + name);
        return productStore ? productStore : new ProductStore([]);
    }

    listCategoryNames() {
        return Array.from(this._categories.keys());
    }
}

const categoryStoreInstance = new CategoryStore({});
export const CategoriesContext = createContext({
    categories: categoryStoreInstance,
    setCategories: () => null
});

export const CategoriesProvider = ({children}) => {

    const [categories, setCategories] = useState(categoryStoreInstance);
    const value = {categories, setCategories};

    // Example of async func. inside useEffect
    useEffect(() => {

        const getCategoriesFunction = async () => {
                return await fireStoreRepo.getCategoriesAndDocuments();
            }
            // Run async function
            getCategoriesFunction().then((categoriesAndProducts) => {
                const fetchedCategories = new CategoryStore(categoriesAndProducts)
                setCategories(fetchedCategories);
            });
    }, [])

    return <CategoriesContext.Provider value={value}>{children}</CategoriesContext.Provider>
}
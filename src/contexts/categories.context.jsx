import {createContext, useEffect, useState} from "react";
import {gql, useQuery} from "@apollo/client";

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

    constructor(categoriesArray) {
        if (Array.isArray(categoriesArray)) {
            categoriesArray.forEach(category => {
                this._categories.set(category.title.toLowerCase(), new ProductStore(category.items))
            });
        }
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

const COLLECTIONS = gql`
    query {
        collections {
            id
            title
            items {
                id
                name
                price
                imageUrl
            }
        }
    }
`;

export const CategoriesProvider = ({children}) => {

    const {loading, error, data} = useQuery(COLLECTIONS);
    const [categories, setCategories] = useState(categoryStoreInstance);

    // Example of async func. inside useEffect
    useEffect(() => {
        if (data) {
            const {collections} = data;
            const fetchedCategories = new CategoryStore(collections);
            setCategories(fetchedCategories);
        }
    }, [data]);

    const value
        = {categories, setCategories, loading, error};

    return <CategoriesContext.Provider value={value}>{children}</CategoriesContext.Provider>
}
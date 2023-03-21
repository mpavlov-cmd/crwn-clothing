import {createContext, useEffect, useState} from "react";
import {fireStoreRepo} from "../utils/firebase/firebase.utils";

export const CategoriesContext = createContext({
    categories: {},
    setCategories: () => null
});

export const CategoriesProvider = ({children}) => {

    const [categories, setCategories] = useState({});
    const value = {categories, setCategories};

    // Example of async func. inside useEffect
    useEffect(() => {

        const getCategoriesFunction = async () => {
                const categoriesAndDocuments = await fireStoreRepo.getCategoriesAndDocuments();
                console.log(categoriesAndDocuments);
                return categoriesAndDocuments;
            }
            // Run async function
            getCategoriesFunction().then((categoriesAndProducts) => {
                setCategories(categoriesAndProducts);
            });
    }, [])

    return <CategoriesContext.Provider value={value}>{children}</CategoriesContext.Provider>
}
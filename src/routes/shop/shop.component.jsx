import {Routes, Route} from 'react-router-dom';

import CategoriesPreview from "../categories-preview/categories-preview.component";
import Category from "../category/category.component";
import {useEffect} from "react";
import {fireStoreRepo} from "../../utils/firebase/firebase.utils";
import {setCategories} from "../../store/categories/categories.action";
import {useDispatch} from "react-redux";

const Shop = () => {

    const dispatch = useDispatch();

    // Fetch categories
    useEffect(() => {

        const getCategoriesFunction = async () => {
            return await fireStoreRepo.getCategoriesAndDocuments();
        }
        // Run async function
        getCategoriesFunction().then((categoriesAndProducts) => {
            dispatch(setCategories(categoriesAndProducts));
        });
    }, [dispatch])

    return (
        <Routes>
            <Route index element={<CategoriesPreview />}/>
            {/*Example of named parameters passing*/}
            <Route path=":category" element={<Category />}/>
        </Routes>
    )
}

export default Shop;
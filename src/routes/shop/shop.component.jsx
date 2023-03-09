import {Routes, Route} from 'react-router-dom';

import './shop.styles.scss'
import CategoriesPreview from "../categories-preview/categories-preview.component";
import Category from "../category/category.component";

const Shop = () => {

    return (
        <Routes>
            <Route index element={<CategoriesPreview />}/>
            {/*Example of named parameters passing*/}
            <Route path=":category" element={<Category />}/>
        </Routes>
    )
}

export default Shop;
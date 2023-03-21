import {useContext} from "react";
import {CategoriesContext} from "../../contexts/categories.context";

import './categories-preview.styles'
import CategoryPreview from "../../components/categroy-preview/category-preview.component";
import {CategoryPreviewContainer} from "./categories-preview.styles";

const CategoriesPreview = () => {

    const {categories} = useContext(CategoriesContext);
    const categoryNames = Object.keys(categories);
    return (
        <CategoryPreviewContainer className='category-preview-container'>
            {
                categoryNames.map((categoryName, index) => {
                    const productsArray = categories[categoryName];
                    return (
                        <CategoryPreview
                            key={categoryName + '_' + index}
                            title={categoryName}
                            products={productsArray}
                        />
                    )
                })
            }
        </CategoryPreviewContainer>
    )
}

export default CategoriesPreview;

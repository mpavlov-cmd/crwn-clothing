import {useContext} from "react";
import {CategoriesContext} from "../../contexts/categories.context";

import './categories-preview.styles'
import CategoryPreview from "../../components/categroy-preview/category-preview.component";
import {CategoryPreviewContainer} from "./categories-preview.styles";

const CategoriesPreview = () => {

    const {categories} = useContext(CategoriesContext);
    const categoryNames = categories.listCategoryNames()
    return (
        <CategoryPreviewContainer className='category-preview-container'>
            {
                categoryNames.map((categoryName, index) => {
                    const categoryItems = categories.getCategoryByName(categoryName);
                    const productsArray = categoryItems.getProductsArray();
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

import {useContext} from "react";
import {CategoriesContext} from "../../contexts/categories.context";

import './categories-preview.styles.scss'
import CategoryPreview from "../../components/categroy-preview/categroty-preview.component";

const CategoriesPreview = () => {

    const {categories} = useContext(CategoriesContext);
    const categoryNames = categories.listCategoryNames()
    return (
        <div className='category-preview-container'>
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
        </div>
    )
}

export default CategoriesPreview;
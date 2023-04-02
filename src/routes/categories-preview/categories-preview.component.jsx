import './categories-preview.styles'
import CategoryPreview from "../../components/categroy-preview/category-preview.component";
import {CategoryPreviewContainer} from "./categories-preview.styles";
import {useSelector} from "react-redux";
import {categoriesMapSelector, selectIsCategoriesLoading} from "../../store/categories/categories.selector";
import Spinner from "../../components/spinner/spinner.component";

const CategoriesPreview = () => {

    const categories = useSelector(categoriesMapSelector);
    const isLoading = useSelector(selectIsCategoriesLoading)
    const categoryNames = Object.keys(categories);

    return (
        <CategoryPreviewContainer className='category-preview-container'>

            {
                isLoading ? <Spinner/> :
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

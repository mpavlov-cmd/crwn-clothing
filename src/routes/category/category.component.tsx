import './category.styles';
import {useParams} from "react-router-dom";
import ProductCard from "../../components/product-card/product-card.component";
import {CategoryContainer, CategoryRootContainer, CategoryTitle} from "./category.styles";
import {useSelector} from "react-redux";
import {categoriesMapSelector, selectIsCategoriesLoading} from "../../store/categories/categories.selector";
import Spinner from "../../components/spinner/spinner.component";

type CategoryRouteParams = {
    category: string;
}

const Category = () => {
    // Enforce that the only situation when category will be rendered is when user goes to the route
    // so params will be present
    const {category} = useParams<keyof CategoryRouteParams>() as CategoryRouteParams;

    const categories = useSelector(categoriesMapSelector);
    const isLoading = useSelector(selectIsCategoriesLoading)
    const products = categories[category];

    return (
        <CategoryRootContainer className='category-root-container'>
            <h2>
                <CategoryTitle className='category-title'>{category.toUpperCase()}</CategoryTitle>
            </h2>
            {
                isLoading ? <Spinner /> :
                    <CategoryContainer className='category-container'>
                        {
                            products && products.map((product) =>
                                <ProductCard key={product.id} product={product}/>)
                        }
                    </CategoryContainer>
            }
        </CategoryRootContainer>
    )
}

export default Category;

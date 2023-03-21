import './category.styles';
import {useParams} from "react-router-dom";
import ProductCard from "../../components/product-card/product-card.component";
import {CategoryContainer, CategoryRootContainer, CategoryTitle} from "./category.styles";
import {useSelector} from "react-redux";
import {loadedCategoriesSelector} from "../../store/categories/categories.selector";

const Category = () => {

    const {category} = useParams();
    const categories = useSelector(loadedCategoriesSelector);
    const products = categories[category];

    return (
        <CategoryRootContainer className='category-root-container'>
            <h2>
                <CategoryTitle className='category-title'>{category.toUpperCase()}</CategoryTitle>
            </h2>
            <CategoryContainer className='category-container'>
                {
                    products && products.map((product) =>
                        <ProductCard key={product.id} product={product}/>)
                }
            </CategoryContainer>
        </CategoryRootContainer>
    )
}

export default Category;

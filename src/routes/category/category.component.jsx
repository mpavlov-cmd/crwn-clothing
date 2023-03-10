import './category.styles';
import {useParams} from "react-router-dom";
import {useContext, useState, useEffect} from "react";
import {CategoriesContext, ProductStore} from "../../contexts/categories.context";
import ProductCard from "../../components/product-card/product-card.component";
import {CategoryContainer, CategoryRootContainer, CategoryTitle} from "./category.styles";

const Category = () => {

    const {category} = useParams();
    const {categories} = useContext(CategoriesContext);

    // Use state so we get category products only once;
    const [productStore, setProductStore] = useState(new ProductStore([]));

    useEffect(() => {
        const receivedProductStore = categories.getCategoryByName(category);
        setProductStore(receivedProductStore);
    }, [categories, category])

    return (
        <CategoryRootContainer className='category-root-container'>
            <h2>
                <CategoryTitle className='category-title'>{category.toUpperCase()}</CategoryTitle>
            </h2>
            <CategoryContainer className='category-container'>
                {
                    productStore && productStore.getProductsArray().map((product) =>
                        <ProductCard key={product.id} product={product}/>)
                }
            </CategoryContainer>
        </CategoryRootContainer>
    )
}

export default Category;

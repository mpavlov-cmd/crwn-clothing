import './category.styles.scss';
import {useParams} from "react-router-dom";
import {useContext, useState, useEffect} from "react";
import {CategoriesContext, ProductStore} from "../../contexts/categories.context";
import ProductCard from "../../components/product-card/product-card.component";

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
        <div>
            <h2>
                <span className='category-title'>{category.toUpperCase()}</span>
            </h2>
            <div className='category-container'>
                {
                    productStore && productStore.getProductsArray().map((product) =>
                        <ProductCard key={product.id} product={product}/>)
                }
            </div>
        </div>
    )
}

export default Category;
import {Fragment, useContext} from "react";
import {CategoriesContext} from "../../contexts/categories.context";
import ProductCard from "../../components/product-card/product-card.component";

import './shop.styles.scss'

const Shop = () => {

    const {categories} = useContext(CategoriesContext);
    return (
        <Fragment>
            {
                categories.listCategoryNames().map((categoryName) => {
                    const categoryItems = categories.getCategoryByName(categoryName);
                    return (
                        <Fragment key={categoryName}>
                            <h2>{categoryName}</h2>
                            <div className='products-container'>
                                {
                                    categoryItems.getProductsArray().map((product) => {
                                        return (
                                            <ProductCard key={product.id} product={product}></ProductCard>
                                        )
                                    })
                                }
                            </div>
                        </Fragment>
                    )
                })
            }
        </Fragment>
    )
}

export default Shop;
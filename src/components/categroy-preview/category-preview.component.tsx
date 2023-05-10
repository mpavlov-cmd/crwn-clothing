import './category-preview.styles';
import ProductCard from "../product-card/product-card.component";
import {CategoryPreviewContainer, Preview, Title} from "./category-preview.styles";
import {FC} from "react";
import {CategoryItem} from "../../store/categories/categories.types";

export type CategoryPreviewParams = {
    title: string;
    products: CategoryItem[];
}

const CategoryPreview: FC<CategoryPreviewParams> = ({title, products}) => {

    return (
        <CategoryPreviewContainer className='category-preview-container'>
            <h2>
                <Title className='title' to={title}>{title.toUpperCase()}</Title>
            </h2>
            <Preview className='preview'>
                {
                    products
                        .filter((_, idx) => idx < 4)
                        .map((product) => {
                            return (
                                <ProductCard key={product.id} product={product}/>
                            )
                        })
                }
            </Preview>
        </CategoryPreviewContainer>
    )
}

export default CategoryPreview;

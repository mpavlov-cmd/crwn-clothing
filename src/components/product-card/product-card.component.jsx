import './product-card.styles'
import Button, {BUTTON_TYPE_CLASSES} from "../button/button.component";
import {Footer, FooterName, FooterPrice, ProductCardContainer} from "./product-card.styles";
import {useDispatch} from "react-redux";
import {addItemToCart} from "../../store/cart/cart.reducer";

const ProductCard = ({product}) => {

    const {name, imageUrl, price} = product;
    const dispatch = useDispatch();

    const addItemToCartHandler = (product) => {
        dispatch(addItemToCart(product));
    }

    return (
        <ProductCardContainer className='product-card-container'>
            <img src={imageUrl} alt={name}/>
            <Footer className='footer'>
                <FooterName className='name'>{name}</FooterName>
                <FooterPrice className='price'>{price}</FooterPrice>
            </Footer>
            <Button buttonType={BUTTON_TYPE_CLASSES.inverted}
                    onClick={() => addItemToCartHandler(product)}>Add to cart</Button>
        </ProductCardContainer>
    )

}

export default ProductCard;

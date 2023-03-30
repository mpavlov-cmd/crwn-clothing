import './product-card.styles'
import Button, {BUTTON_TYPE_CLASSES} from "../button/button.component";
import {Footer, FooterName, FooterPrice, ProductCardContainer} from "./product-card.styles";
import {useDispatch, useSelector} from "react-redux";
import {selectCartItems} from "../../store/cart/cart.selector";
import {addItemToCart} from "../../store/cart/cart.action";

const ProductCard = ({product}) => {

    const {name, imageUrl, price} = product;
    const cartItems = useSelector(selectCartItems);
    const dispatch = useDispatch();

    const addItemToCartHandler = (product) => {
        dispatch(addItemToCart(cartItems, product));
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

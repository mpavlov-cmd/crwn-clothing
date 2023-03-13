import './product-card.styles'
import Button, {BUTTON_TYPE_CLASSES} from "../button/button.component";
import {useContext} from "react";
import {CartContext} from "../../contexts/cart.context";
import {Footer, FooterName, FooterPrice, ProductCardContainer} from "./product-card.styles";

const ProductCard = ({product}) => {

    const {name, imageUrl, price} = product;
    const {cart} = useContext(CartContext);

    const addItemToCart = (product) => {
        cart.addItem(product);
    }

    return (
        <ProductCardContainer className='product-card-container'>
            <img src={imageUrl} alt={name}/>
            <Footer className='footer'>
                <FooterName className='name'>{name}</FooterName>
                <FooterPrice className='price'>{price}</FooterPrice>
            </Footer>
            <Button buttonType={BUTTON_TYPE_CLASSES.inverted} onClick={() => addItemToCart(product)}>Add to cart</Button>
        </ProductCardContainer>
    )

}

export default ProductCard;

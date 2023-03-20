import './checkout-item.styles';
import {useContext} from "react";
import {CartContext} from "../../contexts/cart.context";
import {
    Arrow,
    CheckoutItemContainer,
    ImageContainer,
    Name,
    Price,
    Quantity,
    RemoveButton,
    Value
} from "./checkout-item.styles";

const CheckoutItem = ({item}) => {
    const {name, imageUrl, price, quantity} = item;
    const {addItemToCart, removeItemToCart, clearItemFromCart} = useContext(CartContext);

    const incrementNumOfItemsHandler = (item) => {
        addItemToCart(item);
    }

    const decrementNumOfItemsHandler = (item) => {
        removeItemToCart(item);
    }

    const clearItemFromCartHandler = (item) => {
        clearItemFromCart(item);
    }

    return (
        <CheckoutItemContainer className='checkout-item-container'>
            <ImageContainer className='image-container'>
                <img src={imageUrl} alt={name}/>
            </ImageContainer>
            <Name className='name'>{name}</Name>
            <Quantity className='quantity'>
                <Arrow className='arrow' onClick={() => decrementNumOfItemsHandler(item)}>&#10094;</Arrow>
                <Value className='value'>{quantity}</Value>
                <Arrow className='arrow' onClick={() => incrementNumOfItemsHandler(item)}>&#10095;</Arrow>
            </Quantity>
            <Price className='price'>{price * quantity}</Price>
            <RemoveButton
                className='remove-button' onClick={() => clearItemFromCartHandler(item)}>&#10005;</RemoveButton>
        </CheckoutItemContainer>
    )
}

export default CheckoutItem;

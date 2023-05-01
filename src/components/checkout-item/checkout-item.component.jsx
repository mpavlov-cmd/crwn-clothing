import './checkout-item.styles';
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
import {useDispatch} from "react-redux";
import {addItemToCart, clearItemFromCart, removeItemToCart} from "../../store/cart/cart.reducer";

const CheckoutItem = ({item}) => {
    const {name, imageUrl, price, quantity} = item;

    const dispatch = useDispatch();

    const incrementNumOfItemsHandler = (item) => {
        dispatch(addItemToCart(item));
    }

    const decrementNumOfItemsHandler = (item) => {
        dispatch(removeItemToCart(item));
    }

    const clearItemFromCartHandler = (item) => {
        dispatch(clearItemFromCart(item));
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

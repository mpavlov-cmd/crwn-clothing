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
import {CartItem} from "../../store/cart/cart.types";
import {useDispatch, useSelector} from "react-redux";
import {selectCartItems} from "../../store/cart/cart.selector";
import {addItemToCart, clearItemFromCart, removeItemToCart} from "../../store/cart/cart.action";
import {FC} from "react";

export type CheckoutItemParams = {
    item: CartItem
}

const CheckoutItem: FC<CheckoutItemParams> = ({item}) => {
    const {name, imageUrl, price, quantity} = item;

    const cartItems = useSelector(selectCartItems);
    const dispatch = useDispatch();

    const incrementNumOfItemsHandler = (item: CartItem) => {
        dispatch(addItemToCart(cartItems, item));
    }

    const decrementNumOfItemsHandler = (item: CartItem) => {
        dispatch(removeItemToCart(cartItems, item));
    }

    const clearItemFromCartHandler = (item: CartItem) => {
        dispatch(clearItemFromCart(cartItems, item));
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

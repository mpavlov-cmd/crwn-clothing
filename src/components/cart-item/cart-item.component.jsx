import './cart-item.styles';
import {CartItemContainer, CartItemImg, ItemDetails, ItemName} from "./cart-item.styles";

const CartItem = ({cartItem}) => {

    const {name, imageUrl, price, quantity} = cartItem;
    return (
        <CartItemContainer className='cart-item-container'>
            <CartItemImg src={imageUrl} alt={name}/>
            <ItemDetails className='item-details'>
                <ItemName className='name'>{name}</ItemName>
                <span className='price'>{quantity} x ${price}</span>
            </ItemDetails>
        </CartItemContainer>
    );
}

export default CartItem;

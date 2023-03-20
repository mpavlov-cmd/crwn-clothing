import './cart-icon.styles';
import {useContext} from "react";
import {CartContext} from "../../contexts/cart.context";
import {CartIconContainer, ItemCount, ShoppingIcon} from "./cart-icon.styles";

const CartIcon = () => {

    const {isCartOpen, setIsCartOpen, cartCount} = useContext(CartContext);

    const toggleCartOpen = () => {
        setIsCartOpen(!isCartOpen);
    }

    return (
        <CartIconContainer className='cart-icon-container' onClick={toggleCartOpen}>
            <ShoppingIcon className='shopping-icon'/>
            <ItemCount className='item-count'>{cartCount}</ItemCount>
        </CartIconContainer>
    )
}

export default CartIcon;
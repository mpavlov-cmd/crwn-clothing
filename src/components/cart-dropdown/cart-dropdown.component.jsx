import './cart-dropdown.styles';
import {useNavigate} from 'react-router-dom'
import Button from "../button/button.component";
import CartItem from "../cart-item/cart-item.component";
import {Fragment, useContext} from "react";
import {CartContext} from "../../contexts/cart.context";
import {CartDropdownContainer, CartItems, EmptyMessage} from "./cart-dropdown.styles";

const CartDropdown = () => {

    const {cartItems, setIsCartOpen, cartCount} = useContext(CartContext);
    const navigate = useNavigate();

    const goToCheckoutHandler = () => {
        navigate('/checkout');
        setIsCartOpen(false);
    }

    return (
        <CartDropdownContainer className='cart-dropdown-container'>
            <CartItems className='cart-items'>
                {
                    cartCount ? (
                        cartItems.map((item) => <CartItem key={item.id} cartItem={item} />)
                    ) : (
                        <EmptyMessage>Your cart is empty</EmptyMessage>
                    )
                }
            </CartItems>
            {
                cartCount ? (
                    <Button onClick={goToCheckoutHandler}>GO TO CHECKOUT</Button>
                ) : (<Fragment/>)
            }
        </CartDropdownContainer>
    )
}

export default CartDropdown;

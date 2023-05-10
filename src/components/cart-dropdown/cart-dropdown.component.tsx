import './cart-dropdown.styles';
import {useNavigate} from 'react-router-dom'
import Button from "../button/button.component";
import CartItemComponent from "../cart-item/cart-item.component";
import {Fragment} from "react";
import {CartDropdownContainer, CartItems, EmptyMessage} from "./cart-dropdown.styles";
import {useDispatch, useSelector} from "react-redux";
import {selectCartCount, selectCartItems} from "../../store/cart/cart.selector";
import {setIsCartOpen} from "../../store/cart/cart.action";

const CartDropdown = () => {

    const cartItems = useSelector(selectCartItems);
    const cartCount = useSelector(selectCartCount);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const goToCheckoutHandler = () => {
        navigate('/checkout');
        dispatch(setIsCartOpen(false));
    }

    return (
        <CartDropdownContainer className='cart-dropdown-container'>
            <CartItems className='cart-items'>
                {
                    cartCount ? (
                        cartItems.map((item) => <CartItemComponent key={item.id} cartItem={item} />)
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

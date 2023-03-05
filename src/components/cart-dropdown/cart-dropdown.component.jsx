import './cart-dropdown.styles.scss';
import {useNavigate} from 'react-router-dom'
import Button from "../button/button.component";
import CartItem from "../cart-item/cart-item.component";
import {useContext} from "react";
import {CartContext} from "../../contexts/cart.context";

const CartDropdown = () => {

    const {cart} = useContext(CartContext);
    const navigate = useNavigate();
    const {setIsCartOpen} = useContext(CartContext);

    const goToCheckoutHandler = () => {
        navigate('/checkout');
        setIsCartOpen(false);
    }

    return (
        <div className='cart-dropdown-container'>
            <div className='cart-items'>
                {
                    cart.listItems().map((item) => <CartItem key={item.id} cartItem={item} />)
                }
            </div>
            <Button onClick={goToCheckoutHandler}>GO TO CHECKOUT</Button>
        </div>
    )
}

export default CartDropdown;
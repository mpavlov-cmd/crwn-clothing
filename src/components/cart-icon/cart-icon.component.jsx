import {ReactComponent as ShoppingIcon} from '../../assets/shopping-bag.svg';
import './cart-icon.styles.scss';
import {useContext} from "react";
import {CartContext} from "../../contexts/cart.context";

const CartIcon = () => {

    const {isCartOpen, setIsCartOpen, cart} = useContext(CartContext);

    const toggleCartOpen = () => {
        setIsCartOpen(!isCartOpen);
    }

    return (
        <div className='cart-icon-container' onClick={toggleCartOpen}>
            <ShoppingIcon className='shopping-icon'/>
            <span className='item-count'>{cart.countItems()}</span>
        </div>
    )
}

export default CartIcon;
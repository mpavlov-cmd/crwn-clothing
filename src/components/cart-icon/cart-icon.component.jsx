import './cart-icon.styles';
import {CartIconContainer, ItemCount, ShoppingIcon} from "./cart-icon.styles";
import {useDispatch, useSelector} from "react-redux";
import {selectCartCount, selectIsCartOpen} from "../../store/cart/cart.selector";
import {setIsCartOpen} from "../../store/cart/cart.reducer";

const CartIcon = () => {

    const isCartOpen = useSelector(selectIsCartOpen);
    const cartCount  = useSelector(selectCartCount);

    const dispatch = useDispatch();

    const toggleCartOpen = () => {
        dispatch(setIsCartOpen(!isCartOpen));
    }

    return (
        <CartIconContainer className='cart-icon-container' onClick={toggleCartOpen}>
            <ShoppingIcon className='shopping-icon'/>
            <ItemCount className='item-count'>{cartCount}</ItemCount>
        </CartIconContainer>
    )
}

export default CartIcon;
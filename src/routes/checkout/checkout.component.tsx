import './checkout.styles'
import CheckoutItem from "../../components/checkout-item/checkout-item.component";
import {CheckoutContainer, CheckoutHeader, HeaderBlock, Total} from "./checkout.styles";
import {useSelector} from "react-redux";
import {selectCartItems, selectCartTotal} from "../../store/cart/cart.selector";

const Checkout = () => {

    const cartItems = useSelector(selectCartItems);
    const cartTotal = useSelector(selectCartTotal)

    return (
        <CheckoutContainer className='checkout-container'>
            <CheckoutHeader className='checkout-header'>
                <HeaderBlock className='header-block'><span>Product</span></HeaderBlock>
                <HeaderBlock className='header-block'><span>Description</span></HeaderBlock>
                <HeaderBlock className='header-block'><span>Quantity</span></HeaderBlock>
                <HeaderBlock className='header-block'><span>Price</span></HeaderBlock>
                <HeaderBlock className='header-block'><span>Remove</span></HeaderBlock>
            </CheckoutHeader>
            {cartItems.map((item) => {
                return (
                    <CheckoutItem key={item.id} item={item} />
                )
            })}
            <Total className='total'>Total : {cartTotal}</Total>
        </CheckoutContainer>
    )
}

export default Checkout;

import './checkout.styles'
import {CartContext} from "../../contexts/cart.context";
import {useContext} from "react";
import CheckoutItem from "../../components/checkout-item/checkout-item.component";
import {CheckoutContainer, CheckoutHeader, HeaderBlock, Total} from "./checkout.styles";

const Checkout = () => {

    const {cart} = useContext(CartContext);

    return (
        <CheckoutContainer className='checkout-container'>
            <CheckoutHeader className='checkout-header'>
                <HeaderBlock className='header-block'><span>Product</span></HeaderBlock>
                <HeaderBlock className='header-block'><span>Description</span></HeaderBlock>
                <HeaderBlock className='header-block'><span>Quantity</span></HeaderBlock>
                <HeaderBlock className='header-block'><span>Price</span></HeaderBlock>
                <HeaderBlock className='header-block'><span>Remove</span></HeaderBlock>
            </CheckoutHeader>
            {cart.listItems().map((item) => {
                return (
                    <CheckoutItem key={item.id} item={item} />
                )
            })}
            <Total className='total'>Total : {cart.total()}</Total>
        </CheckoutContainer>
    )
}

export default Checkout;

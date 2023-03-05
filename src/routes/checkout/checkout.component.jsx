import './checkout.styles.scss'
import {CartContext} from "../../contexts/cart.context";
import {useContext} from "react";
import CheckoutItem from "../../components/checkout-item/checkout-item.component";

const Checkout = () => {

    const {cart} = useContext(CartContext);

    return (
        <div className='checkout-container'>
            <div className='checkout-header'>
                <div className='header-block'><span>Product</span></div>
                <div className='header-block'><span>Description</span></div>
                <div className='header-block'><span>Quantity</span></div>
                <div className='header-block'><span>Price</span></div>
                <div className='header-block'><span>Remove</span></div>
            </div>
            {cart.listItems().map((item) => {
                return (
                    <CheckoutItem id={item.id} item={item} />
                    // <div key={id}>
                    //     <h2>{name}</h2>
                    //     <span>{quantity}</span>
                    //     <span onClick={() => decrementNumOfItems(item)}>decrement</span>
                    //     <br/>
                    //     <span onClick={() => incrementNumOfItems(item)}>increment</span>
                    // </div>
                )
            })}
            <span className='total'>Total : {cart.total()}</span>
        </div>
    )
}

export default Checkout;
import './checkout-item.styles.scss';
import {useContext} from "react";
import {CartContext} from "../../contexts/cart.context";

const CheckoutItem = ({item}) => {
    const {name, imageUrl, price, quantity} = item;
    const {cart} = useContext(CartContext);

    const incrementNumOfItemsHandler = (item) => {
        cart.addItem(item);
    }

    const decrementNumOfItemsHandler = (item) => {
        cart.removeItem(item.id);
    }

    const clearItemFromCartHandler = (item) => {
        cart.clearItem(item.id);
    }

    return (
        <div className='checkout-item-container'>
            <div className='image-container'>
                <img src={imageUrl} alt={name}/>
            </div>
            <span className='name'>{name}</span>
            <span className='quantity'>
                <div className='arrow' onClick={() => decrementNumOfItemsHandler(item)}>&#10094;</div>
                <span className='value'>{quantity}</span>
                <div className='arrow' onClick={() => incrementNumOfItemsHandler(item)}>&#10095;</div>
            </span>
            <span className='price'>{price}</span>
            <div className='remove-button' onClick={() => clearItemFromCartHandler(item)}>&#10005;</div>
        </div>
    )
}

export default CheckoutItem;
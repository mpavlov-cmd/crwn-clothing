import {PaymentsFormContainer, FormContainer, PaymentButton} from "./payment-form.styles";
import {useDispatch, useSelector} from "react-redux";
import {selectCartTotal} from "../../store/cart/cart.selector";
import {currentUserSelector} from "../../store/user/user.selector";
import {selectPaymentInProgress} from "../../store/checkout/checkout.selector";
import {CardElement, useStripe, useElements} from "@stripe/react-stripe-js";
import {BUTTON_TYPE_CLASSES} from "../button/button.component";
import {setPaymentInProgress} from "../../store/checkout/checkout.reducer";
import {clearCart} from "../../store/cart/cart.reducer";

const PaymentForm = () => {

    const stripe = useStripe();
    const elements = useElements();

    const amount = useSelector(selectCartTotal);
    const currentUser = useSelector(currentUserSelector);
    const paymentInProgress = useSelector(selectPaymentInProgress);

    const dispatch = useDispatch();

    const paymentHandler = async (e) => {
        e.preventDefault();

        if (!stripe || !elements) {
            return;
        }

        dispatch(setPaymentInProgress(true));

        const response = await fetch('/.netlify/functions/create-payment-intent', {
            method: 'post',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                amount: amount * 100
            })
        }).then(response => response.json());

        const clientSecret = response.paymentIntent.client_secret;
        const paymentResult =
            await stripe.confirmCardPayment(clientSecret, {
                payment_method: {
                    card: elements.getElement(CardElement),
                    billing_details: {
                        name: currentUser ? currentUser.displayName : 'Guest',
                    }
                }
        });

        dispatch(setPaymentInProgress(false));

        if (paymentResult.error) {
            alert(paymentResult.error);
        } else {
            if (paymentResult.paymentIntent.status === 'succeeded') {
                alert('Payment Successful');
                dispatch(clearCart());
            }
        }
    }

    return (
        <PaymentsFormContainer>
            <FormContainer onSubmit={paymentHandler}>
                <h2>Credit Card Payment:</h2>
                <CardElement/>
                <PaymentButton
                    isLoading={paymentInProgress}
                    buttonType={BUTTON_TYPE_CLASSES.inverted}>Pay Now
                </PaymentButton>
            </FormContainer>
        </PaymentsFormContainer>
    )
}

export default PaymentForm;
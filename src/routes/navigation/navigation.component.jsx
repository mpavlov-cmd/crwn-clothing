import {Outlet} from "react-router-dom";
import {Fragment, useContext} from "react";
import {ReactComponent as CrownLogo} from "../../assets/crown.svg";
import {UserContext} from "../../contexts/user.context";
import {fireBaseAuth} from "../../utils/firebase/firebase.utils";
import {LogoContainer, NavigationContainer, NavLink, NavLinksContainer} from "./navigation.styles";
import CartIcon from "../../components/cart-icon/cart-icon.component";
import CartDropdown from "../../components/cart-dropdown/cart-dropdown.component";
import {CartContext} from "../../contexts/cart.context";

const Navigation = () => {

    const {currentUser} = useContext(UserContext);
    const {isCartOpen} = useContext(CartContext);

    // console.log(currentUser);

    const signOutHandler = async () => {
        await fireBaseAuth.signOutUser();
    }

    return (
        <Fragment>
            <NavigationContainer>
                <LogoContainer className='logo-container' to='/'>
                    <CrownLogo className='logo' title='Crown Logo' />
                </LogoContainer>
                <NavLinksContainer className='nav-links-container'>
                    <NavLink className='nav-link' to='/shop'>SHOP</NavLink>
                    {currentUser ? (
                        <NavLink as='span' className='nav-link' onClick={signOutHandler}>SIGN OUT</NavLink>
                    ) : (
                        <NavLink className='nav-link' to='/auth'>SIGN-IN</NavLink>
                    )}
                    <CartIcon/>
                </NavLinksContainer>
                {isCartOpen && <CartDropdown/> }
            </NavigationContainer>
            <Outlet></Outlet>
        </Fragment>
    )
}
export default Navigation
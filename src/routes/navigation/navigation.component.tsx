import {Outlet} from "react-router-dom";
import {Fragment} from "react";
import {useDispatch, useSelector} from "react-redux";
import {ReactComponent as CrownLogo} from "../../assets/crown.svg";
import {LogoContainer, NavigationContainer, NavLink, NavLinksContainer} from "./navigation.styles";
import CartIcon from "../../components/cart-icon/cart-icon.component";
import CartDropdown from "../../components/cart-dropdown/cart-dropdown.component";
import {currentUserSelector} from "../../store/user/user.selector";
import {selectIsCartOpen} from "../../store/cart/cart.selector";
import {signOutUserStart} from "../../store/user/user.action";

const Navigation = () => {

    const dispatch = useDispatch();

    const currentUser = useSelector(currentUserSelector);
    const isCartOpen = useSelector(selectIsCartOpen);

    const signOutHandler = async () => {
        dispatch(signOutUserStart());
    }

    return (
        <Fragment>
            <NavigationContainer>
                <LogoContainer className='logo-container' to='/'>
                    <CrownLogo className='logo' textAnchor='Crown Logo'/>
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
import { Fragment, SyntheticEvent } from "react";
import { Outlet } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { ReactComponent as CrwnLogo } from "../../assets/crown.svg";
import CartIcon from "../../components/cart-icon/cart-icon.component";

import CartDropdown from "../../components/cart-dropdown/cart-dropdown.component";

import { selectCurrentUser } from "../../store/user/user.selector";

import { NavigationContainer, NavLink, NavLinks, LogoContainer } from './navigation.styles';
import { selectIsCartOpen } from "../../store/cart/cart.selector";
import { signOutStart } from "../../store/user/user.reducer";
// import { signOutStart } from "../../store/user/user.action";


const Navigation = () => {
  const dispatch = useDispatch();
  const currentUser = useSelector(selectCurrentUser);
  const isCartOpen = useSelector(selectIsCartOpen);

  const signOutHandler = (event: SyntheticEvent) => {
    event.preventDefault();
    dispatch(signOutStart());
  };

  return (
    <Fragment>
      <NavigationContainer>
        <LogoContainer to='/'>
          <CrwnLogo className='logo' />
        </LogoContainer>
        <NavLinks>
          <NavLink to='/shop'>
            SHOP
          </NavLink>
          {
            currentUser ? (
              <NavLink as='span' onClick={signOutHandler} to={''}>
                SIGN OUT</NavLink>
              ) : ( <NavLink to='/auth'>SIGN IN</NavLink> )
          }
          <CartIcon />
        </NavLinks>
      </NavigationContainer>
      {
        isCartOpen && <CartDropdown />
      }
      <Outlet />
    </Fragment>
  );
}

export default Navigation
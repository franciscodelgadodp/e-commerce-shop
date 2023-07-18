import { useDispatch, useSelector } from 'react-redux';

import { selectCartItemsCount, selectIsCartOpen } from '../../store/cart/cart.selector';
import { setIsCartOpen } from '../../store/cart/cart.actions';

import { ShoppingIcon, CartIconContainer, ItemCount } from './cart-icon.styles';


const CartIcon = () => {
  const dispatch = useDispatch();
  const isCartOpen = useSelector(selectIsCartOpen);
  const cartItemsCount = useSelector(selectCartItemsCount);

  const handleCartIconClick = () => {
    dispatch(setIsCartOpen(!isCartOpen));
  };

  return (
    <CartIconContainer onClick={handleCartIconClick}>
      <ShoppingIcon className='shopping-icon'/>
      <ItemCount>{cartItemsCount}</ItemCount>
    </CartIconContainer>
  )
};

export default CartIcon
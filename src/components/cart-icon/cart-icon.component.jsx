import { useContext } from 'react';

import { CartContext } from '../../contexts/cart.context';

import { ShoppingIcon, CartIconContainer, ItemCount } from './cart-icon.styles';

const CartIcon = () => {
  const { isCartOpen, setIsCartOpen, cartItemsCount } = useContext(CartContext);

  const handleCartIconClick = () => {
    setIsCartOpen(!isCartOpen);
  };

  return (
    <CartIconContainer onClick={handleCartIconClick}>
      <ShoppingIcon className='shopping-icon'/>
      <ItemCount>{cartItemsCount}</ItemCount>
    </CartIconContainer>
  )
};

export default CartIcon
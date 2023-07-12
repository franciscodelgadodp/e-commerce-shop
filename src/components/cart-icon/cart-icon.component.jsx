import { useContext } from 'react';
import { ReactComponent as ShoppingIcon } from '../../assets/shopping-bag.svg';

import './cart-icon.styles.scss';
import { CartContext } from '../../contexts/cart.context';

const CartIcon = () => {
  const { isCartOpen, setIsCartOpen, cartItemsCount } = useContext(CartContext);

  const handleCartIconClick = () => {
    setIsCartOpen(!isCartOpen);
  };

  return (
    <div className='cart-icon-container' onClick={handleCartIconClick}>
      <ShoppingIcon className='shopping-icon'/>
      <span className='item-count'>{cartItemsCount}</span>
    </div>
  )
};

export default CartIcon
import { FC } from 'react';
import { CartItem as CartItemType } from '../../store/cart/cart.types';
import { CartItemContainer, ItemDetails, CartItemText } from './cart-item.styles';

type CartItemProps = {
  cartItem: CartItemType
};

const CartItem: FC<CartItemProps> = ({ cartItem }) => {
  const { name, quantity, imageUrl, price } = cartItem;
  return (
    <CartItemContainer>
      <img src={imageUrl} alt={name}/>
      <ItemDetails>
        <CartItemText>{name}</CartItemText>
        <CartItemText>{quantity} x ${price}</CartItemText>
      </ItemDetails>
    </CartItemContainer>
  )
};

export default CartItem;
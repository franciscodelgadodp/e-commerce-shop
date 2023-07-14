import { CartItemContainer, ItemDetails, CartItemText } from './cart-item.styles';

const CartItem = ({ cartItem }) => {
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
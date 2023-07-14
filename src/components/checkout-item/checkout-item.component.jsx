import { useContext } from 'react';
import { CartContext } from '../../contexts/cart.context';

import { 
  CheckoutItemContainer, 
  ImageContainer, 
  CheckoutItemText, 
  Quantity, 
  Arrow, 
  Value,
  RemoveButton
} from './checkout-item.styles';


const CheckoutItem = ({ cartItem }) => {
  const { name, imageUrl, price, quantity } = cartItem;
  const { addItemToCart, removeItemFromCart } = useContext(CartContext);

  const clearItemHandler = () => removeItemFromCart(cartItem, true);
  const addItemHandler = () => addItemToCart(cartItem);
  const removeItemHandler = () => removeItemFromCart(cartItem);

  return (
    <CheckoutItemContainer>
      <ImageContainer>
        <img src={imageUrl} alt={name}/>
      </ImageContainer>
      <CheckoutItemText>{name}</CheckoutItemText>
      <Quantity>
        <Arrow onClick={removeItemHandler}>
          &#10094;
        </Arrow>
        <Value>{quantity}</Value>
        <Arrow onClick={addItemHandler}>
          &#10095;
        </Arrow>
      </Quantity>
      <CheckoutItemText>{price}</CheckoutItemText>
      <RemoveButton onClick={clearItemHandler}>&#10005;</RemoveButton>
    </CheckoutItemContainer>
  )
};

export default CheckoutItem;
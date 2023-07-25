import { FC } from 'react';
import { useDispatch } from 'react-redux';

// import { addItemToCart, removeItemFromCart } from '../../store/cart/cart.actions';

import { 
  CheckoutItemContainer, 
  ImageContainer, 
  CheckoutItemText, 
  Quantity, 
  Arrow, 
  Value,
  RemoveButton
} from './checkout-item.styles';
import { addItemToCart, removeItemFromCart } from '../../store/cart/cart.reducer';
import { CartItem } from '../../store/cart/cart.types';


type CheckoutItemProps = {
  cartItem: CartItem
};

const CheckoutItem: FC<CheckoutItemProps> = ({ cartItem }) => {
  const dispatch = useDispatch();
  const { name, imageUrl, price, quantity } = cartItem;

  const clearItemHandler = () => dispatch(removeItemFromCart({ productToRemove: cartItem, completeRemoval: true }));
  const addItemHandler = () => dispatch(addItemToCart(cartItem));
  const removeItemHandler = () => dispatch(removeItemFromCart({ productToRemove: cartItem }));

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
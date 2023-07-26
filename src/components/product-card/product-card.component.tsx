import { useDispatch } from 'react-redux';

// import { addItemToCart } from '../../store/cart/cart.actions';

import Button, {BUTTON_CLASSES} from '../button/button.component';

import { ProductCardContainer, Footer, Name, Price } from './product-card.styles';
import { addItemToCart } from '../../store/cart/cart.reducer';
import { CategoryItem } from '../../store/categories/categories.types';
import { FC } from 'react';


type ProductCardProps = {
  product: CategoryItem
};

const ProductCard: FC<ProductCardProps> = ({ product }) => {
  const dispatch = useDispatch();
  const { name, price, imageUrl } = product;

  const addProductToCart = () => dispatch(addItemToCart(product));

  return (
    <ProductCardContainer>
      <img src={imageUrl} alt={name}/>
      <Footer>
        <Name>{name}</Name>
        <Price>{price}</Price>
      </Footer>
      <Button buttonType={BUTTON_CLASSES.inverted} onClick={addProductToCart}>Add to Cart</Button>
    </ProductCardContainer>
  )
};

export default ProductCard;
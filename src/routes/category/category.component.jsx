import { Fragment, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import ProductCard from '../../components/product-card/product-card.component';
import Spinner from '../../components/spinner/spinner.component';

import { useSelector } from 'react-redux';
import { selectCategoriesIsLoading, selectCategoriesMap } from '../../store/categories/categories.selector';

import { CategoryContainer, CategoryTitle } from './category.styles';


const Category = () => {
  const { category } = useParams();
  const categoriesMap = useSelector(selectCategoriesMap);
  const isLoading = useSelector(selectCategoriesIsLoading);

  const [products, setProducts] = useState([]);

  useEffect(() => {
    setProducts(categoriesMap[category]);
  }, [categoriesMap, category])

  return (
    <Fragment>
      <CategoryTitle>{category.toUpperCase()}</CategoryTitle>
      {
        isLoading ? <Spinner /> : (
        <CategoryContainer>
          {products &&
            products.map(product => (
              <ProductCard key={product.id} product={product} />
            ))
          }
        </CategoryContainer>
        )
      }
    </Fragment>
  )
};

export default Category;
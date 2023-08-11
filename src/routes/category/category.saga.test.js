import { expectSaga, testSaga } from 'redux-saga-test-plan';
import { call } from 'typed-redux-saga/macro';

import { fetchCategoriesAsync, onFetchCategories, categoriesSaga } from '../../store/categories/categories.saga';
import { fetchCategoriesFailed, fetchCategoriesStart, fetchCategoriesSuccess } from '../../store/categories/categories.reducer';
import { getCategoriesAndDocuments } from '../../utils/firebase/firebase.utils';
import { throwError } from 'redux-saga-test-plan/providers';

describe('category sagas', () => { 
  test('categoriesSaga', () => {
    testSaga(categoriesSaga)
      .next()
      .all([call(onFetchCategories)])
      .next()
      .isDone();
  });

  test('onFetchCategories', () => {
    testSaga(onFetchCategories)
      .next()
      .takeLatest(
        fetchCategoriesStart.type,
        fetchCategoriesAsync
      )
      .next()
      .isDone();
  });

  test('fetchCategoriesAsync success', () => {
    const mockCategoriesArray = [
      {id: 1, name: 'Product 1'},
      {id: 2, name: 'Product 2'}
    ];

    return expectSaga(fetchCategoriesAsync)
      .provide([
        [call(getCategoriesAndDocuments), mockCategoriesArray]
      ])
      .put(fetchCategoriesSuccess(mockCategoriesArray))
      .run()
  });
  
  test('fetchCategoriesAsync failure', () => {
    const mockError = new Error('An error occurred');

    return expectSaga(fetchCategoriesAsync)
    .provide([
      [call(getCategoriesAndDocuments), throwError(mockError)]
    ])
    .put(fetchCategoriesFailed(mockError))
    .run()
  });
  
 })
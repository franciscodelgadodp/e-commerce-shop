import { takeLatest, all, call, put } from 'redux-saga/effects';

import { fetchCategoriesStart, fetchCategoriesSuccess, fetchCategoriesFailed} from './categories.reducer';

import { getCategoriesAndDocuments } from '../../utils/firebase/firebase.utils';

export function* fetchCategoriesAsync() {
  try {
    const categoriesArray = yield call(getCategoriesAndDocuments, 'categories');
    yield put(fetchCategoriesSuccess(categoriesArray));
  } catch (error) {
    yield put(fetchCategoriesFailed(error));
  }
}

export function* onFetchCategories() {
  yield takeLatest(fetchCategoriesStart.type, fetchCategoriesAsync)
}

export function* categoriesSaga() {
  yield all([call(onFetchCategories)]);
} 
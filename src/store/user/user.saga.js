import { takeLatest, all, call, put } from 'redux-saga/effects';

import { USER_ACTION_TYPES } from './user.types';

import { signInSuccess, signInFailed, signOutSuccess, signUpSuccess, signUpFailed, signOutFailed } from './user.action';

import { 
  createAuthUserFromEmailAndPassword, 
  createUserDocumentFromAuth, 
  getCurrentUser, 
  signInAuthUserWithEmailAndPassword, 
  signInWithGooglePopup, 
  signOutUser 
} from '../../utils/firebase/firebase.utils';


export function* signInAfterSignUp({ payload }) {
  try { 
    const { user, additionalDetails } = payload;
    debugger;
    yield call(getSnapshotFromUserAuth, user, additionalDetails);
  } catch (error) {
    put(signUpFailed(error));
  }
}


export function* signUpUser(action) {
  try {
    const { email, password, displayName } = action.payload;

    const { user } = yield call(createAuthUserFromEmailAndPassword, email, password);
    debugger;
    yield put(signUpSuccess(user, { displayName }));
  } catch (error) {
    put(signInFailed(error));
  }
}



export function* onSignOutUser() {
  try {
    yield call(signOutUser);
    yield put(signOutSuccess());
  } catch (error) {
    put(signOutFailed(error));
  }
}



export function* signInUserByGoogle() {
  try {
    const { user } = yield call(signInWithGooglePopup);
    yield call(getSnapshotFromUserAuth, user);
  } catch (error) {
    put(signInFailed(error));
  }
}


export function* signInUserByEmail(action) {
  const { email, password } = action.payload;
  try { 
    const { user } = yield call(signInAuthUserWithEmailAndPassword, email, password);
    yield call(getSnapshotFromUserAuth, user);
  } catch (error) {
    put(signInFailed(error));
  }
}


export function* getSnapshotFromUserAuth(userAuth, aditionalInfo) {
  try {
    const userSnapshot = yield call(createUserDocumentFromAuth, userAuth, aditionalInfo);
    yield put(signInSuccess({ id: userSnapshot.id, ...userSnapshot.data() }));
  } catch (error) {
    put(signInFailed(error));
  }
}


export function* isUserAuthenticated() {
  try {
    const userAuth = yield call(getCurrentUser);
    if (!userAuth) return;
    yield call(getSnapshotFromUserAuth, userAuth);
  } catch (error) {
    put(signInFailed(error));
  }
}


export function* onSignUpSuccess() {
  yield takeLatest(USER_ACTION_TYPES.SIGN_UP_SUCCESS, signInAfterSignUp);
}

export function* onUserSignUpStart() {
  yield takeLatest(USER_ACTION_TYPES.SIGN_UP_START, signUpUser)
}

export function* onUserSignOutStart() {
  yield takeLatest(USER_ACTION_TYPES.SIGN_OUT_START, onSignOutUser)
}

export function* onGoogleSignInStart() {
  yield takeLatest(USER_ACTION_TYPES.GOOGLE_SIGN_IN_START, signInUserByGoogle)
}

export function* onEmailSignInStart() {
  yield takeLatest(USER_ACTION_TYPES.EMAIL_SIGN_IN_START, signInUserByEmail);
}

export function* onCheckUserSession() {
  yield takeLatest(USER_ACTION_TYPES.CHECK_USER_SESSION, isUserAuthenticated);
}

export function* userSagas() {
  yield all([
    call(onCheckUserSession), 
    call(onEmailSignInStart), 
    call(onGoogleSignInStart),
    call(onUserSignOutStart),
    call(onUserSignUpStart),
    call(onSignUpSuccess)
  ]);
}

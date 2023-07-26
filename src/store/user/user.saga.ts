import { takeLatest, all, call, put } from 'typed-redux-saga/macro';
import { User } from 'firebase/auth';

import { 
  checkUserSession, 
  emailSignInStart, 
  googleSignInStart, 
  signInSuccess,
  signInFailed,
  signOutStart,
  signOutSuccess,
  signOutFailed,
  signUpStart,
  signUpSuccess,
  signUpFailed,
  EmailSignInStart,
  SignUpStart,
  SignUpSuccess
} from './user.reducer';

import { 
  AdditionalInfo,
  createAuthUserFromEmailAndPassword, 
  createUserDocumentFromAuth, 
  getCurrentUser, 
  signInAuthUserWithEmailAndPassword, 
  signInWithGooglePopup, 
  signOutUser 
} from '../../utils/firebase/firebase.utils';


export function* signInAfterSignUp(action: SignUpSuccess) {
  try { 
    const { user, additionalInfo } = action.payload;
    yield* call(getSnapshotFromUserAuth, user, additionalInfo);
  } catch (error) {
    put(signUpFailed(error as Error));
  }
}


export function* signUpUser(action: SignUpStart) {
  try {
    const { email, password, displayName } = action.payload;

    const userCredential = yield* call(createAuthUserFromEmailAndPassword, email, password);
    if (userCredential) {
      const { user } = userCredential;
      yield* put(signUpSuccess({ user, additionalInfo: { displayName } }));
    }
  } catch (error) {
    put(signUpFailed(error as Error));
  }
}



export function* onSignOutUser() {
  try {
    yield* call(signOutUser);
    yield* put(signOutSuccess());
  } catch (error) {
    put(signOutFailed(error as Error));
  }
}



export function* signInUserByGoogle() {
  try {
    const { user } = yield* call(signInWithGooglePopup);
    yield* call(getSnapshotFromUserAuth, user);
  } catch (error) {
    put(signInFailed(error as Error));
  }
}


export function* signInUserByEmail(action: EmailSignInStart) {
  const { email, password } = action.payload;
  try { 
    const userCredential = yield* call(signInAuthUserWithEmailAndPassword, email, password);
    if (userCredential) {
      const { user } = userCredential
      yield* call(getSnapshotFromUserAuth, user);
    }
  } catch (error) {
    put(signInFailed(error as Error));
  }
}


export function* getSnapshotFromUserAuth(userAuth: User, aditionalInfo?: AdditionalInfo) {
  try {
    const userSnapshot = yield* call(createUserDocumentFromAuth, userAuth, aditionalInfo);
    if (userSnapshot) yield* put(signInSuccess({ id: userSnapshot.id, ...userSnapshot.data() }));
  } catch (error) {
    put(signInFailed(error as Error));
  }
}


export function* isUserAuthenticated() {
  try {
    const userAuth = yield* call(getCurrentUser);
    if (!userAuth) return;
    yield* call(getSnapshotFromUserAuth, userAuth);
  } catch (error) {
    put(signInFailed(error as Error));
  }
}


export function* onSignUpSuccess() {
  yield* takeLatest(signUpSuccess.type, signInAfterSignUp);
}

export function* onUserSignUpStart() {
  yield* takeLatest(signUpStart.type, signUpUser)
}

export function* onUserSignOutStart() {
  yield* takeLatest(signOutStart.type, onSignOutUser)
}

export function* onGoogleSignInStart() {
  yield* takeLatest(googleSignInStart.type, signInUserByGoogle)
}

export function* onEmailSignInStart() {
  yield* takeLatest(emailSignInStart.type, signInUserByEmail);
}

export function* onCheckUserSession() {
  yield* takeLatest(checkUserSession.type, isUserAuthenticated);
}

export function* userSagas() {
  yield* all([
    call(onCheckUserSession), 
    call(onEmailSignInStart), 
    call(onGoogleSignInStart),
    call(onUserSignOutStart),
    call(onUserSignUpStart),
    call(onSignUpSuccess)
  ]);
}

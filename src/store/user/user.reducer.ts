import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from 'firebase/auth';
import { AdditionalInfo, UserData } from '../../utils/firebase/firebase.utils';



export type UserState = {
  readonly currentUser?: UserData;
  readonly isLoading: boolean;
  readonly error?: Error
};

const INITIAL_STATE: UserState = {
  currentUser: undefined,
  isLoading: false,
  error: undefined
};

export type EmailSignInStart = PayloadAction<{ email: string, password: string}>;

export type SignInSuccess = PayloadAction<UserData & { id: string }>;

export type SignUpStart = PayloadAction<{ email: string, password: string, displayName: string }>;

export type SignUpSuccess = PayloadAction<{ user: User, additionalInfo: AdditionalInfo }>;


export const userSlice = createSlice({
  name: 'user',
  initialState: INITIAL_STATE,
  reducers: {
    checkUserSession() {},
    googleSignInStart() {},
    emailSignInStart(state, action: EmailSignInStart) {},
    signInSuccess(state, action: SignInSuccess) {
      state.currentUser = action.payload
    },
    signInFailed(state, action: PayloadAction<Error>) {
      state.error = action.payload
    },
    signOutStart() {},
    signOutSuccess(state) {
      state.currentUser = undefined;
    },
    signOutFailed(state, action: PayloadAction<Error>) {
      state.error = action.payload
    },
    signUpStart(state, action: SignUpStart) {},
    signUpSuccess(state, action: SignUpSuccess) {},
    signUpFailed(state, action: PayloadAction<Error>) {
      state.error = action.payload
    },
  }
});

export const { 
  checkUserSession,
  googleSignInStart,
  emailSignInStart,
  signInSuccess,
  signInFailed,
  signOutStart,
  signOutSuccess,
  signOutFailed,
  signUpStart,
  signUpSuccess,
  signUpFailed,
} = userSlice.actions;

export const userReducer = userSlice.reducer;


// export const userReducerOld = (state = INITIAL_STATE, action) => {
//   const { type, payload } = action;

//   switch(type){
//     case USER_ACTION_TYPES.SIGN_IN_SUCCESS:
//       return {
//         ...state,
//         currentUser: payload,
//       };
//     case USER_ACTION_TYPES.SIGN_OUT_SUCCESS:
//       return {
//         ...state,
//         currentUser: null,
//       };
//     case USER_ACTION_TYPES.SIGN_OUT_FAILED:
//     case USER_ACTION_TYPES.SIGN_IN_FAILED:
//     case USER_ACTION_TYPES.SIGN_UP_FAILED:
//       return {
//         ...state,
//         error: payload,
//       };
//     default:
//       return state;
//   }
// };
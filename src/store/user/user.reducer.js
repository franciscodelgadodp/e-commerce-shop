import { createSlice } from '@reduxjs/toolkit';

const INITIAL_STATE = {
  currentUser: null,
  isLoading: false,
  error: null
};


export const userSlice = createSlice({
  name: 'user',
  initialState: INITIAL_STATE,
  reducers: {
    checkUserSession(state, action) {},
    googleSignInStart(state, action) {},
    emailSignInStart(state, action) {},
    signInSuccess(state, action) {
      state.currentUser = action.payload
    },
    signInFailed(state, action) {
      state.error = action.payload
    },
    signOutStart(state, action) {},
    signOutSuccess(state, action) {
      state.currentUser = null;
    },
    signOutFailed(state, action) {
      state.error = action.payload
    },
    signUpStart(state, action) {},
    signUpSuccess(state, action) {},
    signUpFailed(state, action) {
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
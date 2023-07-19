import {  useState } from "react";
import { useDispatch } from "react-redux";

import { emailSignInStart, googleSignInStart } from "../../store/user/user.action";

import FormInput from "../form-input/form-input.component";
import Button, { BUTTON_CLASSES } from "../button/button.component";

import { SignInContainer, Header, ButtonsContainer } from './sign-in-form.styles';


const defaultFieldValues = {
  email: '',
  password: '',
};

const SignInForm = () => {
  const dispatch = useDispatch();
  const [formFields, setFormFields] = useState(defaultFieldValues);
  const { email, password } = formFields;
  
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormFields({ ...formFields, [name]: value });
  };

  const resetFormFields = () => {
    setFormFields(defaultFieldValues);
  };

  const signInWithGoogle = () => {
    dispatch(googleSignInStart());
  };

  const handleSubmit = async (event) => {
    event.preventDefault(); 
    try {
      // login user
      dispatch(emailSignInStart(email, password));
      // await signInAuthUserWithEmailAndPassword(email, password);
      resetFormFields();
    } catch (error) {
      switch(error.code) {
        case 'auth/wrong-password':
          alert("Wrong Password");
          break;
        case 'auth/user-not-found':
          alert("No user associated with the email");
          break; 
        default:
          console.log(error)
      }
    }
  }

  return (
    <SignInContainer>
      <Header>I already have an account</Header>
      <span>Sign in with your email and password</span>
      <form onSubmit={handleSubmit}>
        <FormInput
          label='Email'
          type='email' 
          value={email} 
          onChange={handleChange}
          name='email' 
          required
        />

        <FormInput
          label='Password'
          type='password' 
          value={password} 
          onChange={handleChange}
          name='password' 
          required
        />
        <ButtonsContainer>
          <Button type='submit'>Sign In</Button>
          <Button 
            type='button' 
            buttonType={BUTTON_CLASSES.google}
            onClick={signInWithGoogle}
          >Sign with Google</Button>
        </ButtonsContainer>
      </form>
    </SignInContainer>
  );
}

export default SignInForm;
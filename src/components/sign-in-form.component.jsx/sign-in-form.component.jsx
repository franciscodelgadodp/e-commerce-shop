import {  useState } from "react";
import FormInput from "../form-input/form-input.component";
import Button from "../button/button.component";

import { 
  signInAuthUserWithEmailAndPassword,
  signInWithGooglePopup, 
} from "../../utils/firebase/firebase.utils";


import './sign-in-form.styles.scss';

const defaultFieldValues = {
  email: '',
  password: '',
}
const SignInForm = () => {
  const [formFields, setFormFields] = useState(defaultFieldValues);
  const { email, password } = formFields;
  
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormFields({ ...formFields, [name]: value });
  };

  const resetFormFields = () => {
    setFormFields(defaultFieldValues);
  };

  const signInWithGoogle = async () => {
    await signInWithGooglePopup();
  };

  const handleSubmit = async (event) => {
    event.preventDefault(); 
    try {
      // login user
      await signInAuthUserWithEmailAndPassword(email, password);
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
    <div className="sign-up-container">
      <h2>I already have an account</h2>
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
        <div className="buttons-container">
          <Button type='submit'>Sign In</Button>
          <Button 
            type='button' 
            buttonType='google' 
            onClick={signInWithGoogle}
          >Sign with Google</Button>
        </div>
      </form>
    </div>
  );
}

export default SignInForm;
import { useState, ChangeEvent, FormEvent } from "react";
import { useDispatch } from "react-redux";
import { AuthErrorCodes, AuthError } from "firebase/auth";

import FormInput from "../form-input/form-input.component";
import Button from "../button/button.component";

import { SignUpContainer, Header } from './sign-up-form.styles';
import { signUpStart } from "../../store/user/user.reducer";
// import { signUpStart } from "../../store/user/user.action";

const defaultFieldValues = {
  displayName: '',
  email: '',
  password: '',
  confirmPassword: ''
}

const SignUpForm = () => {
  const dispatch = useDispatch();
  const [formFields, setFormFields] = useState(defaultFieldValues);
  const { displayName, email, password, confirmPassword } = formFields;
  
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormFields({ ...formFields, [name]: value });
  };

  const resetFormFields = () => {
    setFormFields(defaultFieldValues);
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault(); 
    // pwd match
    if (confirmPassword !== password) {
      alert('passwords do not match');
      return;
    };
    try {
      // if user is auth with email
      dispatch(signUpStart({ email, password, displayName }));
      // const { user } = await createAuthUserFromEmailAndPassword(email, password);
      // create user doc if not
      // await createUserDocumentFromAuth(user, { displayName });
      resetFormFields();
    } catch (error) {
      if ((error as AuthError).code === AuthErrorCodes.EMAIL_EXISTS){
        console.log("Account in use");
        alert("email already used");
      } else {
        console.log(error);
      }
    }
  }

  return (
    <SignUpContainer>
      <Header>Don't have an account?</Header>
      <span>Sign up with your email and password</span >
      <form onSubmit={handleSubmit}>
        <FormInput 
          label='Display Name'
          type='text'
          value={displayName}
          onChange={handleChange}
          name='displayName'
          required
        />

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

        <FormInput 
          label='Confirm Password'
          type='password' 
          value={confirmPassword}
          onChange={handleChange}
          name='confirmPassword' 
          required
        />

        <Button type='submit'>Sign Up</Button>
      </form>
    </SignUpContainer>
  );
}

export default SignUpForm;
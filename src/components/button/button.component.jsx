import { BaseButton, GoogleSignInButton, InvertedButton } from './button.styles';

export const BUTTON_CLASSES = {
  base: 'base',
  google: 'google-sign-in',
  inverted: 'inverted',

};

const getButton = (buttonType = BUTTON_CLASSES.base) => (
  {
    [BUTTON_CLASSES.base]: BaseButton,
    [BUTTON_CLASSES.google]: GoogleSignInButton,
    [BUTTON_CLASSES.inverted]: InvertedButton
  }[buttonType]
);

const Button = ({ children, buttonType, ...otherProps }) => {
  const CustomButton = getButton(buttonType);
  return (
    <CustomButton 
      {...otherProps}
    >
      {children}
    </CustomButton>
  )
};

export default Button;
import { FC, ButtonHTMLAttributes } from 'react';
import { BaseButton, GoogleSignInButton, InvertedButton, ButtonSpinner } from './button.styles';

export enum BUTTON_CLASSES {
  base = 'base',
  google = 'google-sign-in',
  inverted = 'inverted',
};

const getButton = (buttonType = BUTTON_CLASSES.base) => (
  {
    [BUTTON_CLASSES.base]: BaseButton,
    [BUTTON_CLASSES.google]: GoogleSignInButton,
    [BUTTON_CLASSES.inverted]: InvertedButton
  }[buttonType]
);

export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & { 
  buttonType?: BUTTON_CLASSES;
  isLoading?: boolean;
};

const Button: FC<ButtonProps> = ({ children, buttonType, isLoading, ...otherProps }) => {
  const CustomButton = getButton(buttonType);
  return (
    <CustomButton 
      disabled={isLoading}
      {...otherProps}
    >
      {isLoading ? <ButtonSpinner /> : children}
    </CustomButton>
  )
};

export default Button;
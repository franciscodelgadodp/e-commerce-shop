import { FC, InputHTMLAttributes } from 'react';
import { Group, FormInputLabel, Input } from './form-input.styles';

type FormInputProps = InputHTMLAttributes<HTMLInputElement> & {
  label: string
};

const FormInput: FC<FormInputProps> = ({ label, ...otherProps }) => {
  return (
    <Group>
      <Input {...otherProps} />
      {
        label && (
          <FormInputLabel shrink={Boolean(
            otherProps.value && 
            typeof otherProps.value === 'string' && 
            otherProps.value.length )}
          >
            {label}
          </FormInputLabel>
        )
      }
    </Group>
  )
};

export default FormInput;
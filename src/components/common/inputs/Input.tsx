import BaseInput, { CommonInputProps } from '@/components/common/inputs/BaseInput';
import { commonInputStyle } from '@/styles/input';
import { generateRandomId } from '@/utils/randomId';

interface InputProps extends CommonInputProps {
  type?: 'text' | 'password' | 'email' | 'number';
}

const Input: React.FC<InputProps> = ({
  id,
  type = 'text',
  value,
  onChange,
  placeholder = '',
  customStyle = undefined,
  ...props
}) => {
  const inputId = id || `input-${generateRandomId()}`;

  return (
    <BaseInput id={inputId} {...props}>
      <input
        id={inputId}
        type={type}
        placeholder={placeholder}
        onChange={onChange}
        value={value}
        css={[commonInputStyle, customStyle]}
      />
    </BaseInput>
  );
};

export default Input;

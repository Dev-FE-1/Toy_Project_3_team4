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
  maxLength = 100,
  onChange,
  placeholder = '',
  customStyle = undefined,
  ...props
}) => {
  const inputId = id || `input-${generateRandomId()}`;

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = event.target.value.slice(0, maxLength);
    onChange({
      ...event,
      target: {
        ...event.target,
        value: inputValue,
      },
    });
  };

  return (
    <BaseInput id={inputId} {...props} currentLength={value.length} maxLength={maxLength}>
      <input
        id={inputId}
        type={type}
        placeholder={placeholder}
        onChange={handleChange}
        value={value}
        css={[commonInputStyle, customStyle]}
        maxLength={maxLength}
      />
    </BaseInput>
  );
};

export default Input;

import BaseInput, { CommonInputProps } from '@/components/common/inputs/BaseInput';
import { commonInputStyle } from '@/styles/input';
import { generateRandomId } from '@/utils/randomId';

interface TextareaProps extends CommonInputProps {
  rows?: number;
}

const Textarea: React.FC<TextareaProps> = ({
  id,
  rows = 5,
  value,
  onChange,
  maxLength,
  placeholder = '',
  customStyle = undefined,
  ...props
}) => {
  const textareaId = id || `textarea-${generateRandomId()}`;

  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
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
    <BaseInput id={textareaId} {...props} currentLength={value.length} maxLength={maxLength}>
      <textarea
        id={textareaId}
        value={value}
        onChange={handleChange}
        placeholder={placeholder}
        rows={rows}
        css={[commonInputStyle, customStyle]}
        maxLength={maxLength}
      />
    </BaseInput>
  );
};

export default Textarea;

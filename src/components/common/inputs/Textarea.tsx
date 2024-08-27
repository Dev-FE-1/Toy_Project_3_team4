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
  placeholder = '',
  customStyle = undefined,
  ...props
}) => {
  const textareaId = id || `textarea-${generateRandomId()}`;

  return (
    <BaseInput id={textareaId} {...props}>
      <textarea
        id={textareaId}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        rows={rows}
        css={[commonInputStyle, customStyle]}
      />
    </BaseInput>
  );
};

export default Textarea;

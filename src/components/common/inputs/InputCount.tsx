import { css, SerializedStyles } from '@emotion/react';

import theme from '@/styles/theme';

interface InputCountProps {
  currentLength: number;
  maxLength: number;
  customStyle?: SerializedStyles;
}

const InputCount: React.FC<InputCountProps> = ({ currentLength, maxLength, customStyle }) => {
  return (
    <p css={[countStyle, customStyle]}>
      {currentLength}/{maxLength}
    </p>
  );
};

const countStyle = css`
  font-size: ${theme.fontSizes.micro};
`;

export default InputCount;

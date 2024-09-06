import { css, keyframes, SerializedStyles } from '@emotion/react';

import theme from '@/styles/theme';

interface SpinnerProps {
  customStyle?: SerializedStyles;
}

const Spinner: React.FC<SpinnerProps> = ({ customStyle }) => (
  <div css={[spinnerStyle, customStyle]} />
);

const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

const spinnerStyle = css`
  border: 4px solid ${theme.colors.lightGray};
  border-top: 4px solid ${theme.colors.primary};
  border-radius: 50%;
  width: 32px;
  height: 32px;
  animation: ${spin} 1s linear infinite;
`;

export default Spinner;

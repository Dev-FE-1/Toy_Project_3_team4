import { ChangeEvent, ReactNode } from 'react';

import { css, SerializedStyles } from '@emotion/react';

import InputCount from '@/components/common/inputs/InputCount';
import { commonInputContainerStyle, errorMessageStyle } from '@/styles/input';

export interface CommonInputProps {
  id?: string;
  value: string;
  onChange: (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  label?: string;
  placeholder?: string;
  errorMessage?: string | null;
  maxLength?: number;
  customStyle?: SerializedStyles;
}

interface BaseInputProps extends Partial<CommonInputProps> {
  children: ReactNode;
  currentLength?: number;
}

const BaseInput: React.FC<BaseInputProps> = ({
  label,
  errorMessage = null,
  id,
  currentLength,
  maxLength,
  children,
}) => {
  return (
    <label css={commonInputContainerStyle} htmlFor={id}>
      {label && <span className="input-label">{label}</span>}
      <div className="input-wrapper">
        {children}
        {maxLength && typeof currentLength === 'number' && (
          <InputCount
            currentLength={currentLength}
            maxLength={maxLength}
            customStyle={countStyle}
          />
        )}
      </div>
      {errorMessage && (
        <p className="error" css={errorMessageStyle}>
          {errorMessage}
        </p>
      )}
    </label>
  );
};

const countStyle = css`
  position: absolute;
  bottom: 12px;
  right: 12px;
`;

export default BaseInput;

import { ChangeEvent, ReactNode } from 'react';

import { SerializedStyles } from '@emotion/react';

import { commonInputContainerStyle, errorMessageStyle } from '@/styles/input';

export interface CommonInputProps {
  id?: string;
  value: string;
  onChange: (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  label?: string;
  placeholder?: string;
  errorMessage?: string | null;
  customStyle?: SerializedStyles;
}

interface BaseInputProps extends Partial<CommonInputProps> {
  children: ReactNode;
}

const BaseInput: React.FC<BaseInputProps> = ({ label, errorMessage = null, id, children }) => {
  return (
    <label css={commonInputContainerStyle} htmlFor={id}>
      {label && <span className="input-label">{label}</span>}
      <div className="input-wrapper">
        {children}

        {errorMessage && (
          <p className="error" css={errorMessageStyle}>
            {errorMessage}
          </p>
        )}
      </div>
    </label>
  );
};

export default BaseInput;

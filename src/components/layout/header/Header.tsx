import { useEffect, useState } from 'react';

import { css, SerializedStyles } from '@emotion/react';
import { createPortal } from 'react-dom';

import { maxWidthStyle } from '@/styles/GlobalStyles';

interface BaseHeaderProps {
  leftSection?: React.ReactNode;
  centerSection?: React.ReactNode;
  rightSection?: React.ReactNode;
  customStyle?: SerializedStyles;
}

const Header: React.FC<BaseHeaderProps> = ({
  leftSection,
  centerSection,
  rightSection,
  customStyle,
}) => {
  const [headerRoot, setHeaderRoot] = useState<HTMLElement | null>(null);

  useEffect(() => {
    setHeaderRoot(document.getElementById('header'));
  }, []);
  if (!headerRoot) return null;

  return createPortal(
    <div css={[baseHeaderStyle, maxWidthStyle(true), customStyle]} data-testid="header">
      <div css={leftSectionStyle}>{leftSection}</div>
      <div css={centerSectionStyle}>{centerSection}</div>
      <div css={rightSectionStyle}>{rightSection}</div>
    </div>,
    headerRoot,
  );
};

const baseHeaderStyle = css`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 12px;
  height: 60px;
  padding: 0 16px;
`;

const leftSectionStyle = css`
  display: flex;
  align-items: center;
  flex: 0 0 auto;
`;

const centerSectionStyle = css`
  flex: 1 1 auto;
`;

const rightSectionStyle = css`
  flex: 0 0 auto;
`;

export default Header;

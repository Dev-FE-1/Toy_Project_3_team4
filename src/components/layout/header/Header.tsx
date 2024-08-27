import { useEffect, useState } from 'react';

import { css, SerializedStyles, useTheme, Theme } from '@emotion/react';
import { createPortal } from 'react-dom';

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
  const theme = useTheme();
  const [headerRoot, setHeaderRoot] = useState<HTMLElement | null>(null);

  useEffect(() => {
    setHeaderRoot(document.getElementById('header'));
  }, []);
  if (!headerRoot) return null;

  return createPortal(
    <div css={[baseHeaderStyle(theme), customStyle]}>
      <div css={leftSectionStyle}>{leftSection}</div>
      <div css={centerSectionStyle}>{centerSection}</div>
      <div css={rightSectionStyle}>{rightSection}</div>
    </div>,
    headerRoot,
  );
};

const baseHeaderStyle = (theme: Theme) => css`
  max-width: 600px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
  padding: 12px 16px;
  background-color: ${theme.colors.white};
  border-left: 1px solid ${theme.colors.lightGray};
  border-right: 1px solid ${theme.colors.lightGray};
`;

const leftSectionStyle = css`
  flex: 0 0 auto;
`;

const centerSectionStyle = css`
  flex: 1 1 auto;
  margin: 0 16px;
`;

const rightSectionStyle = css`
  flex: 0 0 auto;
`;

export default Header;

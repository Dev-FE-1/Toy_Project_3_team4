import { useEffect, useState } from 'react';

import { css, SerializedStyles, useTheme, Theme } from '@emotion/react';
import { createPortal } from 'react-dom';

interface BaseHeaderProps {
  leftSection?: React.ReactNode;
  centerSection?: React.ReactNode;
  rightSection?: React.ReactNode;
  customStyle?: SerializedStyles;
}

const BaseHeader: React.FC<BaseHeaderProps> = ({
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
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
  padding: 12px 16px;
  background-color: ${theme.colors.white};
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

export default BaseHeader;

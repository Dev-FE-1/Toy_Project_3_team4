import { css, SerializedStyles, useTheme, Theme } from '@emotion/react';
import { useEffect, useState } from 'react';
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
  // const headerRoot = document.getElementById('header');

  // if (!headerRoot) return null;
  const [headerRoot, setHeaderRoot] = useState<HTMLElement | null>(null);

  useEffect(() => {
    setHeaderRoot(document.getElementById('header'));
  }, []);
  if (!headerRoot) return null;

  return createPortal(
    <div css={[baseHeaderStyle(theme), customStyle]}>
      <div css={sectionStyle}>{leftSection}</div>
      <div css={sectionStyle}>{centerSection}</div>
      <div css={sectionStyle}>{rightSection}</div>
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
const sectionStyle = css`
  display: flex;
  align-items: center;
`;

export default BaseHeader;

import { css, SerializedStyles, useTheme, Theme } from '@emotion/react';

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

  return (
    <header css={[baseHeaderStyle(theme), customStyle]}>
      <div css={sectionStyle}>{leftSection}</div>
      <div css={sectionStyle}>{centerSection}</div>
      <div css={sectionStyle}>{rightSection}</div>
    </header>
  )
};


const baseHeaderStyle = (theme: Theme) => css`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
  height: 60px;
  padding: 12px 16px;
  background-color: ${theme.colors.white};
`;

const sectionStyle = css`
  display: flex;
  align-items: center;
`;

export default BaseHeader;

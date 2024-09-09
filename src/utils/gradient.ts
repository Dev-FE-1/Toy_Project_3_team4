const DEGREES_TO_RADIANS = Math.PI / 180;
const SVG_CENTER = 50; // SVG 좌표계의 중심점 (%)
const SVG_RADIUS = 50; // SVG 좌표계의 반지름 (%)

export const calculateGradientCoordinates = (angle: number) => {
  const radians = angle * DEGREES_TO_RADIANS;

  return {
    x1: `${SVG_CENTER - SVG_RADIUS * Math.sin(radians)}%`,
    y1: `${SVG_CENTER + SVG_RADIUS * Math.cos(radians)}%`,
    x2: `${SVG_CENTER + SVG_RADIUS * Math.sin(radians)}%`,
    y2: `${SVG_CENTER - SVG_RADIUS * Math.cos(radians)}%`,
  };
};

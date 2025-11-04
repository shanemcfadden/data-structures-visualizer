import type { Coordinate } from "../../../types";

export type RectangleProps = {
  origin: Coordinate;
  height: number;
  width: number;
  text?: string;
};

export const Rectangle = ({
  origin: [x, y],
  height,
  width,
  text,
}: RectangleProps) => (
  <>
    <rect
      className="fill-green-700"
      x={x}
      y={y}
      height={height}
      width={width}
    />
    <text
      className="fill-white"
      x={x + width / 2}
      y={y + height / 2}
      fontSize={Math.min(height, width) * 0.6}
      textAnchor="middle"
      dominantBaseline="middle"
    >
      {text}
    </text>
  </>
);

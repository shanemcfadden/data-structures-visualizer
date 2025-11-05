import type { Coordinate } from "../../../types";

export type RectangleProps = {
  height: number;
  origin: Coordinate;
  text?: string;
  width: number;
};

export const Rectangle = ({
  height,
  origin: [x, y],
  text,
  width,
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
      fontSize={Math.min(height, width) * 0.5}
      textAnchor="middle"
      dominantBaseline="middle"
    >
      {text}
    </text>
  </>
);

import type { Coordinate } from "../../../types";

export type CircleProps = {
  center: Coordinate;
  radius: number;
  text?: string;
};

export const Circle = ({ center: [x, y], radius, text }: CircleProps) => (
  <>
    <circle className="fill-green-700" cx={x} cy={y} r={radius} />
    <text
      className="fill-white"
      x={x}
      y={y}
      fontSize={radius * 0.8}
      textAnchor="middle"
      dominantBaseline="middle"
    >
      {text}
    </text>
  </>
);

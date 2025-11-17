import type { Coordinate } from "../../../types";
import { ARROW_HEAD_LENGTH, ARROW_HEAD_REF } from "../Defs/ArrowHead";

export type ArrowProps = {
  start: Coordinate;
  end: Coordinate;
  endPointer?: boolean;
  strokeWidth?: number;
};

export const Arrow = ({
  start: [x1, y1],
  end: [x2, y2],
  endPointer = false,
  strokeWidth,
}: ArrowProps) => {
  const length = Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);

  const autoStrokeWidth = Math.sqrt(length) / 1.3;

  return (
    <line
      className="stroke-black"
      x1={x1}
      x2={endPointer ? x2 - ARROW_HEAD_LENGTH : x2}
      y1={y1}
      y2={y2}
      strokeWidth={strokeWidth ?? autoStrokeWidth}
      markerEnd={endPointer ? ARROW_HEAD_REF : "none"}
    />
  );
};

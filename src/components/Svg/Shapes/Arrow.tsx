import type { Coordinate } from "../../../types";
import { ARROW_HEAD_LENGTH, ARROW_HEAD_REF } from "../Defs/ArrowHead";
import { calculateDistance, calculateVectorAngle } from "../util";

export type ArrowProps = {
  start: Coordinate;
  end: Coordinate;
  endPointer?: boolean;
  strokeWidth?: number;
};

export const Arrow = ({
  start,
  end,
  endPointer = false,
  strokeWidth,
}: ArrowProps) => {
  const [x1, y1] = start;

  const vectorAngle = calculateVectorAngle(start, end);
  const length = calculateDistance(start, end);

  const autoStrokeWidth = Math.sqrt(length) / 1.3;

  const adjustedLength = length - (endPointer ? ARROW_HEAD_LENGTH : 0);

  const calculatedX2 = x1 + Math.cos(vectorAngle) * adjustedLength;
  const calculatedY2 = y1 + Math.sin(vectorAngle) * adjustedLength;

  return (
    <line
      className="stroke-black"
      x1={x1}
      x2={calculatedX2}
      y1={y1}
      y2={calculatedY2}
      strokeWidth={strokeWidth ?? autoStrokeWidth}
      markerEnd={endPointer ? ARROW_HEAD_REF : "none"}
    />
  );
};

import type { Coordinate } from "../../../types";
import { ARROW_HEAD_REF, getArrowHeadLength } from "../Defs/ArrowHead";
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
  strokeWidth: customStrokeWidth,
}: ArrowProps) => {
  const [x1, y1] = start;

  const vectorAngle = calculateVectorAngle(start, end);
  const length = calculateDistance(start, end);

  const autoStrokeWidth = Math.sqrt(length) / 1.3;
  const strokeWidth = customStrokeWidth ?? autoStrokeWidth;

  const adjustedLength =
    length - (endPointer ? getArrowHeadLength(strokeWidth) : 0);

  const calculatedX2 = x1 + Math.cos(vectorAngle) * adjustedLength;
  const calculatedY2 = y1 + Math.sin(vectorAngle) * adjustedLength;

  return (
    <line
      className="stroke-black"
      x1={x1}
      x2={calculatedX2}
      y1={y1}
      y2={calculatedY2}
      strokeWidth={strokeWidth}
      markerEnd={endPointer ? ARROW_HEAD_REF : "none"}
    />
  );
};

import type { Coordinate } from "../../../types";
import { ARROW_HEAD_LENGTH, ARROW_HEAD_REF } from "../Defs/ArrowHead";

type ArrowProps = {
  start: Coordinate;
  end: Coordinate;
  endPointer?: boolean;
};

export const Arrow = ({
  start: [x1, y1],
  end: [x2, y2],
  endPointer = false,
}: ArrowProps) => {
  const length = Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);

  const strokeWidth = Math.sqrt(length) / 1.3;

  return (
    <line
      className="stroke-black"
      x1={x1}
      x2={endPointer ? x2 - ARROW_HEAD_LENGTH : x2}
      y1={y1}
      y2={y2}
      stroke-width={strokeWidth}
      marker-end={endPointer ? ARROW_HEAD_REF : "none"}
    />
  );
};

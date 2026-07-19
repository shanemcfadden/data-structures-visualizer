import type { Coordinate } from "../../types";

export const calculateHorizontalOffset = ([x1]: Coordinate, [x2]: Coordinate) =>
  x2 - x1;

export const calculateVerticalOffset = (
  [_x1, y1]: Coordinate,
  [_x2, y2]: Coordinate,
) => y2 - y1;

export const calculateDistance = (
  coordinate1: Coordinate,
  coordinate2: Coordinate,
) =>
  Math.sqrt(
    calculateHorizontalOffset(coordinate1, coordinate2) ** 2 +
      calculateVerticalOffset(coordinate1, coordinate2) ** 2,
  );

export const calculateVectorAngle = (
  initialPoint: Coordinate,
  terminalPoint: Coordinate,
): number =>
  Math.atan2(
    calculateVerticalOffset(initialPoint, terminalPoint),
    calculateHorizontalOffset(initialPoint, terminalPoint),
  );
